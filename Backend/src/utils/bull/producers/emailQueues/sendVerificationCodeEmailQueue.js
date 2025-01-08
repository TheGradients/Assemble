import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const sendVerificationCodeEmailQueue = new Queue('verification-code-email', {
    connection: redisConnection,
});

export default sendVerificationCodeEmailQueue;