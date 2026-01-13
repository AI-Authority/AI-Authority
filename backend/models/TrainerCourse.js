import mongoose from "mongoose";


const LessonSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  videoURL: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
    min: 1,
  },
  assessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assessment",
    default: null,
    required: false,
  },

});

const ModuleSchema = new mongoose.Schema({
  moduleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  order: {
    type: Number,
    required: true,
    min: 1,
  },
  lessons: {
    type: [LessonSchema],
    default: [],
  },
});

const TrainerCourseSchema = new mongoose.Schema(
  {
    trainerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TrainerMembership",
      required: true,
    },

    courseName: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    trainerName: {
      type: String,
      required: true,
      trim: true,
    },

    organisationName: {
      type: String,
      required: true,
      trim: true,
    },

    mode: {
      type: String,
      enum: ["Recorded", "Onsite", "Live Class"],
      required: true,
    },

    courseType: {
      type: String,
      enum: [
        "Enterprise AI Architecture",
        "AI Strategy",
        "AI Solution Architecture",
        "AI Security",
        "AI Operations",
        "AI Integration",
        "AI Governance",
        "AI Executive",
        "AI Developer Foundation",
        "AI Developer Advanced",
        "AI Computing",
      ],
      required: true,
    },

    courseURL: {
      type: String,
      required: false,
      trim: true,
    },


    // Modules array - each module contains lessons
    modules: {
      type: [ModuleSchema],
      default: [],
    },

    // ⭐ NEW FIELD ADDED
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000, // optional
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    isResubmitted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TrainerCourse", TrainerCourseSchema);
