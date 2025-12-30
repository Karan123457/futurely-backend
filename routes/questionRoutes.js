import express from "express";
import {
  getQuestions,
  addQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

// fetch questions
router.get("/", getQuestions);

// add question (later protect with admin middleware)
router.post("/", addQuestion);

export default router;
