import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getPhysicsLeaderboard,
  getOverallLeaderboard,
} from "../controllers/leaderboardController.js";

const router = express.Router();

router.get("/physics", authMiddleware, getPhysicsLeaderboard);
router.get("/overall", authMiddleware, getOverallLeaderboard);
export default router;
