import { DateTime } from "luxon";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Result } from "../models/result.models.js";
import { Tournament } from "../models/tournament.models.js";
import { REGION, GAME_ID } from "../constants.js";
import { check24HourFormat, checkDateFormat } from "../helpers/checkDateTime.js";
import { IDP } from "../models/idp.models.js";

const now = new Date();

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
        instructions,
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
            name,
            matchDate,
            matchTime,
            registrationEndDate,
            registrationEndTime,
            totalSlots,
            prizePool,
            game,
            entryFee,
            description,
            instructions,
            isActive: true,
            //isOngoing: true,
        });

        return res
        .status(201)
        .json( new ApiResponse(201, tournament, "Tournament Created Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const addIDP = asyncHandler(async (req, res) => {
    const { tournamentName, roomId, roomPassword } = req.body;

    if (!tournamentName || !roomId || !roomPassword) {
        throw new ApiError(400, "All Fields are Required.");
    }

    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament Not Found.");
    }

    if(tournament.idp){
        throw new ApiError(400, "IDP Already Exists for this Tournament.");
    }

    try {
        const idp = await IDP.create({
            tournamentId: tournament._id,
            tournamentName,
            roomId,
            roomPassword,
        });
        
        const updatedTournament = await Tournament.findOneAndUpdate(
            { _id: tournament._id },
            { idp: idp._id },
            { new: true }
        );
        
        return res
        .status(201)
        .json(new ApiResponse(201, updatedTournament, "IDP Added Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }  
});

const editIDP =asyncHandler(async (req,res) =>{
    const { tournamentName, roomId, roomPassword } = req.body;

    if (!tournamentName || !roomId || !roomPassword){
        throw new ApiError(400, "All Fields are Required.");
    }

    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament Not Found.");
    }

    const idp = await IDP.findOne({ tournamentId: tournament._id });
    if (!idp) {
        throw new ApiError(404, "IDP Not Found, create one first!");
    }

    
    try {
        idp.roomId = roomId;
        idp.roomPassword = roomPassword;
    
        await idp.save();
    
        return res
        .status(200)
        .json(new ApiResponse(200, idp, "IDP Updated Successfully!!"));

    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const editTournament  = asyncHandler(async (req, res) =>{
    const {
        oldName,
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
    const existingTournament = await Tournament.findOne({ name: oldName });
    if (!existingTournament) {
        throw new ApiError(404, "Tournament not found.");
    }

    try {
        const matchTiming = DateTime.fromISO(`${matchDate}T${matchTime}`, { zone: REGION });
        const registrationTiming = DateTime.fromISO(`${registrationEndDate}T${registrationEndTime}`, { zone: REGION });
        const tournament = await Tournament.findOneAndUpdate(
            { name: oldName },
            {
                $set:{
                    name,
                    matchDate: matchTiming.toFormat("dd-MM-yyyy"),
                    matchTime: matchTiming.toFormat("HH:mm"),
                    registrationEndDate: registrationTiming.toFormat("dd-MM-yyyy"),
                    registrationEndTime: registrationTiming.toFormat("HH:mm"),
                    totalSlots,
                    prizePool,
                    type,
                    name,
                    matchDate,
                    matchTime,
                    registrationEndDate,
                    registrationEndTime,
                    totalSlots,
                    prizePool,
                    game,
                    entryFee,
                    description,
                    instructions,
                }
            },
            { new: true }
        );
        return res
        .status(200)
        .json(new ApiResponse(200, tournament, "Tournament Updated Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
        
    }
});

const deleteTournament = asyncHandler(async (req, res) => {
    const { tournamentName } = req.body;
    if (!tournamentName) {
        throw new ApiError(400, "Tournament Name is Required.");
    }
    const tournament = await Tournament.findOne({ name: tournamentName });
    if (!tournament) {
        throw new ApiError(404, "Tournament Not Found.");
    }
    try {
        await Tournament.deleteOne({ name: tournamentName });
        return res
        .status(200)
        .json(new ApiResponse(200, {}, "Tournament Deleted Successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const postTournamentResult = asyncHandler(async (req, res) => {
    const { tournamentName,leaderboard} = req.body;

    if (!tournamentName || !leaderboard) {
        throw new ApiError(400, "All Fields are Required.");
    }
    const tournament = await Tournament.findOne({ name: tournamentName });

    if (!tournament) {
        throw new ApiError(404, "Tournament Not Found.");
    }

    const result = await Result.findOne({ tournament: tournament._id });

    if (result) {
        throw new ApiError(400, "Result Already Exists go to the edit route.");
    }

    try {
        const result = await Result.create({
            tournament: tournament._id,
            leaderboard,
        });

        return res
        .status(201)
        .json(new ApiResponse(201, result, "Tournament Result Posted Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

const editTournamentResult = asyncHandler(async (req, res) => { 
    const { tournamentName,leaderboard} = req.body;

    if (!tournamentName || !leaderboard) {
        throw new ApiError(400, "All Fields are Required.");
    }
    const tournament = await Tournament.findOne({ name: tournamentName });

    if (!tournament) {
        throw new ApiError(404, "Tournament Not Found.");
    }

    const result = await Result.findOne({ tournament: tournament._id });

    if (!result) {
        throw new ApiError(400, "Result Not Found.");
    }

    try {
        result.leaderboard = leaderboard;

        await result.save();

        return res
        .status(200)
        .json(new ApiResponse(200, result, "Tournament Result Updated Successfully"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

export 
{
    addIDP,
    editIDP,
    createTournament,
    editTournament,
    deleteTournament,
    postTournamentResult,
    editTournamentResult
}