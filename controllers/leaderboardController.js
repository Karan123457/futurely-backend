import ExamAttempt from "../models/ExamAttempt.js";

/* ================= PHYSICS LEADERBOARD ================= */
export const getPhysicsLeaderboard = async (req, res) => {
  try {
    const data = await ExamAttempt.aggregate([
      { 
        $match: { 
          subject: "physics",
          isCorrect: true 
        } 
      },

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
          points: { $multiply: ["$correct", 4] },
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

    res.json(leaderboard);
  } catch (error) {
    console.error("PHYSICS LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= OVERALL LEADERBOARD ================= */
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
          points: { $multiply: ["$correct", 4] },
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

    const myRank = leaderboard.find(
      (u) => u.userId === req.userId.toString()
    );

    res.json({
      leaderboard,
      myRank: myRank || null,
    });
  } catch (error) {
    console.error("OVERALL LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};



