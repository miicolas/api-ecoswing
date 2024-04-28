import express from "express";
import { addGift } from "../controllers/giftControllers.js";
import { authenticateToken } from "../middleware/authToken.js";

const router = express.Router();

router.get("/addgift",authenticateToken, addGift);

export default router;
