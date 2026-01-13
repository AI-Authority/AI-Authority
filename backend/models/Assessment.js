import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length >= 2 && arr.length <= 6;
      },
      message: "Options must have between 2 and 6 choices",
    },
  },
  correctAnswer: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value >= 0 && value < this.options.length;
      },
      message: "Correct answer must be a valid option index",
    },
  },
  explanation: {
    type: String,
    trim: true,
    default: "",
  },
});

const AssessmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerCourse",
      required: true,
    },
    lessonId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "Assessment must have at least one question",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
AssessmentSchema.index({ courseId: 1, lessonId: 1 });
AssessmentSchema.index({ isActive: 1 });

export default mongoose.model("Assessment", AssessmentSchema);
