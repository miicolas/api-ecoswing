import express from "express";

import auth from "./routes/authRoutes.js";
import gift from "./routes/giftRoutes.js";
import dashboard from "./routes/dashboardRoutes.js";
import game from "./routes/gameRoutes.js";

const router = express.Router();

router.use("/auth", auth);
router.use("/gift", gift);
router.use("/dashboard", dashboard);
router.use ("/game", game)

export default router;
