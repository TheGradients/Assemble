import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { USER_ROLES } from "../constants.js";

const isAdmin = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized Access.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new ApiError(401, "Unauthorized Access.");
    }
    if (user.role !== USER_ROLES[1]) {
        throw new ApiError(403, "Forbidden Access.");
    }
    try {
        next();
    } catch (error) {
        throw new ApiError(500, error.message || "Internal Server Error");
    }
});

export default isAdmin;