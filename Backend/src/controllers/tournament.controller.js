import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Game } from "../models/gameId.models.js";
import { Tournament } from "../models/tournament.models.js";
import { GAME_ID } from "../constants.js";

const getTournaments = asyncHandler(async (req, res) => {
    try {
        const tournaments = await Tournament.find({ 
            isActive: true,
            //isOngoing: true,
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
    getTournaments,
    getTournamentInfo,
    registerUser,
};