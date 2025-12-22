import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  changePassword,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";
import { getDashboard } from "../controllers/dashboardController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// 🔐 Protected APIs
router.get("/profile", authMiddleware, getProfile);
router.get("/dashboard", authMiddleware, getDashboard); // ✅ FIXED
router.put("/change-password", authMiddleware, changePassword);
router.get("/dashboard", authMiddleware, getDashboard);



export default router;
