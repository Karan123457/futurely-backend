import PhysicsAttempt from "../models/PhysicsAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
    const {
      questionId,
      year,
      selectedIndex,
      correctIndex,
      timeTaken, // ✅ ADD THIS
    } = req.body;

    await PhysicsAttempt.create({
      user: req.userId,
      questionId,
      year,
      selectedIndex,
      correctIndex,
      isCorrect: selectedIndex === correctIndex,
      timeTaken: timeTaken || 0, // ✅ SAFE DEFAULT
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("PHYSICS ATTEMPT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
