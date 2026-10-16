// Tiny Redis-command store for the visitor stats.
// Production: Upstash Redis over its REST API (env UPSTASH_REDIS_REST_URL/TOKEN, or the KV_REST_API_* names
// Vercel adds when the database is connected from the Storage tab).
// Local development without those variables: an in-memory store, so the dashboard works on localhost.
// The leading underscore keeps Vercel from exposing this file as an API route.

// Vercel lets you choose a prefix when connecting the database (e.g. STORAGE_KV_REST_API_URL),
// so match the variable names by suffix rather than exact name.
function envBySuffix(...suffixes) {
  for (const suffix of suffixes) {
    if (process.env[suffix]) return process.env[suffix];
    const key = Object.keys(process.env).find((k) => k.endsWith(`_${suffix}`) && !k.includes("READ_ONLY") && process.env[k]);
    if (key) return process.env[key];
  }
  return "";
}

const url = envBySuffix("UPSTASH_REDIS_REST_URL", "KV_REST_API_URL");
const token = envBySuffix("UPSTASH_REDIS_REST_TOKEN", "KV_REST_API_TOKEN");

export const storeKind = url && token ? "redis" : "memory";

async function redisPipeline(commands) {
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const out = await res.json();
  return out.map((r) => (r.error ? null : r.result));
}

// Minimal in-memory emulation of the commands the stats code uses.
const mem = globalThis.__vpStatsMem || (globalThis.__vpStatsMem = new Map());
function memRun([cmd, key, ...args]) {
  const get = (fallback) => (mem.has(key) ? mem.get(key) : fallback);
  switch (cmd) {
    case "INCR": mem.set(key, Number(get(0)) + 1); return mem.get(key);
    case "GET": return mem.has(key) ? String(mem.get(key)) : null;
    case "MGET": return [key, ...args].map((k) => (mem.has(k) ? String(mem.get(k)) : null));
    case "HINCRBY": { const h = get({}); h[args[0]] = (h[args[0]] || 0) + Number(args[1]); mem.set(key, h); return h[args[0]]; }
    case "HGETALL": return Object.entries(get({})).flat().map(String);
    case "SADD": { const s = get(new Set()); const n = s.has(args[0]) ? 0 : 1; s.add(args[0]); mem.set(key, s); return n; }
    case "SCARD": return get(new Set()).size;
    case "LPUSH": { const l = get([]); l.unshift(...args.reverse()); mem.set(key, l); return l.length; }
    case "LTRIM": { const l = get([]); mem.set(key, l.slice(Number(args[0]), Number(args[1]) + 1)); return "OK"; }
    case "LRANGE": return get([]).slice(Number(args[0]), Number(args[1]) + 1);
    case "EXPIRE": return 1;
    default: throw new Error(`Unsupported command ${cmd}`);
  }
}

export async function pipeline(commands) {
  if (storeKind === "redis") return redisPipeline(commands);
  return commands.map(memRun);
}

// Helpers shared by the track and stats endpoints.
export const dayKey = (d = new Date()) => d.toISOString().slice(0, 10);
export const PREFIX = "vp:stats";
