import ExamAttempt from "../models/ExamAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken } = req.body;

    if (!questionId) {
      return res.status(400).json({ message: "Question ID required" });
    }

    await ExamAttempt.create({
      userId: req.userId,
      subject: "physics",
      questionId,
      year,
      isCorrect,
      timeTaken,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("SAVE PHYSICS ATTEMPT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
