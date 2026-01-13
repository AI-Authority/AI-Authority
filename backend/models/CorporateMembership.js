import mongoose from "mongoose";

const CorporateMembershipSchema = new mongoose.Schema(
  {
    // Login password (hashed before saving)
    password: { type: String, required: true },

    // Identify membership type if needed for filtering
    type: { type: String, default: "corporate" },

    // ===== Section A: Company Information =====
    companyName: { type: String, required: true },
    websiteURL: { type: String, required: true },
    industry: { type: String, required: true },
    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "200-1000", "1000+"],
      required: true
    },
    headquartersLocation: { type: String, required: true },
    additionalOffices: { type: String, default: "" },

    // ===== Section B: Primary Contact Person =====
    contactPerson: {
      fullName: { type: String, required: true },
      jobTitle: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true },
      linkedin: { type: String, default: "" }
    },

    // ===== Section C: Membership Objectives =====
    objectives: {
      aiGoals12Months: { type: String, required: true },

      collaborationTypes: [
        {
          type: String,
          enum: [
            "Networking",
            "Talent acquisition",
            "AI training",
            "Partnerships",
            "Thought leadership",
            "Research & insights"
          ]
        }
      ],

      speakingOpportunity: {
        type: String,
        enum: ["Yes", "No"],
        required: true
      }
    },

    // ===== Section D: Uploads =====
    uploads: {
      companyLogoURL: { type: String, required: true },
      pitchDeckURL: { type: String, default: "" }
    },

    // ===== Section E: Terms =====
    termsAccepted: { type: Boolean, required: true },
    policiesAccepted: { type: Boolean, required: true },

    // ===== Section F: Referral Source =====
    referralSource: {
      type: String,
      enum: [
        "LinkedIn",
        "Referral from client/partner",
        "Industry event/conference",
        "AI Authority website",
        "Online search",
        "Social media",
        "News/media coverage",
        "Other"
      ],
      default: "Other"
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

export default mongoose.model("CorporateMembership", CorporateMembershipSchema);
