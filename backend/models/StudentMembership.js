import mongoose from "mongoose";

const StudentMembershipSchema = new mongoose.Schema(
  {
    // Login password (stored as hashed in backend)
    password: { type: String, required: true },

    // Identify membership category
    type: { type: String, default: "student" },

    // ===== SECTION A: Student Information =====
    studentInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
      location: { type: String, required: true },
      age: { type: Number, required: true },
      studentId: { type: String, default: "" }
    },

    // ===== SECTION B: Academic Details =====
    academicDetails: {
      institution: { type: String, required: true },
      course: { type: String, required: true },
      fieldOfStudy: { type: String, required: true },
      currentYearOrSemester: { type: String, required: true },
      graduationYear: { type: Number, required: true }
    },

    // ===== SECTION C: AI Aspirations =====
    aspirations: {
      interestInAI: { type: String, required: true },

      skillsToBuild: [
        {
          type: String,
          enum: [
            "AI basics",
            "ML",
            "Python",
            "GenAI",
            "Data analytics",
            "AI tools"
          ]
        }
      ],

      lookingFor: [
        {
          type: String,
          enum: ["Internships", "Mentorship", "Training", "Projects"]
        }
      ]
    },

    // ===== SECTION D: Uploads =====
    uploads: {
      resumeURL: { type: String, default: "" },
      studentIdURL: { type: String, default: "" }
    },

    // ===== SECTION E: Terms =====
    termsAccepted: { type: Boolean, required: true },

    // ===== Approval Status =====
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("StudentMembership", StudentMembershipSchema);
