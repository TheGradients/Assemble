import { Router } from "express";

import { getResults } from "../controllers/result.controller.js";

const router = Router();

router.route("/").get(getResults);

export default router;