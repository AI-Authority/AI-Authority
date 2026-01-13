import mongoose from "mongoose";

const TrainerMembershipSchema = new mongoose.Schema(
  {
    // Login password (must be hashed before saving)
    password: { type: String, required: true },

    // Membership category (helps in filtering)
    type: { type: String, default: "trainer" },

    // ===== SECTION A: Personal & Contact Information =====
    personalInfo: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
      country: { type: String, required: true },
      linkedinURL: { type: String, required: true },
      portfolioURL: { type: String, default: "" }
    },

    // ===== SECTION B: Trainer Profile =====
    trainerProfile: {
      expertiseAreas: [
        {
          type: String,
          enum: [
            "AI Fundamentals",
            "Machine Learning",
            "Generative AI",
            "Data Science",
            "Prompt Engineering",
            "AI Tools",
            "Corporate AI Training"
          ]
        }
      ],

      yearsExperience: { type: Number, required: true },

      resumeURL: { type: String, required: true },
      sampleDeckURL: { type: String, default: "" },

      previousClients: [
        {
          companyName: { type: String },
          companyAddress: { type: String },
          phone: { type: String },
          email: { type: String }
        }
      ]
    },
    // ===== SECTION C: Training Details =====
    trainingDetails: {
      typesOffered: [
        {
          type: String,
          enum: [
            "Workshops",
            "Webinars",
            "Bootcamps",
            "Corporate Training",
            "Certification courses"
          ]
        }
      ],

      pricingRange: { type: String, default: "" },
      availability: { type: String, required: true }
    },

    // ===== SECTION D: Collaboration Preferences =====
    collaborationPrefs: {
      coHosting: { type: Boolean, default: false },
      trainerCertification: { type: Boolean, default: false },
      contentPartnership: { type: Boolean, default: false },
      authorityEvents: { type: Boolean, default: false },

      trainerPitch: { type: String, required: true }
    },

    // ===== SECTION E: Terms & Confirmation =====
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

export default mongoose.model("TrainerMembership", TrainerMembershipSchema);
