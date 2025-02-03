import mongoose , { Schema } from "mongoose";
import {User} from "./user.models.js";
import {Tournament} from "./tournament.models.js";
import ApiError from "../utils/ApiError.js";

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
                    required: false,
                },
                position: {
                    type: Number,
                    required: true,
                    unique: true,
                },
                username: {
                    type: String,
                    unique: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

resultSchema.pre("save", async function (next) {
    try {
        if (!this.leaderboard || this.leaderboard.length === 0) {
            return next();
        }

        for (let entry of this.leaderboard) {
            if (entry.username && !entry.player) {
                const user = await User.findOne({ username: entry.username });

                if (user) {
                    entry.player = user._id;  // Assign player's ObjectId
                    //entry.username = undefined;  // Remove the username field safely
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

resultSchema.pre("save",async function(next){
    try {
        const tournament = await Tournament.findById(this.tournament);

        if(!tournament){
            throw new ApiError(404,"Tournament not found");
        }

        for (let entry of this.leaderboard) {
            const isRegistered = tournament.registeredPlayers.includes(entry.player);

            if(!isRegistered){
                throw new ApiError(400,`Player with username ${entry.username} is not registered in the tournament`);
            }
        }
        next();
    } catch (error) {
        next(error);
    }
})

export const Result = mongoose.model("Result", resultSchema);