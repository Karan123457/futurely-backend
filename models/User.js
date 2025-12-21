const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  resetOTP: String,
  resetOTPExpiry: Date,
  resetOTPSentAt: Date,
  resetOTPAttempts: { type: Number, default: 0 },

  role: { type: String, default: "student" },
}, { timestamps: true });
