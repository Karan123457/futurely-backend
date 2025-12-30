import mongoose from "mongoose";
import dotenv from "dotenv";
import Question from "../models/Question.js";

dotenv.config();

async function seedQuestions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const questions = await import("./questions-test.json", {
      assert: { type: "json" }
    });

    await Question.insertMany(questions.default, { ordered: false });

    console.log("✅ Questions seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedQuestions();
