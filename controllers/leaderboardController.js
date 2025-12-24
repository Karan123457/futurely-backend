import PhysicsAttempt from "../models/PhysicsAttempt.js";

export const getPhysicsLeaderboard = async (req, res) => {
  try {
    const data = await PhysicsAttempt.aggregate([
      { $match: { isCorrect: true } },
      {
        $group: {
          _id: "$user",
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
          userId: "$user._id", // ✅ ADD THIS
          name: "$user.name",
          points: { $multiply: ["$correct", 4] },
        },
      },

      { $sort: { points: -1 } },
    ]);

    const leaderboard = data.map((u, i) => ({
      position: i + 1,
      userId: u.userId.toString(), // ✅ ADD
      name: u.name,
      points: u.points,
    }));


    res.json(leaderboard);
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
