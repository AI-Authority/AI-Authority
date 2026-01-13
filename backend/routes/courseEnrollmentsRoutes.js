import express from "express";
import {
  getMyEnrolledCourses,
  createEnrollment,
  validateCourseAccess,
  getMyEnrolledCourseDetails
} from "../controllers/CourseEnrollmentController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/my-courses", authenticateToken, getMyEnrolledCourses);

router.get(
  "/my-courses/details",
  authenticateToken,
  getMyEnrolledCourseDetails
);

router.post("/enroll", authenticateToken, createEnrollment);

router.get(
  "/validate/:courseId",
  authenticateToken,
  validateCourseAccess
);

export default router;
