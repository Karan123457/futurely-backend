import ExamAttempt from "../models/ExamAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    if (!questionId || !exam) {
      return res.status(400).json({ message: "Question ID and exam are required" });
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
    exam,
  },
  { upsert: true }
);


    res.json({ success: true });
  } catch (error) {
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
        exam,  // 👈 store silently
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
        exam,
      },
      { upsert: true }
    );

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
};

