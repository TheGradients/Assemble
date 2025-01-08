import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import bcrypt from "bcryptjs";
import { sendErrorEmail } from "../../../nodemailer/email.js";
import { sendChangeEmail } from "../../../nodemailer/email.js";

const changePasswordWorker = new Worker(
    'change-password',
    async (job) => {
        const { userId, newPassword } = job.data;
        const user = await User.findById(userId);
        const hashedPassword = await bcrypt.hash(newPassword, 13);
        user.password = hashedPassword;
        await user.save({
            validateBeforeSave: false,
        });
        console.log(`Password changed for user ${userId}`);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    },
);

changePasswordWorker.on('failed', async (job, _) => {
    try {
        const user = await User.findById(job.data.userId);
        sendErrorEmail(user.email, "Change Password");
    } catch (error) {
        console.log(error.message);
    }
});

changePasswordWorker.on('completed', async (job) => {
    const user = await User.findById(job.data.userId);
    await sendChangeEmail(user.email, "password");
});


export default changePasswordWorker;