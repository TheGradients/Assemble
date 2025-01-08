import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import { sendChangeEmail } from "../../../nodemailer/email.js";

const sendChangeEmailWorker = new Worker(
    'change-email',
    async (job) => {
        const { userId, change } = job.data;
        const user = await User.findById(userId);
        await sendChangeEmail(user.email, change);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    }
);

sendChangeEmailWorker.on('failed', async (job, _) => {
    try {
        const user = await User.findById(job.data.userId);
        sendErrorEmail(user.email, "Changing Parameter");
    } catch (error) {
        console.log(error.message);
    }
});

export default sendChangeEmailWorker;