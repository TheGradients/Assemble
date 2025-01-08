import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import { sendVerificationEmail } from "../../../nodemailer/email.js";

const sendVerificationCodeEmailWorker = new Worker(
    'verification-code-email',
    async (job) => {
        const { userId } = job.data;
        const user = await User.findById(userId);
        await sendVerificationEmail(user.email, user.verificationCode);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    }
);

sendVerificationCodeEmailWorker.on('failed', async (job, _) => {
    try {
        const user = await User.findById(job.data.userId);
        sendErrorEmail(user.email, "Verification");
    } catch (error) {
        console.log(error.message);
    }
});

export default sendVerificationCodeEmailWorker;