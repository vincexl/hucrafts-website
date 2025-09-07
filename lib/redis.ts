// lib/redis.ts
import { Redis } from "@upstash/redis";

// If env vars are present, the client can read them implicitly,
// but we pass explicitly for clarity.
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
