import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const sendUsernameEmailQueue = new Queue('username-email', {
    connection: redisConnection,
});

export default sendUsernameEmailQueue;