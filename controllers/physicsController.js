import PhysicsAttempt from "../models/PhysicsAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
    const {
      questionId,
      year,
      selectedIndex,
      correctIndex,
    } = req.body;

    const attempt = await PhysicsAttempt.create({
      user: req.userId,
      questionId,
      year,
      selectedIndex,
      correctIndex,
      isCorrect: selectedIndex === correctIndex,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("PHYSICS ATTEMPT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
