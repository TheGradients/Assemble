import { Worker } from "bullmq";
import { redisConnection } from "../../../../libs/redisConfig.js";
import { User } from "../../../../models/user.models.js";
import { sendRegisterationEmail } from "../../../nodemailer/email.js";

const sendRegisterationEmailWorker = new Worker(
    'registeration-email',
    async (job) => {
        const { userId } = job.data;
        const user = await User.findById(userId);
        await sendRegisterationEmail(user.email);
    },
    {
        connection: redisConnection,
        settings: {
            retries: 2,
        },
    }
);

sendRegisterationEmailWorker.on('failed', async (job, _) => {
    try {
        const user = await User.findById(job.data.userId);
        sendErrorEmail(user.email, "Registeration");
        await User.findByIdAndDelete(job.data.userId);
    } catch (error) {
        console.log(error.message);
    }
});

export default sendRegisterationEmailWorker;