import mongoose from "mongoose";

const examAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
    enum: ["physics"],
  },
  questionId: { type: String, required: true },
  year: { type: String },
  isCorrect: { type: Boolean, required: true },
  timeTaken: { type: Number },
}, { timestamps: true });

export default mongoose.model("ExamAttempt", examAttemptSchema);
