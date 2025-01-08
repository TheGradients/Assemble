import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Game } from "../models/gameId.models.js";

const initializeGameModel = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized Access.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new ApiError(401, "Unauthorized Access.");
    }
    try {
        const existingGame = await Game.findOne({ owner: user._id })
        if (existingGame) {
            return next();
        }
        await Game.create({
            owner: user._id
        });
        next();
    } catch (error) {
        throw new ApiError(500, error.message || "Game Model Initialization Failed.");
    }
});

export default initializeGameModel;