import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    verifyCode,
    changeUsername,
    changePassword,
    addDetails,
    changeEmail,
    verifyNewEmail,
    forgetUsernameVerificationEmail,
    forgotUsername,
    forgotPassword,
    forgotPasswordVerificationCode,
    forgotPasswordVerificationEmail,
    getUserData
} from "../controllers/user.controller.js";
import {
    registerUserSchema,
    loginUserSchema,
    verifyCodeSchema,
    changePasswordSchema,
    changeUsernameSchema,
    addDetailsSchema,
    changeEmailSchema,
    verifyNewEmailSchema,
    forgotUsernameSchema,
    forgotPasswordSchema,
    forgotPasswordVerificationEmailSchema,
    forgotPasswordVerificationCodeSchema
} from "../utils/zodSchema/userValidatorSchema.js";
import validationSchema from "../middlewares/zodValidator.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(validationSchema(registerUserSchema), registerUser);
router.route("/login").post(validationSchema(loginUserSchema), loginUser);
router.route("/verifyCode").post(validationSchema(verifyCodeSchema), verifyCode);
router.route("/forgetUsernameVerificationEmail").post(validationSchema(forgotUsernameSchema), forgetUsernameVerificationEmail);
router.route("/forgotUsername").post(validationSchema(forgotUsernameSchema), forgotUsername);
router.route("/forgotPasswordVerificationEmail").post(validationSchema(forgotPasswordVerificationEmailSchema), forgotPasswordVerificationEmail);
router.route("/forgotPasswordVerificationCode").post(validationSchema(forgotPasswordVerificationCodeSchema), forgotPasswordVerificationCode);
router.route("/forgotPassword").patch(validationSchema(forgotPasswordSchema), forgotPassword);

// secured routes
router.route("/logout").post(verifyToken, logoutUser);
router.route("/changeUsername").patch(verifyToken, validationSchema(changeUsernameSchema), changeUsername);
router.route("/changePassword").patch(verifyToken, validationSchema(changePasswordSchema), changePassword);
router.route("/addDetails").post(verifyToken, validationSchema(addDetailsSchema), addDetails);
router.route("/changeEmail").patch(verifyToken, validationSchema(changeEmailSchema), changeEmail);
router.route("/verifyNewEmail").post(verifyToken, validationSchema(verifyNewEmailSchema), verifyNewEmail);
router.route("/data").get(verifyToken, getUserData);

export default router;