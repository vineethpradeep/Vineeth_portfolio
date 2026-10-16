import { timingSafeEqual } from "node:crypto";
import { dayKey, pipeline, PREFIX, storeKind } from "./_store.js";

// Vercel serverless function (also mounted by server.js for local development).
// Returns the visitor stats for the private /dashboard page. Requires "Authorization: Bearer <STATS_PASSWORD>".
// Locally, when STATS_PASSWORD is not set, the password is "local-dev".

const DAYS = 30;
const onVercel = Boolean(process.env.VERCEL);

function authorised(req) {
  const expected = process.env.STATS_PASSWORD || (onVercel ? "" : "local-dev");
  if (!expected) return false;
  const given = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const toPairs = (flat) => {
  const out = [];
  for (let i = 0; i < (flat || []).length; i += 2) out.push({ name: flat[i], count: Number(flat[i + 1]) || 0 });
  return out.sort((x, y) => y.count - x.count);
};

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }
  if (onVercel && !process.env.STATS_PASSWORD) {
    return res.status(503).json({ ok: false, error: "STATS_PASSWORD is not set in Vercel." });
  }
  if (!authorised(req)) return res.status(401).json({ ok: false, error: "Wrong password." });

  const days = [];
  for (let i = DAYS - 1; i >= 0; i--) days.push(dayKey(new Date(Date.now() - i * 864e5)));

  try {
    const [total, daily, ...rest] = await pipeline([
      ["GET", `${PREFIX}:views:total`],
      ["MGET", ...days.map((d) => `${PREFIX}:views:${d}`)],
      ...days.map((d) => ["SCARD", `${PREFIX}:visitors:${d}`]),
      ["HGETALL", `${PREFIX}:referrers`],
      ["HGETALL", `${PREFIX}:countries`],
      ["HGETALL", `${PREFIX}:devices`],
      ["HGETALL", `${PREFIX}:pages`],
      ["LRANGE", `${PREFIX}:recent`, "0", "19"],
    ]);
    const visitors = rest.slice(0, DAYS).map((n) => Number(n) || 0);
    const [referrers, countries, devices, pages, recent] = rest.slice(DAYS);
    return res.json({
      ok: true,
      store: storeKind,
      total: Number(total) || 0,
      series: days.map((date, i) => ({ date, views: Number(daily?.[i]) || 0, visitors: visitors[i] })),
      referrers: toPairs(referrers),
      countries: toPairs(countries),
      devices: toPairs(devices),
      pages: toPairs(pages),
      recent: (recent || []).map((r) => {
        try { return JSON.parse(r); } catch { return null; }
      }).filter(Boolean),
    });
  } catch (err) {
    console.error("Stats read failed:", err.message);
    return res.status(500).json({ ok: false, error: "Could not read stats." });
  }
}
