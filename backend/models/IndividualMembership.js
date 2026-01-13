import mongoose from "mongoose";

const IndividualMembershipSchema = new mongoose.Schema(
  {
    // Login password (must be hashed in controller)
    password: { type: String, required: true },

    // Helps identify membership type in database
    type: { type: String, default: "individual" },

    // ===== SECTION A: Personal Information =====
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
      location: { type: String, required: true },
      linkedinURL: { type: String, required: true }
    },

    // ===== SECTION B: Professional Background =====
    professionalBackground: {
      currentRole: { type: String, required: true },
      industry: { type: String, required: true },
      yearsExperience: { type: Number, required: true },

      areasOfInterest: [
        {
          type: String,
          enum: [
            "AI learning",
            "Research",
            "Career growth",
            "Freelance work",
            "Community participation",
            "Events & networking"
          ]
        }
      ]
    },

    // ===== SECTION C: Membership Goals =====
    membershipGoals: {
      expectations: { type: String, required: true },

      speakingOpportunities: { type: Boolean, default: false },
      writingContributions: { type: Boolean, default: false },
      communityGroups: { type: Boolean, default: false },
      mentorship: { type: Boolean, default: false }
    },

    // ===== SECTION D: Optional Upload =====
    uploads: {
      cvURL: { type: String, default: "" }
    },

    // ===== SECTION E: Declaration =====
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

export default mongoose.model(
  "IndividualMembership",
  IndividualMembershipSchema
);
