import ExamAttempt from "../models/ExamAttempt.js";

export const getOverallLeaderboard = async (req, res) => {
  try {
    const data = await ExamAttempt.aggregate([
      { $match: { isCorrect: true } },

      {
        $group: {
          _id: "$userId",
          correct: { $sum: 1 },
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },

      { $unwind: "$user" },

      {
        $project: {
          userId: "$user._id",
          name: "$user.name",
          points: { $multiply: ["$correct", 4] }, // 4 pts per correct
        },
      },

      { $sort: { points: -1 } },
    ]);

    const leaderboard = data.map((u, i) => ({
      position: i + 1,
      userId: u.userId.toString(),
      name: u.name,
      points: u.points,
    }));

    res.json(leaderboard); // ✅ ARRAY ONLY
  } catch (error) {
    console.error("OVERALL LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
