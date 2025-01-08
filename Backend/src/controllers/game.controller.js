import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Game } from "../models/gameId.models.js";

const addBgmiId = asyncHandler(async (req, res) => {
    const { bgmiId } = req.body;
    const user = req.user;
    if (!bgmiId) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { bgmiId: bgmiId },
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
    const { freeFireId } = req.body;
    const user = req.user;
    if (!freeFireId) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { freefireId: freeFireId },
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
    const { valorantId } = req.body;
    const user = req.user;
    if (!valorantId.tagline || !valorantId.riotId) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            {
                valorantId: {
                    riotId: valorantId.riotId,
                    tagline: valorantId.tagline
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
    const { codmId } = req.body;
    const user = req.user;
    if (!codmId) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { codmId: codmId },
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
    const { asphaltId } = req.body;
    const user = req.user;
    if (!asphaltId) {
        throw new ApiError(400, "All Fields Are Required.");
    }
    try {
        await Game.findOneAndUpdate(
            { owner: user._id },
            { asphaltId: asphaltId },
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