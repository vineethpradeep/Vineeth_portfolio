import { createHash } from "node:crypto";
import { dayKey, pipeline, PREFIX } from "./_store.js";

// Vercel serverless function (also mounted by server.js for local development).
// Records one anonymous page view: page, referrer site, country, device. No cookies; no IP address is stored.
// Unique visitors are counted per day with a salted hash of IP + browser that changes every day.

const BOTS = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|lighthouse|headless|curl|wget|python|axios/i;

const clean = (value, max) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function referrerSite(ref, host) {
  try {
    const u = new URL(ref);
    if (!u.hostname || u.hostname === host) return "Direct";
    return u.hostname.replace(/^www\./, "").replace(/^(l|lm|m)\.linkedin\.com$/, "linkedin.com");
  } catch {
    return "Direct";
  }
}

function device(ua, width) {
  if (/ipad|tablet/i.test(ua) || (width >= 600 && width < 1024 && /mobi|android/i.test(ua))) return "Tablet";
  if (/mobi|iphone|android/i.test(ua) || (width && width < 600)) return "Mobile";
  return "Desktop";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }
  const ua = String(req.headers["user-agent"] || "");
  if (!ua || BOTS.test(ua)) return res.status(204).end();

  let body = req.body || {};
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const host = String(req.headers.host || "").split(":")[0];
  const path = clean(body.path, 120).split("?")[0] || "/";
  if (path.startsWith("/dashboard")) return res.status(204).end();

  const ref = referrerSite(clean(body.referrer, 500), host);
  const width = Number(body.width) || 0;
  const dev = device(ua, width);
  const country = clean(String(req.headers["x-vercel-ip-country"] || ""), 2).toUpperCase() || "Unknown";
  const city = decodeURIComponent(clean(String(req.headers["x-vercel-ip-city"] || ""), 80)) || "";
  const ip = String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim();
  const day = dayKey();
  const salt = process.env.STATS_SALT || process.env.STATS_PASSWORD || "vineeth-portfolio";
  const visitor = createHash("sha256").update(`${salt}|${day}|${ip}|${ua}`).digest("hex").slice(0, 32);

  const recent = JSON.stringify({ t: Date.now(), path, ref, country, city, device: dev });
  try {
    await pipeline([
      ["INCR", `${PREFIX}:views:total`],
      ["INCR", `${PREFIX}:views:${day}`],
      ["EXPIRE", `${PREFIX}:views:${day}`, String(60 * 60 * 24 * 400)],
      ["SADD", `${PREFIX}:visitors:${day}`, visitor],
      ["EXPIRE", `${PREFIX}:visitors:${day}`, String(60 * 60 * 24 * 120)],
      ["HINCRBY", `${PREFIX}:referrers`, ref, "1"],
      ["HINCRBY", `${PREFIX}:countries`, country, "1"],
      ["HINCRBY", `${PREFIX}:devices`, dev, "1"],
      ["HINCRBY", `${PREFIX}:pages`, path, "1"],
      ["LPUSH", `${PREFIX}:recent`, recent],
      ["LTRIM", `${PREFIX}:recent`, "0", "49"],
    ]);
  } catch (err) {
    console.error("Stats track failed:", err.message);
  }
  return res.status(204).end();
}
