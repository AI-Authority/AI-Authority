import Coupon from "../models/Coupon.js";
import CouponUsage from "../models/CouponUsage.js";
import TrainerCourse from "../models/TrainerCourse.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======================
// HELPER FUNCTIONS
// ======================

/**
 * Create or get Stripe coupon
 * This syncs our coupon with Stripe's system
 */
const createStripeCoupon = async (couponData) => {
  try {
    const { code, discountType, discountValue } = couponData;

    // Check if Stripe coupon already exists
    try {
      const existingCoupon = await stripe.coupons.retrieve(code.toUpperCase());
      console.log(`✅ Stripe coupon ${code} already exists`);
      return existingCoupon.id;
    } catch (error) {
      // Coupon doesn't exist, create it
      if (error.code === 'resource_missing') {
        const stripeCouponConfig = {
          id: code.toUpperCase(), // Use our code as Stripe coupon ID
          name: code.toUpperCase(), // Use code as name
        };

        // Set discount amount or percentage
        if (discountType === "percentage") {
          stripeCouponConfig.percent_off = discountValue;
        } else {
          stripeCouponConfig.amount_off = Math.round(discountValue * 100); // Convert to cents
          stripeCouponConfig.currency = "usd";
        }

        const stripeCoupon = await stripe.coupons.create(stripeCouponConfig);
        console.log(`✅ Created Stripe coupon: ${stripeCoupon.id}`);
        return stripeCoupon.id;
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating Stripe coupon:", error);
    return null; // Return null if Stripe sync fails, coupon will still work in our system
  }
};

// ======================
// ADMIN ROUTES
// ======================

/**
 * CREATE COUPON
 * POST /api/coupons/create
 * Admin only
 */
export const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      allowedMemberships,
      maxUses,
      maxUsesPerUser,
      validFrom,
      validUntil,
      syncWithStripe,
    } = req.body;

    const adminId = req.user._id;

    // Validate required fields
    if (!code || !discountType || discountValue === undefined) {
      return res.status(400).json({
        success: false,
        message: "Code, discount type, and value are required",
      });
    }

    // Validate code format (alphanumeric, no spaces)
    if (!/^[A-Z0-9]+$/.test(code.toUpperCase())) {
      return res.status(400).json({
        success: false,
        message: "Coupon code must be alphanumeric (no spaces or special characters)",
      });
    }

    // Validate discount type
    if (!["percentage", "fixed"].includes(discountType)) {
      return res.status(400).json({
        success: false,
        message: "Discount type must be 'percentage' or 'fixed'",
      });
    }

    // Validate discount value
    if (typeof discountValue !== "number" || discountValue <= 0) {
      return res.status(400).json({
        success: false,
        message: "Discount value must be a positive number",
      });
    }

    if (discountType === "percentage" && (discountValue < 0 || discountValue > 100)) {
      return res.status(400).json({
        success: false,
        message: "Percentage discount must be between 0 and 100",
      });
    }

    // Check if code already exists
    const existing = await Coupon.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Coupon code already exists",
      });
    }

    // Optionally create Stripe coupon
    let stripeCouponId = null;
    if (syncWithStripe) {
      stripeCouponId = await createStripeCoupon({
        code,
        discountType,
        discountValue,
      });
    }

    // Create coupon in our database
    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      allowedMemberships: allowedMemberships || ["all"],
      maxUses: maxUses || null,
      maxUsesPerUser: maxUsesPerUser || 1,
      validFrom: validFrom || Date.now(),
      validUntil: validUntil || null,
      stripeCouponId,
      createdBy: adminId,
    });

    res.status(201).json({
      success: true,
      message: stripeCouponId 
        ? "Coupon created and synced with Stripe" 
        : "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    console.error("Create coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * GET ALL COUPONS
 * GET /api/coupons
 * Admin only
 */
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    console.error("Get coupons error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * UPDATE COUPON
 * PUT /api/coupons/:id
 * Admin only
 */
export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Don't allow changing code or createdBy
    delete updates.code;
    delete updates.createdBy;
    delete updates.currentUses;

    const coupon = await Coupon.findByIdAndUpdate(id, updates, { new: true });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.json({
      success: true,
      message: "Coupon updated successfully",
      data: coupon,
    });
  } catch (error) {
    console.error("Update coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * DELETE COUPON
 * DELETE /api/coupons/:id
 * Admin only
 */
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.error("Delete coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET COUPON USAGE STATS
 * GET /api/coupons/:id/stats
 * Admin only
 */
export const getCouponStats = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    const usages = await CouponUsage.find({ couponId: id })
      .populate("courseId", "courseName")
      .sort({ createdAt: -1 });

    const totalDiscount = usages.reduce((sum, usage) => sum + usage.discountAmount, 0);

    res.json({
      success: true,
      data: {
        coupon,
        totalUses: usages.length,
        totalDiscountGiven: totalDiscount,
        recentUsages: usages.slice(0, 10),
      },
    });
  } catch (error) {
    console.error("Get coupon stats error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ======================
// USER ROUTES
// ======================

/**
 * VALIDATE COUPON
 * POST /api/coupons/validate
 * User authenticated
 */
export const validateCoupon = async (req, res) => {
  try {
    const { code, courseId } = req.body;
    // Optional: Get user info if logged in (for user-specific checks)
    const userId = req.user?._id;
    const userType = req.user?.type;

    if (!code || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Coupon code and course ID are required",
      });
    }

    // Find coupon
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    // Check if active
    if (!coupon.isActive) {
      return res.status(400).json({
        success: false,
        message: "This coupon is no longer active",
      });
    }

    // Check validity dates
    const now = new Date();
    if (coupon.validFrom && new Date(coupon.validFrom) > now) {
      return res.status(400).json({
        success: false,
        message: "This coupon is not yet valid",
      });
    }

    if (coupon.validUntil && new Date(coupon.validUntil) < now) {
      return res.status(400).json({
        success: false,
        message: "This coupon has expired",
      });
    }

    // Check membership eligibility (only if user is logged in)
    if (userType && !coupon.allowedMemberships.includes("all")) {
      if (!coupon.allowedMemberships.includes(userType)) {
        return res.status(403).json({
          success: false,
          message: "This coupon is not available for your membership type",
        });
      }
    }

    // Check max uses
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return res.status(400).json({
        success: false,
        message: "This coupon has reached its usage limit",
      });
    }

    // Check user usage limit (only if user is logged in)
    if (userId) {
      const userUsageCount = await CouponUsage.countDocuments({
        couponId: coupon._id,
        userId: userId,
      });

      if (userUsageCount >= coupon.maxUsesPerUser) {
        return res.status(400).json({
          success: false,
          message: `You have already used this coupon ${coupon.maxUsesPerUser} time(s)`,
        });
      }
    }

    // Get course price
    const course = await TrainerCourse.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = (course.price * coupon.discountValue) / 100;
    } else {
      discountAmount = Math.min(coupon.discountValue, course.price);
    }

    const finalPrice = Math.max(course.price - discountAmount, 0);

    res.json({
      success: true,
      message: "Coupon is valid",
      data: {
        couponId: coupon._id,
        code: coupon.code,
        description: coupon.description,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        originalPrice: course.price,
        discountAmount: discountAmount,
        finalPrice: finalPrice,
      },
    });
  } catch (error) {
    console.error("Validate coupon error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * RECORD COUPON USAGE
 * POST /api/coupons/use
 * Called internally after successful payment
 */
// Helper function to record coupon usage (for internal use, e.g., webhooks)
export const recordCouponUsageHelper = async (usageData) => {
  const {
    couponId,
    userId,
    userModel,
    courseId,
    discountAmount,
    originalPrice,
    finalPrice,
    paymentIntentId,
  } = usageData;

  // Record usage
  await CouponUsage.create({
    couponId,
    userId,
    userModel,
    courseId,
    discountAmount,
    originalPrice,
    finalPrice,
    paymentIntentId,
  });

  // Increment coupon usage count
  await Coupon.findByIdAndUpdate(couponId, {
    $inc: { currentUses: 1 },
  });

  return true;
};

// Route handler for recording coupon usage
export const recordCouponUsage = async (req, res) => {
  try {
    await recordCouponUsageHelper(req.body);

    res.json({
      success: true,
      message: "Coupon usage recorded",
    });
  } catch (error) {
    console.error("Record coupon usage error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
