import mongoose from "mongoose";

const AIArchitectureMembershipSchema = new mongoose.Schema(
  {
    // Login password (hashed)
    password: { type: String, required: true },

    // Identify membership type (optional but useful)
    type: { type: String, default: "architect" },

    // ===== SECTION A: Personal & Professional Details =====
    personalDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
      country: { type: String, required: true },
      currentPosition: { type: String, required: true },
      organizationName: { type: String, required: true },
      linkedinURL: { type: String, required: true },
      personalWebsite: { type: String, default: "" } // optional
    },

    // ===== SECTION B: Expertise & Background =====
    expertise: {
      yearsExperience: { type: Number, required: true },

      specializations: [
        {
          type: String,
          enum: [
            "AI Strategy",
            "AI Ethics",
            "Data Governance",
            "Machine Learning",
            "Enterprise AI",
            "Research",
            "Innovation Leadership",
            "Education & Training"
          ]
        }
      ],

      shortBio: { type: String, required: true }
    },

    // ===== SECTION C: Board Contribution Statement =====
    contribution: {
      whyJoin: { type: String, required: true },

      contributionTypes: [
        {
          type: String,
          enum: [
            "Governance",
            "Research guidance",
            "Education",
            "Corporate partnerships",
            "Ethics & policy",
            "Community leadership"
          ]
        }
      ],

      contributionText: { type: String, required: true },

      suggestedInitiative: { type: String, default: "" } // optional
    },

    // ===== SECTION D: References =====
    references: [
      {
        name: { type: String },
        email: { type: String },
        relationship: { type: String }
      }
    ],

    // ===== SECTION E: Terms & Declaration =====
    terms: {
      understandsSelective: { type: Boolean, required: true },
      agreesToResponsibilities: { type: Boolean, required: true }
    },

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
  "AIArchitectureMembership",
  AIArchitectureMembershipSchema
);
