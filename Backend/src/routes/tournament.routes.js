import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import {
    getTournaments,
    getTournamentInfo,
    registerUser,
} from "../controllers/tournament.controller.js";

const router = Router();

//user accessed routes
router.route("/getTournaments").get(verifyToken, getTournaments);
router.route("/getTournamentInfo").get(verifyToken, getTournamentInfo);
router.route("/registerTournament").post(verifyToken, registerUser);


// router.route("/getIndividualResult").get(verifyToken,getIndividualResult);

export default router;