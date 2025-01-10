import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import {
    createTournament,
    getTournaments,
    getTournamentInfo,
    registerUser,
} from "../controllers/tournament.controller.js";

import { postResult } from "../controllers/result.controller.js";

const router = Router();

//admin controlled routes
router.route("/createTournament").post(isAdmin, createTournament);

// router.route("/postResult").post(postResult);
// router.route("/getResults").get(verifyToken,getResults);

//user accessed routes
router.route("/getTournaments").get(verifyToken, getTournaments);
router.route("/getTournamentInfo").get(verifyToken, getTournamentInfo);
router.route("/registerTournament").post(verifyToken, registerUser);


// router.route("/getIndividualResult").get(verifyToken,getIndividualResult);

export default router;