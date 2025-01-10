import mongoose, { Schema } from "mongoose";
import { GAMES, TOURNAMENT_TYPES } from "../constants.js";

const tournamentScehma = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,    
    },
    matchDate: {
        type: String,
        required: true,
    },
    matchTime: {
        type: String,
        required: true,
    },
    registrationEndDate: {
        type: String,
        required: true,
    },
    registrationEndTime: {
        type: String,
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
    // for finished registration
    isActive: {
        type: Boolean,
        default: true,
    },
    // for ongoing tournaments (registration completed)
    isOngoing: {
        type: Boolean,
        default: false,
    },
    // for finished tournaments
    isCompleted: {
        type: Boolean,
        default: false,
    },
    // idp: {},
    // refundForm: {},
}, {
    timestamps: true,
});

export const Tournament = mongoose.model("Tournament", tournamentScehma);