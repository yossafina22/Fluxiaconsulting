type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();

const MAX_ENTRIES = 5000;

function gc() {
  if (store.size <= MAX_ENTRIES) return;
  const now = Date.now();
  for (const [key, bucket] of store) {
    if (bucket.resetAt < now) store.delete(key);
  }
}

export function rateLimit(params: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: boolean; remaining: number; resetAt: number } {
  const { key, limit, windowMs } = params;
  const now = Date.now();
  gc();
  const existing = store.get(key);
  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  existing.count += 1;
  const ok = existing.count <= limit;
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

export function ipFromHeaders(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() ?? "unknown";
  const real = headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
