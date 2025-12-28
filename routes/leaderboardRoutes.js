import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getOverallLeaderboard } from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/overall", authMiddleware, getOverallLeaderboard);

export default router;
