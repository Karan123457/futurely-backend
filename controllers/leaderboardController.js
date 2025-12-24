import PhysicsAttempt from "../models/PhysicsAttempt.js";
import User from "../models/User.js";

export const getPhysicsLeaderboard = async (req, res) => {
  try {
    const data = await PhysicsAttempt.aggregate([
      {
        $match: { isCorrect: true }
      },
      {
        $group: {
          _id: "$user",
          correctCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          points: { $multiply: ["$correctCount", 4] }
        }
      },
      { $sort: { points: -1 } }
    ]);

    // Add position
    const leaderboard = data.map((u, i) => ({
      position: i + 1,
      name: u.name,
      points: u.points
    }));

    return res.json(leaderboard);
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
