import express from "express";
import { registerUser, loginUser, getUserProfile, changePassword } from "../controllers/AuthController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ===== AUTH ROUTES ONLY =====
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile/:email", getUserProfile);
router.put("/change-password", authenticateToken, changePassword);

export default router;
