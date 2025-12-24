import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import physicsRoutes from "./routes/physicsRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";


dotenv.config();
connectDB();

const app = express();

/* ✅ VERY IMPORTANT – handle preflight */
app.options("*", cors());

app.use(cors({
  origin: [
    "https://www.futurely.in",
    "https://futurely.in",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Futurely Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/physics", physicsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
