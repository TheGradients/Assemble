import mongoose, { Schema } from "mongoose";
import { GAMES, TOURNAMENT_TYPES } from "../constants.js";

const tournamentScehma = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,    
    },
    matchDate: {
        type: Date,
        required: true,
    },
    matchTime: {
        type: Date,
        required: true,
    },
    registrationEndDate: {
        type: Date,
        required: true,
    },
    totalSlots: {
        type: Number,
        required: true,
    },
    filledSlots: {
        type: Number,
        default: 0,
    },
    prizePool: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: TOURNAMENT_TYPES,
        required: true,
    },
    game: {
        type: String,
        enum: GAMES,
        required: true,
    },
    entryFee: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        max: 5,
        default: 1,
    },
    description: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    registeredPlayers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    isActive: {
        type: Boolean,
        default: true,
    },
    // idp: {},
    // refundForm: {},
}, {
    timestamps: true,
});

export const Tournament = mongoose.model("Tournament", tournamentScehma);