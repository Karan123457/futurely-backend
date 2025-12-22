import User from "../models/User.js";
import ExamAttempt from "../models/ExamAttempt.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("name email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const attempts = await ExamAttempt.find({
      userId: req.userId,
      subject: "physics",
    });

    const attempted = attempts.length;
    const correct = attempts.filter(a => a.isCorrect).length;
    const wrong = attempted - correct;
    const accuracy = attempted ? Math.round((correct / attempted) * 100) : 0;

    const totalTime = attempts.reduce((s, a) => s + (a.timeTaken || 0), 0);
    const avgTime = attempted ? Math.round(totalTime / attempted) : 0;

    return res.json({
      user,
      physics: {
        attempted,
        correct,
        wrong,
        accuracy,
        avgTime,
      },
    });
  } catch (error) {
    console.error("DASHBOARD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
