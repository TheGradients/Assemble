import { Verification_Email_Template } from "./template/user/verificationTemplate.js";
import { Forgot_Username_Template } from "./template/user/forgotUsernameTemplate.js"
import { Registeration_Email_Template } from "./template/user/registerationTemplate.js";
import { Error_Email_Template } from "./template/errorHandling/errorTemplate.js";
import transporter from "../../libs/emailConfig.js";
import selectChangeTemplate from "../../helpers/selectChangeTemplate.js";

const sendVerificationEmail = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Assemble" <testme2004.04@gmail.com>',
            to: email,
            subject: "Account Verification",
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
        });
        console.log("Email Send Successfully: ", response);
    } catch (error) {
        console.log(error.message);
    }
};

const sendUsernameEmail = async (email, username)=>{
    try {
        const response = await transporter.sendMail({
            from: '"Assemble" <testme2004.04@gmail.com>',
            to: email,
            subject: "Account Recovery",
            html: Forgot_Username_Template.replace("{username}", username),
        });
        console.log("Email Send Successfully: ", response);
    } catch (error) {
        console.log(error.message);
    }
};

const sendChangeEmail = async (email, change) => {
    try {
        const response = await transporter.sendMail({
            from: '"Assemble" <testme2004.04@gmail.com>',
            to: email,
            subject: "Change Successfull",
            html: selectChangeTemplate(change),
        });
        console.log("Email Send Successfully: ", response);
    } catch (error) {
        console.log(error.message);
    }
};

const sendRegisterationEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: '"Assemble" <testme2004.04@gmail.com>',
            to: email,
            subject: "Registered Successfully",
            html: Registeration_Email_Template,
        });
        console.log("Email Send Successfully: ", response);
    } catch (error) {
        console.log(error.message);
    }
};

const sendErrorEmail = async (email, errorField) => {
    try {
        const response = await transporter.sendMail({
            from: '"Assemble" <testme2004.04@gmail.com>',
            to: email,
            subject: "Transactoin Failed",
            html: Error_Email_Template.replace("{errorField}", errorField),
        });
        console.log("Email Send Successfully: ", response);
    } catch (error) {
        console.log(error.message);
    }
};

export {
    sendVerificationEmail,
    sendUsernameEmail,
    sendChangeEmail,
    sendRegisterationEmail,
    sendErrorEmail,
};