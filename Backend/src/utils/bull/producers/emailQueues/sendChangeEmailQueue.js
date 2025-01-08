import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const sendChangeEmailQueue = new Queue('change-email', {
    connection: redisConnection,
});

export default sendChangeEmailQueue;