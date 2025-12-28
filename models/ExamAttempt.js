import mongoose from "mongoose";

const examAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    enum: ["physics", "chemistry", "maths"],
    required: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  timeTaken: {
    type: Number, // seconds
    default: 0,
  },
  exam: {
    type: String,
    default: "COMMON",
    index: true
  },

}, { timestamps: true });

examAttemptSchema.index(
  { userId: 1, questionId: 1, exam: 1 },
  { unique: true }
);


export default mongoose.model("ExamAttempt", examAttemptSchema);
