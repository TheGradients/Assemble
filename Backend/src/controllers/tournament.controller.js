import { DateTime } from "luxon";

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Game } from "../models/gameId.models.js";
import { Tournament } from "../models/tournament.models.js";
import { REGION, GAME_ID } from "../constants.js";
import { check24HourFormat, checkDateFormat } from "../helpers/checkDateTime.js";

const now = new Date();

// admin controlled routes
const createTournament = asyncHandler(async (req, res) => {
    const {
        name,
        matchDate,
        matchTime,
        registrationEndDate,
        registrationEndTime,
        totalSlots,
        prizePool,
        type,
        game,
        entryFee,
        description,
        instructions
    } = req.body;
    if (!check24HourFormat(matchTime) || !check24HourFormat(registrationEndTime)) {
        throw new ApiError(400, "Invalid Time Format. Please Use hh:mm Format.");
    }
    if (!checkDateFormat(matchDate) || !checkDateFormat(registrationEndDate)) {
        throw new ApiError(400, "Invalid Date Format. Please Use yyyy-MM-dd Format.");
    }
    if(new Date(`${registrationEndDate}T${registrationEndTime}`) <= now){
        throw new ApiError(400, "Registration End Date Must Be Greater Than Current Date and Time.");
    }
    if (new Date(`${matchDate}T${matchTime}`) <= new Date(`${registrationEndDate}T${registrationEndTime}`)) {
        throw new ApiError(400, "Match Date Must Be Greater Than Registration End Date and Time.");
    }
    const existingTournament = await Tournament.findOne({ name });
    if (existingTournament) {
        throw new ApiError(400, "Tournament With This Name Already Exists.");
    }
    try {
        const matchTiming = DateTime.fromISO(`${matchDate}T${matchTime}`, { zone: REGION });
        const registrationTiming = DateTime.fromISO(`${registrationEndDate}T${registrationEndTime}`, { zone: REGION });
        const tournament = await Tournament.create({
            name,
            matchDate: matchTiming.toFormat("dd-MM-yyyy"),
            matchTime: matchTiming.toFormat("HH:mm"),
            registrationEndDate: registrationTiming.toFormat("dd-MM-yyyy"),
            registrationEndTime: registrationTiming.toFormat("HH:mm"),
            totalSlots,
            prizePool,
            type,
            game,
            entryFee,
            description,
            instructions,
        });
        return res
        .status(201)
        .json( new ApiResponse(201, tournament, "Tournament Created Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

// user accessed routes
const getTournaments = asyncHandler(async (req, res) => {
    try {
        const tournaments = await Tournament.find({ 
            isActive: true,
            isOngoing: true,
        }).sort({
            createdAt:-1,
        }).select(
            "name matchDate matchTime registrationEndDate registrationEndTime totalSlots filledSlots prizePool type game entryFee rating description instructions"
        );
        return res
        .status(200)
        .json(new ApiResponse(200, tournaments, "Tournaments Fetched Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
})

const getTournamentInfo = asyncHandler(async (req,res) => {
    const { tournamentName } = req.body;
    if (!tournamentName) {
        throw new ApiError(400, "Tournament Name is Required.");
    }
    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }
    try {
        return res
            .status(200)
            .json(new ApiResponse(200, tournament, "Tournament fetched successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { tournamentName } = req.body;
    const user = req.user; 
    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament Not Found.");
    }
    if (!tournament.isActive) { 
        throw new ApiError(400, "Tournament Is Not Active.");
    }
    if (tournament.filledSlots >= tournament.totalSlots) {
        throw new ApiError(400, "Tournament Is Full.");
    }
    const tournamentGame = GAME_ID[tournament.game];
    const userHasGameId = await Game.findOne({ owner: user._id });
    if (!userHasGameId || !userHasGameId[tournamentGame]) {
        throw new ApiError(400, "Please Add Game Id First.");
    }
    
    const userRegistered = await Tournament.findOne({ registeredPlayers: user._id });
    if (userRegistered) {
        throw new ApiError(400, "User Already Registered For This Tournament.");
    }
    try {
        user.registeredTournaments.push(tournament._id);
        await user.save();
        tournament.registeredPlayers.push(user._id);
        tournament.filledSlots += 1;
        await tournament.save();
        return res
            .status(200)
            .json(new ApiResponse(200, null,"Registered Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

export {
    createTournament,
    getTournaments,
    getTournamentInfo,
    registerUser,
};