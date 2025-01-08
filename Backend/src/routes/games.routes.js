import { Router } from "express";
import verifyToken from "../middlewares/auth.middleware.js";
import { 
    addAsphaltId, 
    addBgmiId, 
    addCodmId, 
    addFreeFireId, 
    addValorantId,
} from "../controllers/game.controller.js";
import validationSchema from "../middlewares/zodValidator.middleware.js";
import {
    bgmiIdSchema,
    codmIdSchema,
    freeFireIdSchema,
    valorantIdSchema,
    asphaltIdSchema
} from "../utils/zodSchema/gameValidatorSchema.js";
import initializeGameModel from "../middlewares/gameInitilizer.middleware.js";

const router = Router();

router.route("/bgmi").post(verifyToken,initializeGameModel , validationSchema(bgmiIdSchema), addBgmiId);
router.route("/codm").post(verifyToken, initializeGameModel ,validationSchema(codmIdSchema), addCodmId);
router.route("/valorant").post(verifyToken, initializeGameModel ,validationSchema(valorantIdSchema), addValorantId);
router.route("/freefire").post(verifyToken, initializeGameModel ,validationSchema(freeFireIdSchema), addFreeFireId);
router.route("/asphalt").post(verifyToken, initializeGameModel ,validationSchema(asphaltIdSchema), addAsphaltId);


export default router;