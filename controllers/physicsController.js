import PhysicsAttempt from "../models/PhysicsAttempt.js";

export const savePhysicsAttempt = async (req, res) => {
  try {
     console.log("PHYSICS ATTEMPT BODY:", req.body); // 👈 ADD THIS

    const {
  questionId,
  year,
  selectedIndex,
  correctIndex,
  timeTaken,
} = req.body;

await PhysicsAttempt.create({
  user: req.userId,
  questionId,
  year,
  selectedIndex,
  correctIndex,
  isCorrect: selectedIndex === correctIndex,
  timeTaken,
});


    return res.json({ success: true });
  } catch (error) {
    console.error("PHYSICS ATTEMPT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
