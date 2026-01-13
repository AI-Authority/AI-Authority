import mongoose from "mongoose";

const CouponUsageSchema = new mongoose.Schema(
  {
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userModel: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerCourse",
      required: true,
    },
    discountAmount: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for queries
CouponUsageSchema.index({ couponId: 1 });
CouponUsageSchema.index({ userId: 1 });
CouponUsageSchema.index({ courseId: 1 });

export default mongoose.model("CouponUsage", CouponUsageSchema);
