import { Queue } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";

const changePasswordQueue = new Queue('change-password', {
    connection: redisConnection,
});

export default changePasswordQueue;