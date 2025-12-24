import mongoose from "mongoose";

const physicsAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },import mongoose from "mongoose";

const physicsAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionId: { type: String, required: true },
    year: { type: String, required: true },
    selectedIndex: { type: Number, required: true },
    correctIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true },
    timeTaken: { type: Number, required: true },
  },
  { timestamps: true }
);


export default mongoose.model("PhysicsAttempt", physicsAttemptSchema);


    questionId: {
      type: String,
      required: true,
    },

    year: {
      type: String, // "2025", "2024"
      required: true,
    },

    selectedIndex: {
      type: Number,
      required: true,
    },

    correctIndex: {
      type: Number,
      required: true,
    },

    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("PhysicsAttempt", physicsAttemptSchema);

