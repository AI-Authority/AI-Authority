import mongoose from "mongoose";

const CourseEnrollmentSchema = new mongoose.Schema(
  {
    // user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "userModel"
    },
    userModel: {
      type: String,
      required: true,
      enum: [
        "User",
        "StudentMembership",
        "IndividualMembership",
        "CorporateMembership",
        "TrainerMembership",
        "AIArchitectureMembership"
      ]
    },

    // course
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerCourse",
      required: true
    },

    // payment
    paymentProvider: {
      type: String,
      enum: ["stripe", "razorpay", "paypal", "manual"],
      required: true
    },
    paymentId: {
      type: String,
      required: true
    },
    amountPaid: {
      type: Number,
      required: true
    },

    // status
    status: {
      type: String,
      enum: ["active", "refunded"],
      default: "active"
    }
  },
  { timestamps: true }
);

// prevent double enrollment
CourseEnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("CourseEnrollment", CourseEnrollmentSchema);
