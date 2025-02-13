import Redis from "ioredis";

const USE_REDIS = process.env.USE_REDIS === "true";

export let redis: Redis | null = null;

if (USE_REDIS) {
  redis = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
  });
}
