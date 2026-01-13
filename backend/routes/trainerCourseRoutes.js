import express from "express";
import {
  uploadTrainerCourse,
  getPendingCourses,
  approveCourse,
  rejectCourse,
  getAllCoursesAdmin,
  getApprovedCourses,
  getTrainerCourses,
  updateTrainerCourse,
  deleteCourse,
} from "../controllers/trainerCourseController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Trainer: Upload a Course
router.post("/trainer/course/upload", authenticateToken, uploadTrainerCourse);

// Admin: Fetch pending courses
router.get("/admin/courses/pending", authenticateToken, requireAdmin, getPendingCourses);

// Admin: Approve course
router.patch("/admin/course/approve/:id", authenticateToken, requireAdmin, approveCourse);

router.patch("/admin/course/reject/:id", authenticateToken, requireAdmin, rejectCourse);

router.delete("/admin/course/delete/:id", authenticateToken, requireAdmin, deleteCourse);

router.get("/courses/approved", getApprovedCourses);

// Trainer Dashboard: Get trainer's own courses
router.get("/trainer/courses/:trainerId", authenticateToken, getTrainerCourses);

router.put("/trainer/course/update/:id", authenticateToken, updateTrainerCourse);

router.delete("/trainer/course/delete/:id", authenticateToken, deleteCourse);

router.get("/admin/courses", authenticateToken, requireAdmin, getAllCoursesAdmin);


export default router;
