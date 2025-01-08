import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import bcrypt from "bcryptjs";
import { sendErrorEmail } from "../../../nodemailer/email.js";
import { sendChangeEmail } from "../../../nodemailer/email.js";

const forgotPasswordWorker = new Worker(
    'forgot-password',
    async (job) => {
        const { userId, password } = job.data;
        console.log(userId, password);
        const user = await User.findById(userId);
        const hashedPassword = await bcrypt.hash(password, 13);
        user.password = hashedPassword;
        user.canChangePassword = false;
        await user.save();
        console.log(`Password hashed for user ${userId}`);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    },
);

forgotPasswordWorker.on('failed', async (job, _) => {
    try {
        const user = await User.findById(job.data.userId);
        sendErrorEmail(user.email, "Change Password");
    } catch (error) {
        console.log(error.message);
    }
});

forgotPasswordWorker.on('completed', async (job) => {
    const user = await User.findById(job.data.userId);
    await sendChangeEmail(user.email, "password");
});

export default forgotPasswordWorker;