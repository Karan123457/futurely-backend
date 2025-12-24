import express from "express";
import { getPhysicsLeaderboard } from "../controllers/leaderboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/physics", authMiddleware, getPhysicsLeaderboard);

export default router;
