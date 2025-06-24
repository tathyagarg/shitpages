type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<any>>();

export function setCache<T>(key: string, value: T, ttl: number): void {
  const expiresAt = Date.now() + ttl;
  cache.set(key, { value, expiresAt });
}

export function getCache<T>(key: string): T | undefined {
  const entry = cache.get(key);

  if (entry && entry.expiresAt > Date.now()) {
    return entry.value as T;
  }
  cache.delete(key); // Remove expired entry
  return undefined;
}
