import IORedis from "ioredis";

const redisConnection = new IORedis(process.env.REDIS_SERVER_URL, {
    maxRetriesPerRequest: null,
});

export {
    redisConnection
};