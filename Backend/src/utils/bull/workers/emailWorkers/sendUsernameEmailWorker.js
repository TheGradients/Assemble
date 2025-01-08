import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import { sendUsernameEmail } from "../../../nodemailer/email.js";

const sendUsernameEmailWorker = new Worker(
    'username-email',
    async (job) => {
        const { userId } = job.data;
        const user = await User.findById(userId);
        await sendUsernameEmail(user.email, user.username);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    }
);

sendUsernameEmailWorker.on('failed', async (job, _) => {
    try {
        const user = await User.findById(job.data.userId);
        sendErrorEmail(user.email, "Username Fetching");
    } catch (error) {
        console.log(error.message);
    }
});

export default sendUsernameEmailWorker;