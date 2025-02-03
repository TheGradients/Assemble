import { Router } from 'express';
import  verifyToken  from '../middlewares/auth.middleware.js';
import  isAdmin  from '../middlewares/isAdmin.middleware.js';
import 
{
    addIDP,
    editIDP,
    createTournament,
    editTournament,
    deleteTournament,
    postTournamentResult,
    editTournamentResult
} from "../controllers/admin.controller.js";

const router = Router();

router.route("/createTournament").post(verifyToken, isAdmin, createTournament);
router.route("/addIDP").post(verifyToken, isAdmin, addIDP);
router.route("/editIDP").patch(verifyToken, isAdmin, editIDP);
router.route("/editTournament").put(verifyToken, isAdmin, editTournament);
router.route("/deleteTournament").delete(verifyToken, isAdmin, deleteTournament);
router.route("/postResult").post(verifyToken, isAdmin, postTournamentResult);
router.route("/editResult").put(verifyToken, isAdmin, editTournamentResult);

export default router;