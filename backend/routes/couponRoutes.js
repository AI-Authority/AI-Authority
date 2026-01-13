import express from "express";
import {
  createCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
  getCouponStats,
  validateCoupon,
  recordCouponUsage,
} from "../controllers/couponController.js";
import { authenticateToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ======================
// ADMIN ROUTES
// ======================

// Create coupon (admin only)
router.post("/create", authenticateToken, requireAdmin, createCoupon);

// Get all coupons (admin only)
router.get("/", authenticateToken, requireAdmin, getAllCoupons);

// Update coupon (admin only)
router.put("/:id", authenticateToken, requireAdmin, updateCoupon);

// Delete coupon (admin only)
router.delete("/:id", authenticateToken, requireAdmin, deleteCoupon);

// Get coupon stats (admin only)
router.get("/:id/stats", authenticateToken, requireAdmin, getCouponStats);

// ======================
// PUBLIC ROUTES
// ======================

// Validate coupon (no auth required - public access)
router.post("/validate", validateCoupon);

// Record coupon usage (requires auth - called by payment system after user logs in)
router.post("/use", authenticateToken, recordCouponUsage);

export default router;
