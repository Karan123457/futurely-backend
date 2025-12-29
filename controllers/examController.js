import ExamAttempt from "../models/ExamAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    if (!questionId || !exam) {
      return res.status(400).json({ message: "Question ID and exam are required" });
    }

    // ❗ Ignore wrong answers completely
    if (!isCorrect) {
      return res.json({ success: true });
    }

    // ❗ Check if already saved
    const exists = await ExamAttempt.findOne({
      userId: req.userId,
      questionId,
      exam,
    });

    // 🔒 FIRST CORRECT ALREADY SAVED → IGNORE
    if (exists) {
      return res.json({ success: true });
    }

    // ✅ SAVE ONLY FIRST CORRECT
    await ExamAttempt.create({
      userId: req.userId,
      subject: "physics",
      questionId,
      year,
      isCorrect: true,
      timeTaken,
      exam,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const saveChemistryAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    if (!questionId || !exam) {
      return res.status(400).json({ message: "Question ID and exam are required" });
    }

    // ❗ Ignore wrong answers completely
    if (!isCorrect) {
      return res.json({ success: true });
    }

    // ❗ Check if already saved
    const exists = await ExamAttempt.findOne({
      userId: req.userId,
      questionId,
      exam,
    });

    // 🔒 FIRST CORRECT ALREADY SAVED → IGNORE
    if (exists) {
      return res.json({ success: true });
    }

    // ✅ SAVE ONLY FIRST CORRECT
    await ExamAttempt.create({
      userId: req.userId,
      subject: "chemistry",
      questionId,
      year,
      isCorrect: true,
      timeTaken,
      exam,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const saveMathsAttempt = async (req, res) => {
  try {
    const { questionId, year, isCorrect, timeTaken, exam } = req.body;

    if (!questionId || !exam) {
      return res.status(400).json({ message: "Question ID and exam are required" });
    }

    // ❗ Ignore wrong answers completely
    if (!isCorrect) {
      return res.json({ success: true });
    }

    // ❗ Check if already saved
    const exists = await ExamAttempt.findOne({
      userId: req.userId,
      questionId,
      exam,
    });

    // 🔒 FIRST CORRECT ALREADY SAVED → IGNORE
    if (exists) {
      return res.json({ success: true });
    }

    // ✅ SAVE ONLY FIRST CORRECT
    await ExamAttempt.create({
      userId: req.userId,
      subject: "maths",
      questionId,
      year,
      isCorrect: true,
      timeTaken,
      exam,
    });

    res.json({ success: true });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


