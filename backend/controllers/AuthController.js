import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import CorporateMembership from "../models/CorporateMembership.js";
import StudentMembership from "../models/StudentMembership.js";
import TrainerMembership from "../models/TrainerMembership.js";
import IndividualMembership from "../models/IndividualMembership.js";
import AIArchitectureMembership from "../models/AIArchitectureMembership.js";
import { sendEmail } from "../utils/emailService.js";

// REGISTER USER
export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check for existing user (email or phone)
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing)
      return res.status(400).json({ message: "User with this email or phone already exists" });

    // Create new user
    const user = await User.create({ name, email, phone, password });

    // Send welcome email
    try {
      const welcomeEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 20px; background-color: white; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; padding-top: 20px; color: #666; font-size: 12px; }
            .btn { display: inline-block; padding: 12px 24px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to AI Authority!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Welcome to AI Authority! Your account has been successfully created.</p>
              <p><strong>Account Details:</strong></p>
              <ul>
                <li><strong>Name:</strong> ${name}</li>
                <li><strong>Email:</strong> ${email}</li>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Registration Date:</strong> ${new Date().toLocaleString()}</li>
              </ul>
              <p>You can now:</p>
              <ul>
                <li>✅ Access our AI frameworks and standards</li>
                <li>✅ Apply for various memberships</li>
                <li>✅ Enroll in courses and training programs</li>
                <li>✅ Connect with accredited trainers</li>
              </ul>
              <p>Thank you for joining our community of AI professionals!</p>
              <p>Best regards,<br><strong>The AI Authority Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 AI Authority. All rights reserved.</p>
              <p>Need help? Contact us at info@ai-authority.ai</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await sendEmail(email, "🎉 Welcome to AI Authority - Registration Successful!", welcomeEmailContent);
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
      // Don't block registration if email fails
    }

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN USER
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User not found" });

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });

