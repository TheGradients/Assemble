import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Game } from "../models/gameId.models.js";

const addBgmiId = asyncHandler(async (req, res) => {
    const { gameID } = req.body;
    
    const user = req.user;
    if (!gameID) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { bgmiId: gameID },
            { new: true }
        );
        return res
            .status(201)
            .json(new ApiResponse(201, null, "BGMI ID Added Sucessfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const addFreeFireId = asyncHandler(async (req, res) => {
    const { gameID } = req.body;
    const user = req.user;
    if (!gameID) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { freefireId: gameID },
            { new: true }
        );
        return res
            .status(201)
            .json(new ApiResponse(201, null, "FreeFire ID Added Sucessfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const addValorantId = asyncHandler(async (req, res) => {
    const { gameID } = req.body;
    const user = req.user;
    if (!gameID.tagline || !gameID.riotId) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            {
                valorantId: {
                    riotId: gameID.riotId,
                    tagline: gameID.tagline
                }
            },
            { new: true }
        );
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Valorant ID Added Sucessfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const addCodmId = asyncHandler(async (req, res) => {
    const { gameID } = req.body;
    const user = req.user;
    if (!gameID) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { codmId: gameID },
            { new: true }
        );
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Call of Duty Mobile ID Added Sucessfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

const addAsphaltId = asyncHandler(async (req, res) => {
    const { gameID } = req.body;
    const user = req.user;
    if (!gameID) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { asphaltId: gameID },
            { new: true }
        );
        return res
            .status(201)
            .json(new ApiResponse(201, null, "Asphalt ID Added Sucessfully!"));
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error.");
    }
});

export {
    addBgmiId,
    addFreeFireId,
    addCodmId,
    addValorantId,
    addAsphaltId,
};