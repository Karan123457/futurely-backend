import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // 🔐 Forgot password
  resetOTP: String,
  resetOTPExpire: Date,

  role: { type: String, default: "student" },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
