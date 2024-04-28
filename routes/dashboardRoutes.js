import express from "express";
import { authenticateToken } from "../middleware/authToken.js";
import { getProfile } from "../controllers/profileControllers.js";

const router = express.Router();


router.get("/", authenticateToken, (req, res) => {
  res.redirect("/dashboard.html");
});
router.get("/getprofile", authenticateToken, getProfile); // Ensure correct route setup

export default router;