//     // Generate JWT
//     const token = jwt.sign(
//       { 
//         id: user._id,
//         isAdmin: user.isAdmin 
//       }, 
//       "mySuperSecretKey123", 
//       { expiresIn: "1h" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         isAdmin: user.isAdmin
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // All schemas to check with their email field paths
    const schemas = [
      { model: User, type: "user", emailField: "email" },
      { model: TrainerMembership, type: "trainer_membership", emailField: "personalInfo.email" },
      { model: AIArchitectureMembership, type: "ai_architecture_membership", emailField: "personalDetails.email" },
      { model: CorporateMembership, type: "corporate_membership", emailField: "contactPerson.email" },
      { model: IndividualMembership, type: "individual_membership", emailField: "personalInfo.email" },
      { model: StudentMembership, type: "student_membership", emailField: "studentInfo.email" }
    ];

    let foundUser = null;
    let userType = null;
    let userEmail = email;

    // Iterate through each schema and find a match
    for (const schema of schemas) {
      const query = {};
      query[schema.emailField] = email;
      const record = await schema.model.findOne(query);
      if (record) {
        foundUser = record;
        userType = schema.type;
        break;
      }
    }

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check approval status for membership applications (not for regular users)
    if (userType !== "user" && foundUser.approvalStatus) {
      if (foundUser.approvalStatus === "pending") {
        return res.status(403).json({
          message: "Your membership application is pending approval. You will receive an email once it's approved."
        });
      }

      if (foundUser.approvalStatus === "rejected") {
        return res.status(403).json({
          message: "Your membership application was not approved. Please contact support for more information."
        });
      }
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Map login userType to exact mongoose model name (for enrollment)
    const userModelMap = {
      user: "User",
      student_membership: "StudentMembership",
      trainer_membership: "TrainerMembership",
      corporate_membership: "CorporateMembership",
      individual_membership: "IndividualMembership",
      ai_architecture_membership: "AIArchitectureMembership"
    };

    // Create JWT payload (EXTENDED, backward compatible)
    const token = jwt.sign(
      {
        // existing fields (frontend depends on these)
        id: foundUser._id,
        type: userType,

        // NEW fields (used by enrollment system)
        _id: foundUser._id,
        userModel: userModelMap[userType],

        // admin flag
        isAdmin: foundUser.isAdmin || false
      },
      "mySuperSecretKey123", // move to ENV in production
      { expiresIn: "1h" }
    );


    // Extract email, name, and phone based on membership type
    let userName, userPhone;

    switch (userType) {
      case "user":
        userName = foundUser.name;
        userEmail = foundUser.email;
        userPhone = foundUser.phone;
        break;
      case "corporate_membership":
        userName = foundUser.contactPerson?.fullName || foundUser.companyName;
        userEmail = foundUser.contactPerson?.email;
        userPhone = foundUser.contactPerson?.phone;
        break;
      case "student_membership":
        userName = foundUser.studentInfo?.fullName;
        userEmail = foundUser.studentInfo?.email;
        userPhone = foundUser.studentInfo?.phone;
        break;
      case "trainer_membership":
        userName = foundUser.personalInfo?.fullName;
        userEmail = foundUser.personalInfo?.email;
        userPhone = foundUser.personalInfo?.phone;
        break;
      case "individual_membership":
        userName = foundUser.personalInfo?.fullName;
        userEmail = foundUser.personalInfo?.email;
        userPhone = foundUser.personalInfo?.phone;
        break;
      case "ai_architecture_membership":
        userName = foundUser.personalDetails?.fullName;
        userEmail = foundUser.personalDetails?.email;
        userPhone = foundUser.personalDetails?.phone;
        break;
      default:
        userName = "";
        userPhone = "";
    }

    // Response
    res.json({
      message: "Login successful",
      token,
      user: {
        id: foundUser._id,
        name: userName || "",
        email: userEmail,
        phone: userPhone || "",
        type: userType,
        isAdmin: foundUser.isAdmin || false
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET USER PROFILE WITH MEMBERSHIPS
export const getUserProfile = async (req, res) => {
  const { email } = req.params;

  try {
    // Search for memberships across all collections
    const [corporate, student, trainer, individual, architect] = await Promise.all([
      CorporateMembership.find({ "contactPerson.email": email }),
      StudentMembership.find({ "studentInfo.email": email }),
      TrainerMembership.find({ "personalInfo.email": email }),
      IndividualMembership.find({ "personalInfo.email": email }),
      AIArchitectureMembership.find({ "personalDetails.email": email })
    ]);

    // Try to find user in User collection
    let user = await User.findOne({ email }).select("-password");

    // If no user in User collection, try to build user info from membership records
    if (!user) {
      let membershipUser = null;
      let userType = null;

      // Check each membership type
      if (corporate.length > 0) {
        membershipUser = corporate[0];
        userType = "corporate";
      } else if (student.length > 0) {
        membershipUser = student[0];
        userType = "student";
      } else if (trainer.length > 0) {
        membershipUser = trainer[0];
        userType = "trainer";
      } else if (individual.length > 0) {
        membershipUser = individual[0];
        userType = "individual";
      } else if (architect.length > 0) {
        membershipUser = architect[0];
        userType = "architect";
      }

      // If we found a membership, construct user object from it
      if (membershipUser) {
        let userName, userEmail, userPhone;

        switch (userType) {
          case "corporate":
            userName = membershipUser.contactPerson?.fullName || membershipUser.companyName;
            userEmail = membershipUser.contactPerson?.email;
            userPhone = membershipUser.contactPerson?.phone;
            break;
          case "student":
            userName = membershipUser.studentInfo?.fullName;
            userEmail = membershipUser.studentInfo?.email;
            userPhone = membershipUser.studentInfo?.phone;
            break;
          case "trainer":
            userName = membershipUser.personalInfo?.fullName;
            userEmail = membershipUser.personalInfo?.email;
            userPhone = membershipUser.personalInfo?.phone;
            break;
          case "individual":
            userName = membershipUser.personalInfo?.fullName;
            userEmail = membershipUser.personalInfo?.email;
            userPhone = membershipUser.personalInfo?.phone;
            break;
          case "architect":
            userName = membershipUser.personalDetails?.fullName;
            userEmail = membershipUser.personalDetails?.email;
            userPhone = membershipUser.personalDetails?.phone;
            break;
        }

        user = {
          id: membershipUser._id,
          name: userName,
          email: userEmail,
          phone: userPhone,
          isAdmin: membershipUser.isAdmin || false,
          createdAt: membershipUser.createdAt
        };
      } else {
        // No user found in any collection
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      // Convert mongoose document to plain object
      user = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      };
    }

    res.json({
      user,
      memberships: {
        corporate,
        student,
        trainer,
        individual,
        architect
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Get user ID from JWT token
    const userId = req.user?.id;
    const userType = req.user?.type;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    // Find user based on type
    let user;
    const schemas = [
      { model: User, type: "user" },
      { model: TrainerMembership, type: "trainer_membership" },
      { model: AIArchitectureMembership, type: "ai_architecture_membership" },
      { model: CorporateMembership, type: "corporate_membership" },
      { model: IndividualMembership, type: "individual_membership" },
      { model: StudentMembership, type: "student_membership" }
    ];

    for (const schema of schemas) {
      if (schema.type === userType) {
        user = await schema.model.findById(userId);
        break;
      }
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Update password - for User model, let pre-save hook handle hashing
    // For membership models, hash manually since they don't have pre-save hooks
    if (userType === "user") {
      // User model has pre-save hook, so just set the plain password
      user.password = newPassword;
      await user.save();
    } else {
      // Membership models don't have pre-save hooks, so hash manually
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    }

    res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: err.message });
  }
};
