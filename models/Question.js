import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
      index: true, // fast lookup
    },

    exam: {
      type: String,
      required: true,
      enum: ["D2D", "BRB", "BRP", "JHP"],
    },

    subject: {
      type: String,
      required: true,
      enum: ["Physics", "Chemistry", "Math"],
    },

    year: {
      type: Number,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      required: true,
      validate: v => v.length >= 2,
    },

    correctIndex: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * 🔒 IMPORTANT UNIQUE RULE
 * Same questionId CAN exist in different exams
 * Same questionId CAN exist in different subjects
 * But NOT duplicate within same exam + subject
 */
questionSchema.index(
  { questionId: 1, exam: 1, subject: 1 },
  { unique: true }
);

export default mongoose.model("Question", questionSchema);
