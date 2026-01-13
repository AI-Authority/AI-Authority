import express from "express";

import {
  createCorporateMembership,
  createStudentMembership,
  createTrainerMembership,
  createIndividualMembership,
  createArchitectMembership,
  getAllPendingApplications,
  getAllApplications,
  updateApplicationStatus,
} from "../controllers/MembershipController.js";

import upload from "../middlewares/uploadMiddleware.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ===== MEMBERSHIP FORM SUBMISSION =====
router.post("/corporate", createCorporateMembership);
router.post("/student", createStudentMembership);
router.post("/trainer", createTrainerMembership);
router.post("/individual", createIndividualMembership);
router.post("/architect", createArchitectMembership);

// ===== ADMIN ROUTES FOR APPLICATION MANAGEMENT (Protected) =====
router.get("/admin/pending", authenticateToken, requireAdmin, getAllPendingApplications);
router.get("/admin/all", authenticateToken, requireAdmin, getAllApplications);
router.put("/admin/update-status", authenticateToken, requireAdmin, updateApplicationStatus);


// ===== FILE UPLOAD ROUTES =====

// CORPORATE
router.post("/upload/company-logo", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "corporate_logos");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/upload/corporate-deck", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "corporate_decks");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ARCHITECT
router.post("/upload/architect-resume", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "architect_resumes");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// TRAINER
router.post("/upload/trainer-resume", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "trainer_resumes");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/upload/trainer-deck", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "trainer_decks");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// STUDENT
router.post("/upload/student-resume", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "student_resumes");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/upload/student-id", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "student_ids");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// INDIVIDUAL
router.post("/upload/individual-cv", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.file.buffer, "individual_cvs");
    res.json({ success: true, url: result.secure_url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
