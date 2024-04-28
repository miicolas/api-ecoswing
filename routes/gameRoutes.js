import express from "express";

import { addScore, getScore} from "../controllers/gameControllers.js";

const router = express.Router();

router.post("/addscore", addScore);
router.get("/getscore", getScore);

export default router;
