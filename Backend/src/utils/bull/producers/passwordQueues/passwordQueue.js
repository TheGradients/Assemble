import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const passwordQueue = new Queue('hash-password', {
    connection: redisConnection,
});

export default passwordQueue;