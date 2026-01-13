import bcrypt from "bcryptjs";

import CorporateMembership from "../models/CorporateMembership.js";
import StudentMembership from "../models/StudentMembership.js";
import TrainerMembership from "../models/TrainerMembership.js";
import IndividualMembership from "../models/IndividualMembership.js";
import AIArchitectureMembership from "../models/AIArchitectureMembership.js";
import { sendApprovalEmail, sendRejectionEmail } from "../utils/emailService.js";

// =====================================================================
// Helper: Standard error response
// =====================================================================
const sendError = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    message: message || "Something went wrong.",
  });
};

// =====================================================================
// Helper: Check if email exists in a SPECIFIC membership type
// =====================================================================
const findExistingMembershipByEmail = async (email, membershipType) => {
  const lookups = {
    corporate: { model: CorporateMembership, field: "contactPerson.email" },
    student: { model: StudentMembership, field: "studentInfo.email" },
    trainer: { model: TrainerMembership, field: "personalInfo.email" },
    individual: { model: IndividualMembership, field: "personalInfo.email" },
    architect: { model: AIArchitectureMembership, field: "personalDetails.email" },
  };

  const lookup = lookups[membershipType];
  if (!lookup) {
    return null;
  }

  const query = { [lookup.field]: email };
  const existing = await lookup.model.findOne(query);
  
  return existing;
};

// =====================================================================
// Helper: Handle DB errors (including duplicate key)
// =====================================================================
const handleDbError = (res, error) => {
  console.error("DB ERROR:", error);

  // Mongo duplicate key error (e.g., unique email)
  if (error?.code === 11000) {
    return sendError(res, 400, "An account with this email already exists.");
  }

  return sendError(res, 400, error.message);
};

// =====================================================================
// CORPORATE MEMBERSHIP
// =====================================================================
export const createCorporateMembership = async (req, res) => {
  try {
    const data = req.body;

    // Basic validations (backend should not trust only frontend)
    if (!data?.password) {
      return sendError(res, 400, "Password is required.");
    }
    if (data.password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters.");
    }
    if (!data?.contactPerson?.email) {
      return sendError(res, 400, "Contact person email is required.");
    }

    const email = data.contactPerson.email;

    // Check if email already exists for this specific membership type
    const existing = await findExistingMembershipByEmail(email, "corporate");
    if (existing) {
      return sendError(
        res,
        400,
        "You have already applied for corporate membership with this email."
      );
    }

    // Hash password before saving
    data.password = await bcrypt.hash(data.password, 10);

    const membership = await CorporateMembership.create(data);

    return res.status(201).json({
      success: true,
      message: "Corporate membership submitted successfully.",
      membership,
    });
  } catch (error) {
    return handleDbError(res, error);
  }
};

// =====================================================================
// STUDENT MEMBERSHIP
// =====================================================================
export const createStudentMembership = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.password) {
      return sendError(res, 400, "Password is required.");
    }
    if (data.password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters.");
    }
    if (!data?.studentInfo?.email) {
      return sendError(res, 400, "Student email is required.");
    }

    const email = data.studentInfo.email;

    const existing = await findExistingMembershipByEmail(email, "student");
    if (existing) {
      return sendError(
        res,
        400,
        "You have already applied for student membership with this email."
      );
    }

    // Hash password
    data.password = await bcrypt.hash(data.password, 10);

    const membership = await StudentMembership.create(data);

    return res.status(201).json({
      success: true,
      message: "Student membership submitted successfully.",
      membership,
    });
  } catch (error) {
    return handleDbError(res, error);
  }
};

// =====================================================================
// TRAINER MEMBERSHIP
// =====================================================================
export const createTrainerMembership = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.password) {
      return sendError(res, 400, "Password is required.");
    }
    if (data.password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters.");
    }
    if (!data?.personalInfo?.email) {
      return sendError(res, 400, "Trainer email is required.");
    }

    const email = data.personalInfo.email;

    const existing = await findExistingMembershipByEmail(email, "trainer");
    if (existing) {
      return sendError(
        res,
        400,
        "You have already applied for trainer membership with this email."
      );
    }

    // Hash password
    data.password = await bcrypt.hash(data.password, 10);

    const membership = await TrainerMembership.create(data);

    return res.status(201).json({
      success: true,
      message: "Trainer membership submitted successfully.",
      membership,
    });
  } catch (error) {
    return handleDbError(res, error);
  }
};

// =====================================================================
// INDIVIDUAL MEMBERSHIP
// =====================================================================
export const createIndividualMembership = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.password) {
      return sendError(res, 400, "Password is required.");
    }
    if (data.password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters.");
    }
    if (!data?.personalInfo?.email) {
      return sendError(res, 400, "Email is required.");
    }

    const email = data.personalInfo.email;

    const existing = await findExistingMembershipByEmail(email, "individual");
    if (existing) {
      return sendError(
        res,
        400,
        "You have already applied for individual membership with this email."
      );
    }

    // Hash password
    data.password = await bcrypt.hash(data.password, 10);

    const membership = await IndividualMembership.create(data);

    return res.status(201).json({
      success: true,
      message: "Individual membership submitted successfully.",
      membership,
    });
  } catch (error) {
    return handleDbError(res, error);
  }
};

