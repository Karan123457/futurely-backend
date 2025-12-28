import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  savePhysicsAttempt,
  saveChemistryAttempt,
  saveMathsAttempt,
} from "../controllers/examController.js";

const router = express.Router();

router.post("/physics/attempt", authMiddleware, savePhysicsAttempt);
router.post("/chemistry/attempt", authMiddleware, saveChemistryAttempt);
router.post("/maths/attempt", authMiddleware, saveMathsAttempt);

export default router;
