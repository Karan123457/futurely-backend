import Question from "../models/Question.js";

/**
 * GET QUESTIONS
 * /api/questions?exam=D2D&subject=Physics&year=2025
 */
export const getQuestions = async (req, res) => {
  try {
    const { exam, subject, year } = req.query;

    if (!exam || !subject) {
      return res.status(400).json({
        message: "exam and subject are required",
      });
    }

    const filter = { exam, subject };

    // year optional (ALL mode)
    if (year && year !== "ALL") {
      filter.year = Number(year);
    }

    const questions = await Question.find(filter)
      .sort({ year: -1, questionId: 1 })
      // REMOVE THIS LINE COMPLETELY FOR NOW


    res.json(questions);
  } catch (err) {
    console.error("Get questions error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADD QUESTION (ADMIN / SEEDING)
 */
export const addQuestion = async (req, res) => {
  try {
    const {
      questionId,
      exam,
      subject,
      year,
      text,
      options,
      correctIndex,
    } = req.body;

    if (
      !questionId ||
      !exam ||
      !subject ||
      !year ||
      !text ||
      !options ||
      correctIndex === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const question = await Question.create({
      questionId,
      exam,
      subject,
      year,
      text,
      options,
      correctIndex,
    });

    res.status(201).json(question);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Question already exists for this exam & subject",
      });
    }

    console.error("Add question error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
