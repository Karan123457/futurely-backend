import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // ✅ ADD THIS

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ PROTECTED ROUTE
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected profile data",
    userId: req.userId,
  });
});

export default router;
