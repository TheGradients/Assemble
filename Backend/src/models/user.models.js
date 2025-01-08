import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { USER_BADGES } from "../constants.js";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type:String
    },
    dob:{
        type: Date,
    },
    badge: {
        type: String,
        enum: USER_BADGES,
        default: USER_BADGES[0],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String
    },
    canChangeEmail: {
        type: Boolean,
        default: false,
    },
    canChangePassword: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare( password, this.password)
}

export const User = mongoose.model("User", userSchema);