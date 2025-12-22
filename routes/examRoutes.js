import express from "express";
import { savePhysicsAttempt } from "../controllers/examController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/physics/attempt", authMiddleware, savePhysicsAttempt);

export default router;
