import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { savePhysicsAttempt } from "../controllers/physicsController.js";

const router = express.Router();

router.post("/attempt", authMiddleware, savePhysicsAttempt);

export default router;
