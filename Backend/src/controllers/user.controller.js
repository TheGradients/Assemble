import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { COOKIE_OPTIONS } from "../constants.js";
import jwt from "jsonwebtoken";
import passwordQueue from "../utils/bull/producers/passwordQueues/passwordQueue.js";
import changePasswordQueue from "../utils/bull/producers/passwordQueues/changePasswordQueue.js";
import forgotPasswordQueue from "../utils/bull/producers/passwordQueues/forgotPasswordQueue.js";
import sendRegisterationEmailQueue from "../utils/bull/producers/emailQueues/sendRegisterationEmailQueue.js";
import sendChangeEmailQueue from "../utils/bull/producers/emailQueues/sendChangeEmailQueue.js";
import sendVerificationCodeEmailQueue from "../utils/bull/producers/emailQueues/sendVerificationCodeEmailQueue.js";
import sendUsernameEmailQueue from "../utils/bull/producers/emailQueues/sendUsernameEmailQueue.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username || email || password)) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        throw new ApiError(409, "User Already Exists.")
    }
    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    try {
        const user = await User.create({
            username,
            email,
            password: "PENDING HASH",
            verificationCode
        });
        await passwordQueue.add('hash-password', { userId: user._id, password });
        return res
            .status(202)
            .json(new ApiResponse(
                202,
                null,
                "Registeration Initiated."
            ));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const verifyCode = asyncHandler(async (req, res) => {
    const { email, code } = req.body;
    if (!(email || code)) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    const userFound = await User.findOne({ email });
    if (!userFound) {
        throw new ApiError(404, "User Not Found.")
    }
    if (userFound.verificationCode !== code) {
        throw new ApiError(401, "Invalid Verification Code.")
    }
    try {
        await sendRegisterationEmailQueue.add('registeration-email', { userId: userFound._id });
        await userFound.updateOne({ isVerified: true });
        return res
            .status(200)
            .json(new ApiResponse(200, null, "User Verified Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const generateToken = async (user) => {
    try {
        const token = await jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        );
        return token;
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
};

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!(username || password)) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User Not Found.")
    }
    if (!user.isVerified) {
        await User.findByIdAndDelete(user._id);
        throw new ApiError(401, "User Not Verified.")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid Credentials.")
    }
    const token = await generateToken(user);
    if (!token) {
        throw new ApiError(500, "Token Generation Failed.")
    }
    try {
        return res
            .cookie("token", token, COOKIE_OPTIONS)
            .status(200)
            .json(new ApiResponse(200, null, "User Logged In Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    try {
        return res
            .clearCookie("token")
            .status(200)
            .json(new ApiResponse(200, null, "User Logged Out Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword || newPassword)) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    if (oldPassword === newPassword) {
        throw new ApiError(400, "Old Password And New Password Cannot Be Same.")
    }
    const user = req.user;
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new Error('Old password is incorrect');
    }
    try {
        await changePasswordQueue.add(
            'change-password',
            { userId: user._id, newPassword }
        );
        return res
            .status(200)
            .json(new ApiResponse(
                200,
                null,
                "Password Change Process Started."
            ));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const changeUsername = asyncHandler(async (req, res) => {
    const { newUsername } = req.body;
    if (!newUsername) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    const user = req.user;
    const existedUser = await User.findOne({ username: newUsername });
    if (existedUser) {
        throw new ApiError(409, "Username Already Exists.")
    }
    if (user.username === newUsername) {
        throw new ApiError(400, "Old Username And New Username Cannot Be Same.")
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { username: newUsername },
            { new: true }
        ).select("-password");
        await sendChangeEmailQueue.add('change-email', { userId: updatedUser._id, change: "username" });
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Username Changed Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const addDetails = asyncHandler(async (req, res) => {
    const { dob, name } = req.body;
    const user = req.user;
    if (!dob && !name) {
        throw new ApiError(400, "Atleast one field is required");
    }
    if (user.name === name) {
        throw new ApiError(400, "Old Name And New Name Cannot Be Same.");
    }
    const newDob = new Date(dob);
    if (user.dob && new Date(user.dob).getTime() === newDob.getTime()) {
        throw new ApiError(400, "Old Dob And New Dob Cannot Be Same.");
    }
    if (newDob > new Date()) {
        throw new ApiError(400, "Invalid Date Of Birth.");
    }
    try {
        if (name && !dob) {
            await User.findByIdAndUpdate(
                user._id,
                { name: name },
                { new: true }
            );
            return res
                .status(201)
                .json(new ApiResponse(200, null, "Name added Successfully"));
        }
        if (!name && dob) {
            await User.findByIdAndUpdate(
                user._id,
                { dob: newDob },
                { new: true }
            );
            return res
                .status(201)
                .json(new ApiResponse(200, null, "Dob added Successfully"));
        }
        await User.findByIdAndUpdate(
            user._id,
            { name: name, dob: dob },
            { new: true }
        );
        return res
            .status(201)
            .json(new ApiResponse(200, null, "Name and Dob added Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const changeEmail = asyncHandler(async (req, res) => {
    const { newEmail } = req.body;
    if (!newEmail) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    const user = req.user;
    const existedEmail = await User.findOne({ email: newEmail });
    if (newEmail === user.email) {
        throw new ApiError(409, "Old Email And New Email Cannot Be Same.");
    }
    if (existedEmail) {
        throw new ApiError(409, "Email Already Exists.");
    }
    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    try {
        const newUser = await User.findByIdAndUpdate(
            user._id,
            { verificationCode: verificationCode, canChangeEmail: true },
            { new: true }
        );
        await sendVerificationCodeEmailQueue.add('verification-code-email', { userId: newUser._id });
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Code Sent Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const verifyNewEmail = asyncHandler(async (req, res) => {
    const { newEmail, code } = req.body;
    const user = req.user;
    if (!code || !newEmail) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    if (user.verificationCode !== code) {
        throw new ApiError(401, "Invalid Verification Code.")
    }
    if (!user.canChangeEmail) {
        throw new ApiError(401, "User Not Verified To Change Email.");
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { email: newEmail, canChangeEmail: false, },
            {
                new: true
            }
        );
        await sendChangeEmailQueue.add('change-email', { userId: updatedUser._id, change: "email" });
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Email changed Successfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const forgetUsernameVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "All Fields Are Required.");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, "Email Not Found.");
    }

    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();

    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { verificationCode: verificationCode },
            { new: true }
        );

        await sendVerificationCodeEmailQueue.add('verification-code-email', { userId: updatedUser._id });

        return res
            .status(201)
            .json(new ApiResponse(201, null, "Mail Sent Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const forgotUsername = asyncHandler(async (req, res) => {
    const { email , code } = req.body;

    if (!email || !code) {
        throw new ApiError(400, "All Fields Are Required.");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new ApiError(404, "Email Not Found.");
    }

    if(user.verificationCode !== code) {
        throw new ApiError(401, "Invalid Verification Code.");
    }

    try {
        await sendUsernameEmailQueue.add('username-email', { userId: user._id });
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Mail Sent Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const forgotPasswordVerificationEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ApiError(404, "Email Not Found.");
    }
    const verificationCode = (Math.floor(100000 + Math.random() * 900000)).toString();
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { verificationCode: verificationCode },
            { new: true }
        );
        await sendVerificationCodeEmailQueue.add('verification-code-email', { userId: updatedUser._id });
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Mail Sent Successfully."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const forgotPasswordVerificationCode = asyncHandler(async (req, res) => {
    const { email, code } = req.body;
    if (!code || !email) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    const user = await User.findOne({ email: email });
    if (user.verificationCode !== code) {
        throw new ApiError(401, "Invalid Verification Code.")
    }
    try {
        await User.findByIdAndUpdate(
            user._id,
            { canChangePassword: true },
            {
                new: true,
            }
        );
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Mail Verified Successfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        throw new ApiError(400, "All Fields Are Required.")
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new ApiError(404, "Email Not Found.");
    }
    if (!user.canChangePassword) {
        throw new ApiError(401, "User Not Verified To Change Password.");
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (isPasswordCorrect) {
        throw new ApiError(400, "Old Password And New Password Cannot Be Same.");
    }
    try {
        await forgotPasswordQueue.add('forgot-password', { userId: user._id, password });
        return res
            .status(200)
            .json(new ApiResponse(200, null, "Password Change Process Started."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const getUserData = asyncHandler(async (req, res) => {
    const user = req.user;
    try {
        const newUser = await User.aggregate([
            {
                $match: {
                    _id: user._id,
                }
            },
            {
                $lookup: {
                    from: "games",
                    localField: "_id",
                    foreignField: "owner",
                    as: "games"
                }
            },
            {
                $project: {
                    email: 1,
                    username: 1,
                    name: 1,
                    dob: 1,
                    badge: 1,
                    isVerified: 1,
                    "games.bgmiId": 1,
                    "games.codmId": 1,
                    "games.valorantId": 1,
                    "games.freefireId": 1,
                    "games.asphaltId": 1
                }
            }
        ]);
        return res
            .status(200)
            .json(new ApiResponse(200, newUser, "User Data."));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    verifyCode,
    changePassword,
    changeUsername,
    addDetails,
    changeEmail,
    verifyNewEmail,
    forgetUsernameVerificationEmail,
    forgotUsername,
    forgotPasswordVerificationEmail,
    forgotPasswordVerificationCode,
    forgotPassword,
    getUserData,
};