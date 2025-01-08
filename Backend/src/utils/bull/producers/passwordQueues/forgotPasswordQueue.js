import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const forgotPasswordQueue = new Queue('forgot-password', {
    connection: redisConnection,
});

export default forgotPasswordQueue;