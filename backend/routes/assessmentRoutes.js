import express from "express";
import {
  getAssessment,
  submitAssessment,
  getUserResults,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  getAssessmentWithAnswers,
} from "../controllers/AssessmentController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================
// LEARNER ROUTES (Protected by JWT)
// ======================

// Get assessment without correct answers
router.get("/:assessmentId", authenticateToken, getAssessment);

// Submit assessment and get results
router.post("/submit", authenticateToken, submitAssessment);

// Get user's attempt history for a lesson
router.get("/results/:courseId/:lessonId", authenticateToken, getUserResults);

// ======================
// TRAINER ROUTES (Protected by JWT + Trainer Ownership Check)
// ======================

// Get assessment WITH correct answers (trainer only)
router.get("/trainer/:assessmentId", authenticateToken, getAssessmentWithAnswers);

// Create new assessment (trainer only)
router.post("/trainer/create", authenticateToken, createAssessment);

// Update existing assessment (trainer only)
router.put("/trainer/:assessmentId", authenticateToken, updateAssessment);

// Delete/disable assessment (trainer only)
router.delete("/trainer/:assessmentId", authenticateToken, deleteAssessment);

export default router;
