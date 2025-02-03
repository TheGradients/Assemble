import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(cookieParser());

// DEFAULT ROUTE
app.use("/", express.static(path.join(__dirname, "static")));

// HEALTH CHECK ROUTE
import healthRouter from "./routes/healthcheck.routes.js";
app.use("/api/v1", healthRouter);

// USER ROUTE
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);

// GAME ID ROUTE
import gameRouter from "./routes/games.routes.js";
app.use("/api/v1/users/games", gameRouter);

//TOURNAMENT ROUTE
import tournamentRouter from "./routes/tournament.routes.js";
app.use("/api/v1/tournament",tournamentRouter);

//ADMIN ROUTE
import adminRouter from "./routes/admin.routes.js";
app.use("/api/v1/admin",adminRouter);

export default app;