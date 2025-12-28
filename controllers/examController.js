import ExamAttempt from "../models/ExamAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "Question ID required" });
    }

    await ExamAttempt.findOneAndUpdate(
  { userId: req.userId, questionId, exam },
  {
    userId: req.userId,
    subject: "physics",
    questionId,
    year,
    isCorrect,
    timeTaken,
    exam: exam || "COMMON"
  },
  { upsert: true }
);


    res.json({ success: true });
  } catch (error) {
    console.error("SAVE PHYSICS ATTEMPT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const saveChemistryAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    await ExamAttempt.findOneAndUpdate(
      { userId: req.userId, questionId, exam },
      {
        userId: req.userId,
        subject: "chemistry",
        questionId,
        year,
        isCorrect,
        timeTaken,
        exam: exam || "COMMON",   // 👈 store silently
      },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

export const saveMathsAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    await ExamAttempt.findOneAndUpdate(
      { userId: req.userId, questionId, exam },
      {
        userId: req.userId,
        subject: "maths",
        questionId,
        year,
        isCorrect,
        timeTaken,
        exam: exam || "COMMON",   // 👈 store silently
      },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

