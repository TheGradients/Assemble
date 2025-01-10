import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { USER_BADGES, USER_ROLES } from "../constants.js";

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
    },
    role: {
        type: String,
        enum: USER_ROLES,
        default: USER_ROLES[0],
    },
    registeredTournaments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Tournament",
        }
    ],
}, {
    timestamps: true,
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare( password, this.password)
}

export const User = mongoose.model("User", userSchema);