// =====================================================================
// AI ARCHITECTURE BOARD MEMBERSHIP
// =====================================================================
export const createArchitectMembership = async (req, res) => {
  try {
    const data = req.body;

    if (!data?.password) {
      return sendError(res, 400, "Password is required.");
    }
    if (data.password.length < 6) {
      return sendError(res, 400, "Password must be at least 6 characters.");
    }
    if (!data?.personalDetails?.email) {
      return sendError(res, 400, "Email is required.");
    }

    const email = data.personalDetails.email;

    const existing = await findExistingMembershipByEmail(email, "architect");
    if (existing) {
      return sendError(
        res,
        400,
        "You have already applied for AI Architecture membership with this email."
      );
    }

    // Hash password
    data.password = await bcrypt.hash(data.password, 10);

    const membership = await AIArchitectureMembership.create(data);

    return res.status(201).json({
      success: true,
      message: "AI Architecture Board membership submitted successfully.",
      membership,
    });
  } catch (error) {
    return handleDbError(res, error);
  }
};

// =====================================================================
// ADMIN: GET ALL PENDING APPLICATIONS
// =====================================================================
export const getAllPendingApplications = async (req, res) => {
  try {
    const [corporate, student, trainer, individual, architect] =
      await Promise.all([
        CorporateMembership.find({ approvalStatus: "pending" }).sort({
          createdAt: -1,
        }),
        StudentMembership.find({ approvalStatus: "pending" }).sort({
          createdAt: -1,
        }),
        TrainerMembership.find({ approvalStatus: "pending" }).sort({
          createdAt: -1,
        }),
        IndividualMembership.find({ approvalStatus: "pending" }).sort({
          createdAt: -1,
        }),
        AIArchitectureMembership.find({ approvalStatus: "pending" }).sort({
          createdAt: -1,
        }),
      ]);

    return res.status(200).json({
      success: true,
      pendingApplications: {
        corporate,
        student,
        trainer,
        individual,
        architect,
      },
      totalPending:
        corporate.length +
        student.length +
        trainer.length +
        individual.length +
        architect.length,
    });
  } catch (error) {
    console.error("GET PENDING APPLICATIONS ERROR:", error);
    return sendError(res, 500, error.message);
  }
};

// =====================================================================
// ADMIN: GET ALL APPLICATIONS (ALL STATUSES)
// =====================================================================
export const getAllApplications = async (req, res) => {
  try {
    const [corporate, student, trainer, individual, architect] =
      await Promise.all([
        CorporateMembership.find().sort({ createdAt: -1 }),
        StudentMembership.find().sort({ createdAt: -1 }),
        TrainerMembership.find().sort({ createdAt: -1 }),
        IndividualMembership.find().sort({ createdAt: -1 }),
        AIArchitectureMembership.find().sort({ createdAt: -1 }),
      ]);

    return res.status(200).json({
      success: true,
      applications: {
        corporate,
        student,
        trainer,
        individual,
        architect,
      },
    });
  } catch (error) {
    console.error("GET ALL APPLICATIONS ERROR:", error);
    return sendError(res, 500, error.message);
  }
};

// =====================================================================
// ADMIN: APPROVE OR REJECT APPLICATION
// =====================================================================
export const updateApplicationStatus = async (req, res) => {
  try {
    const { membershipId, membershipType, action, rejectionReason } = req.body;

    // Basic validations
    if (!membershipId || !membershipType || !action) {
      return sendError(
        res,
        400,
        "membershipId, membershipType and action are required."
      );
    }

    // Validate action
    if (!["approve", "reject"].includes(action)) {
      return sendError(
        res,
        400,
        "Invalid action. Use 'approve' or 'reject'."
      );
    }

    if (action === "reject" && !rejectionReason) {
      return sendError(
        res,
        400,
        "Rejection reason is required when rejecting an application."
      );
    }

    // Determine the model based on membership type
    let Model;
    switch (membershipType) {
      case "corporate":
        Model = CorporateMembership;
        break;
      case "student":
        Model = StudentMembership;
        break;
      case "trainer":
        Model = TrainerMembership;
        break;
      case "individual":
        Model = IndividualMembership;
        break;
      case "architect":
        Model = AIArchitectureMembership;
        break;
      default:
        return sendError(res, 400, "Invalid membership type.");
    }

    // Find the membership application
    const membership = await Model.findById(membershipId);
    if (!membership) {
      return sendError(res, 404, "Application not found.");
    }

    // Update approval status
    const newStatus = action === "approve" ? "approved" : "rejected";
    membership.approvalStatus = newStatus;
    await membership.save();

    // Extract user email and name based on membership type
    let userEmail, userName;

    switch (membershipType) {
      case "corporate":
        userEmail = membership.contactPerson.email;
        userName = membership.contactPerson.fullName;
        break;
      case "student":
        userEmail = membership.studentInfo.email;
        userName = membership.studentInfo.fullName;
        break;
      case "trainer":
        userEmail = membership.personalInfo.email;
        userName = membership.personalInfo.fullName;
        break;
      case "individual":
        userEmail = membership.personalInfo.email;
        userName = membership.personalInfo.fullName;
        break;
      case "architect":
        userEmail = membership.personalDetails.email;
        userName = membership.personalDetails.fullName;
        break;
    }

    // Send email notification
    if (action === "approve") {
      await sendApprovalEmail(userEmail, userName, membershipType, {
        email: userEmail,
      });
    } else {
      await sendRejectionEmail(
        userEmail,
        userName,
        membershipType,
        rejectionReason
      );
    }

    return res.status(200).json({
      success: true,
      message: `Application ${newStatus} successfully.`,
      membership,
    });
  } catch (error) {
    console.error("UPDATE APPLICATION STATUS ERROR:", error);
    return sendError(res, 500, error.message);
  }
};
