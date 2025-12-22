import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendOTPEmail } from "../utils/sendEmail.js";




/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* =================== FORGOT PASSWORD =================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const genericMsg = {
      message: "If the email is registered, an OTP has been sent."
    };

    const user = await User.findOne({ email });

    // ✅ INTERNAL LOG (ADMIN ONLY)
    if (!user) {
      console.log("🔐 Forgot password requested for non-existing email:", email);
      return res.json(genericMsg);
    }

    // ⏳ 60 sec resend protection
    if (
      user.resetOTPSentAt &&
      Date.now() - user.resetOTPSentAt < 60 * 1000
    ) {
      return res.status(429).json({
        message: "Please wait before requesting another OTP"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOTP = hashedOTP;
    user.resetOTPExpiry = Date.now() + 10 * 60 * 1000;
    user.resetOTPSentAt = Date.now();
    user.resetOTPAttempts = 0;

    await user.save();
    await sendOTPEmail(user.email, otp);

    return res.json(genericMsg);
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



/* =================== RESET PASSWORD =================== */
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // 🚫 Max 5 attempts
    if (user.resetOTPAttempts >= 5) {
      return res.status(429).json({
        message: "Too many attempts. Request a new OTP."
      });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.resetOTP !== hashedOTP ||
      user.resetOTPExpiry < Date.now()
    ) {
      user.resetOTPAttempts += 1;
      await user.save();
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // ✅ SUCCESS
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    user.resetOTPAttempts = 0;
    user.resetOTPSentAt = undefined;

    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



/* ================= CHANGE PASSWORD (PROTECTED) ================= */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return res.json({ message: "Password changed successfully" });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= PROFILE (PROTECTED) ================= */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }

};

