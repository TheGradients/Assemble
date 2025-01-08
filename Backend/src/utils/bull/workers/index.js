import hashPasswordWorker from "./passwordWorkers/passwordWorker.js";
import changePasswordWorker from "./passwordWorkers/changePasswordWorker.js";
import forgotPasswordWorker from "./passwordWorkers/forgotPasswordWorker.js";
import sendRegisterationEmailWorker from "./emailWorkers/sendRegisterationEmailWorker.js";
import sendVerificationCodeEmailWorker from "./emailWorkers/sendVerificationCodeEmailWorker.js";
import sendUsernameEmailWorker from "./emailWorkers/sendUsernameEmailWorker.js";
import sendChangeEmailWorker from "./emailWorkers/sendChangeEmailWorker.js";

const initializeWorkers = () => {
    console.log("Starting workers...");
    hashPasswordWorker;
    changePasswordWorker;
    forgotPasswordWorker;
    sendRegisterationEmailWorker;
    sendVerificationCodeEmailWorker;
    sendUsernameEmailWorker;
    sendChangeEmailWorker;
};

export default initializeWorkers;