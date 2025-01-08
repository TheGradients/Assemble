import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "../../../nodemailer/email.js";
import { sendErrorEmail } from "../../../nodemailer/email.js";

const hashPasswordWorker = new Worker(
    'hash-password',
    async (job) => {
        const { userId, password } = job.data;
        const user = await User.findById(userId);
        const hashedPassword = await bcrypt.hash(password, 13);
        user.password = hashedPassword;
        await user.save();
        console.log(`Password hashed for user ${userId}`);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    }
);

hashPasswordWorker.on('failed', async (job, _) => {
    try {
        const { userId } = job.data;
        const user = await User.findById(userId);
        const email = user.email;
        await User.findByIdAndDelete(userId);
        await sendErrorEmail(email, "Registration Failed");
    } catch (error) {
        console.log(error.message);
    }
});

hashPasswordWorker.on('completed', async (job) => {
    const { userId } = job.data;
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    await sendVerificationEmail(user.email, user.verificationCode);
});

export default hashPasswordWorker;