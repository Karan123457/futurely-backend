import express from "express";
import {
  registerUser,
  loginUser,
  getProfile
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔐 Protected route (PRODUCTION READY)
router.get("/profile", authMiddleware, getProfile);

export default router;
