import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

import { Result } from "../models/result.models.js";
import { Tournament } from "../models/tournament.models.js";

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
    try {
        return res
            .status(200)
            .json(new ApiResponse(200, results, "Results fetched successfully!!"));
    } catch (error) {
        throw new ApiError(500, error.message);
    }
});

export {
    getResults
};