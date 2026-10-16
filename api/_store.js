// Tiny Redis-command store for the visitor stats.
// Production: Upstash Redis over its REST API (UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_*, any prefix),
// or any Redis via a redis:// connection string (REDIS_URL), e.g. Vercel's Redis Cloud database.
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

// Vercel's "Redis" (Redis Cloud) database only provides a redis:// connection string.
const redisUrl = !(url && token) ? envBySuffix("REDIS_URL", "KV_URL") : "";

export const storeKind = url && token ? "redis" : redisUrl ? "redis-tcp" : "memory";

// Names (never values) of the database-related variables present, to diagnose a missing connection.
export const storeVarNames = Object.keys(process.env).filter((k) => /REDIS|KV_|UPSTASH/i.test(k)).sort();

let tcpClient;
async function tcpPipeline(commands) {
  if (!tcpClient) {
    const { createClient } = await import("redis");
    tcpClient = createClient({ url: redisUrl, socket: { connectTimeout: 5000 } });
    tcpClient.on("error", (err) => console.error("Redis error:", err.message));
    await tcpClient.connect();
  }
  const multi = tcpClient.multi();
  for (const cmd of commands) multi.addCommand(cmd.map(String));
  return multi.exec();
}

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
  if (storeKind === "redis-tcp") return tcpPipeline(commands);
  return commands.map(memRun);
}

// Helpers shared by the track and stats endpoints.
export const dayKey = (d = new Date()) => d.toISOString().slice(0, 10);
export const PREFIX = "vp:stats";
