import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const sendRegisterationEmailQueue = new Queue('registeration-email', {
    connection: redisConnection,
});

export default sendRegisterationEmailQueue;