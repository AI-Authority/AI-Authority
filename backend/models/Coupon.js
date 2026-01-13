import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    // Membership restrictions
    allowedMemberships: {
      type: [String],
      enum: [
        "student_membership",
        "individual_membership",
        "corporate_membership",
        "trainer_membership",
        "ai_architecture_membership",
        "all", // Available to all memberships
      ],
      default: ["all"],
    },
    // Usage limits
    maxUses: {
      type: Number,
      default: null, // null means unlimited
    },
    currentUses: {
      type: Number,
      default: 0,
    },
    maxUsesPerUser: {
      type: Number,
      default: 1,
    },
    // Validity period
    validFrom: {
      type: Date,
      default: Date.now,
    },
    validUntil: {
      type: Date,
      default: null, // null means no expiry
    },
    // Status
    isActive: {
      type: Boolean,
      default: true,
    },
    // Stripe Coupon ID (if synced with Stripe)
    stripeCouponId: {
      type: String,
      default: null,
    },
    // Created by
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Index for fast lookups
CouponSchema.index({ code: 1 });
CouponSchema.index({ isActive: 1 });

export default mongoose.model("Coupon", CouponSchema);
