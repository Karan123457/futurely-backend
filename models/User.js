import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" },

  // 🔐 FORGOT PASSWORD
  resetOTP: String,
  resetOTPExpiry: Date,

}, { timestamps: true });


export default mongoose.model("User", userSchema);
