import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Tournament } from "../models/tournament.models.js";
import { Result } from "../models/result.models.js";
import mongoose from "mongoose";

const createTournaments = asyncHandler(async(req,res)=>{

    const {name,
        matchDate,
        matchTime,
        registrationEndDate,
        totalSlots,
        prizePool,
        type,
        game,
        entryFee,
        description,
        instructions,} = req.body;

    const now = new Date();
    if(new Date(registrationEndDate) <= now){
        throw new ApiError(400,"Registration end date must be in future!")
    }

    if (new Date(matchDate) <= new Date(registrationEndDate)) {
        throw new ApiError(400,"Match must be after registration ends!")
    }

    const existingTournament = await Tournament.findOne({ name });

    if (existingTournament) {
        throw new ApiError(400, "Tournament already exists with this name");
    }

    try {
        const tournament = await Tournament.create({
            name,
            matchDate,
            matchTime,
            registrationEndDate,
            totalSlots,
            prizePool,
            type,
            game,
            entryFee,
            description,
            instructions,
        })
    
        return res
        .status(201)
        .json( new ApiResponse(201,tournament,"Tournament Created Successfully!!"))

    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error")
    }
})

const getTournaments = asyncHandler(async(_,res)=>{

    try {
        const tournaments = await Tournament.find({ isActive:true })
        .sort({createdAt:-1})
        .select("name matchDate matchTime registrationEndDate totalSlots filledSlots prizePool type game entryFee rating description instructions")
        return res
        .status(200)
        .json(new ApiResponse(200,tournaments,"Tournaments fetched successfully!!"))
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error")  
    }
})

const tournamentInfo = asyncHandler(async(req,res)=>{
    const { tournamentName } = req.body;

    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }

    return res.
    status(200).
    json(new ApiResponse(200, tournament, "Tournament fetched successfully!!"));
    
})

const registerPlayer = asyncHandler(async (req, res) => {
    const { tournamentName } = req.body;
    const user = req.user; 

    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }

    if (!tournament.isActive) { 
        throw new ApiError(400, "Tournament is not active");
    }

    if (tournament.registeredPlayers.includes(user._id)) {
        throw new ApiError(400, "You are already registered for this tournament");
    }

    if (tournament.filledSlots >= tournament.totalSlots) {
        throw new ApiError(400, "Tournament is full");
    }

    try {
        tournament.registeredPlayers.push(user._id);
        tournament.filledSlots += 1;
        await tournament.save();

        return res.status(200).json(new ApiResponse(200, "Registered Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const postResult = asyncHandler(async (req, res) => {
    const { tournamentName, leaderboard } = req.body;

    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }

    if (!tournament.isActive) {
        throw new ApiError(400, "Tournament is not active");
    }

    if(!leaderboard || leaderboard.length === 0){
        throw new ApiError(400, "Leaderboard is required");
    }

    try {
         await Result.create({
            tournament: tournament._id,
            leaderboard,
        });
    
        return res
        .status(201)
        .json(new ApiResponse(201, "Result Posted Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

//for admin
const getResults = asyncHandler(async (req, res) => {
    const { tournamentName } = req.body;

    const tournament = await Tournament.findOne({ name: tournamentName });

    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }

    const results = await Result.find({ tournament: tournament._id })

    if (!results) {
        throw new ApiError(404, "Results not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, results, "Results fetched successfully!!"));
});

//for user
const getIndividualResult = asyncHandler(async (req, res) => {
    const { tournamentName } = req.body;
    const user = req.user;

    if(!tournamentName){
        throw new ApiError(400, "Tournament name is required");
    }

    const tournament = await Tournament.findOne({ name: tournamentName });

    if (!tournament) {
        throw new ApiError(404, "Tournament not found");
    }

    const position = await Result.findOne(
        { tournament: tournament._id, "leaderboard.player": user._id },
        { "leaderboard.$": 1 }
    ).select("-tournament -_id -createdAt -updatedAt -__v"); 

    if (!position) {
        throw new ApiError(404, "Result not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, position, "Result fetched successfully!!"));   
});

export { 
    createTournaments, 
    getTournaments, 
    registerPlayer, 
    tournamentInfo, 
    postResult, 
    getResults,
    getIndividualResult,
}