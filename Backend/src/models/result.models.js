import mongoose , { Schema } from "mongoose";
import {User} from "./user.models.js";

const resultSchema = new mongoose.Schema(
    {
        tournament: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tournament",
            required: true,
        },
        leaderboard: [
            {
                player: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                position: {
                    type: Number,
                    required: true,
                },
                username: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

resultSchema.pre("validate", async function (next) {
    try {
        for (let entry of this.leaderboard) {
            if (entry.username && !entry.player) {
                const user = await User.findOne({ username: entry.username });
                if (user) {
                    entry.player = user._id;
                    delete entry.username;
                } else {
                    throw new Error(`User with username "${entry.username}" not found.`);
                }
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

export const Result = mongoose.model("Result", resultSchema);