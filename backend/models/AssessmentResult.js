import mongoose from "mongoose";

const AssessmentResultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "userModel",
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
        "AIArchitectureMembership",
      ],
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerCourse",
      required: true,
    },
    lessonId: {
      type: String,
      required: true,
    },
    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    attemptNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    answers: [
      {
        questionId: {
          type: String,
          required: true,
        },
        selectedOption: {
          type: Number,
          required: true,
        },
      },
    ],
    score: {
      type: Number,
      required: true,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1,
    },
    attemptedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Indexes for efficient queries
AssessmentResultSchema.index({ userId: 1, courseId: 1, lessonId: 1 });
AssessmentResultSchema.index({ assessmentId: 1 });
AssessmentResultSchema.index({ attemptedAt: -1 });

export default mongoose.model("AssessmentResult", AssessmentResultSchema);
