import { Redis } from "@upstash/redis";

// The SDK can read the two env vars automatically if named correctly.
// Using fromEnv() adds a clear error if they’re missing.
export const redis = Redis.fromEnv();
