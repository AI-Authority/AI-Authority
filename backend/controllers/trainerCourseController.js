import TrainerCourse from "../models/TrainerCourse.js";
import { sendEmail } from "../utils/emailService.js";

// 1. Trainer Uploads a Course
export const uploadTrainerCourse = async (req, res) => {
  try {
        console.log("🔥 Upload API hit");
    console.log("Request Body:", JSON.stringify(req.body, null, 2));
    console.log("Received course upload request:", req.body);

    const {
      trainerId,
      courseName,
      startDate,
      endDate,
      trainerName,
      organisationName,
      mode,
      courseType,
      description,
      price,
      modules, // Required modules array
    } = req.body;


    console.log("Extracted fields:", {
      trainerId,
      courseName,
      startDate,
      endDate,
      trainerName,
      organisationName,
      mode,
      courseType,
      price,
      modulesLength: modules?.length
    });

    console.log("===== DETAILED VALIDATION CHECK =====");
    console.log("trainerId:", `"${trainerId}"`);
    console.log("courseName:", `"${courseName}"`);
    console.log("startDate:", `"${startDate}"`);
    console.log("endDate:", `"${endDate}"`);
    console.log("trainerName:", `"${trainerName}"`);
    console.log("organisationName:", `"${organisationName}"`);
    console.log("mode:", `"${mode}"`);
    console.log("courseType:", `"${courseType}"`);
    console.log("price:", price, typeof price);
    console.log("description:", `"${description}"`);
    console.log("modulesLength:", modules?.length);
    // Validate required fields
    if (
      !trainerId ||
      !courseName ||
      !startDate ||
      !endDate ||
      !trainerName ||
      !organisationName ||
      !mode ||
      !courseType ||
      price === undefined
    ) {
      console.log("Validation failed - missing required fields");
      return res.status(400).json({ success: false, message: "All required fields must be provided" });
    }


    // Validate modules only for Recorded courses
    if (mode === "Recorded") {
      if (!modules || !Array.isArray(modules) || modules.length === 0) {
        return res.status(400).json({ success: false, message: "At least one module is required for Recorded courses" });
      }
      for (const mod of modules) {
        if (!mod.lessons || !Array.isArray(mod.lessons) || mod.lessons.length === 0) {
          return res.status(400).json({ success: false, message: "Each module must have at least one lesson" });
        }
      }
    }


    const courseData = {
      trainerId,
      courseName,
      startDate,
      endDate,
      trainerName,
      organisationName,
      mode,
      courseType,
      description: description || "No description provided",
      price,
      modules,
    };

    const newCourse = await TrainerCourse.create(courseData);

    res.status(201).json({ success: true, message: "Course submitted for approval", data: newCourse });
  } catch (error) {
    console.error("Upload Course Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 2. Admin: Fetch All Pending Courses
export const getPendingCourses = async (req, res) => {
  try {
    const courses = await TrainerCourse.find({ approvalStatus: "pending" })
      .populate("trainerId", "personalInfo.fullName personalInfo.email");

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Fetch Pending Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 3. Admin: Approve Course
export const approveCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await TrainerCourse.findByIdAndUpdate(
      id,
      { approvalStatus: "approved", isResubmitted: false },
      { new: true }
    ).populate('trainerId');

    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    // Send course approval email to trainer
    try {
      const courseApprovalEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; }
            .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { padding: 20px; background-color: white; border-radius: 0 0 10px 10px; }
            .course-details { background-color: #f0f0f0; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
            .footer { text-align: center; padding-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Course Approved!</h1>
            </div>
            <div class="content">
              <p>Dear <strong>${course.trainerName}</strong>,</p>
              <p>Congratulations! Your course has been approved by the AI Authority administration team.</p>
              <div class="course-details">
                <h3>Course Details:</h3>
                <p><strong>Course Name:</strong> ${course.courseName}</p>
                <p><strong>Organisation:</strong> ${course.organisationName}</p>
                <p><strong>Start Date:</strong> ${new Date(course.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> ${new Date(course.endDate).toLocaleDateString()}</p>
                <p><strong>Mode:</strong> ${course.mode}</p>
                <p><strong>Type:</strong> ${course.courseType}</p>
                ${course.price ? `<p><strong>Price:</strong> $${course.price}</p>` : ''}
              </div>
              <p>Your course is now live and available to students on our platform.</p>
              <p>Thank you for contributing to the AI Authority community!</p>
              <p>Best regards,<br><strong>The AI Authority Team</strong></p>
            </div>
            <div class="footer">
              <p>© 2025 AI Authority. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // Get trainer email from populated trainer information
      const trainerEmail = course.trainerId?.personalInfo?.email;

      if (trainerEmail) {
        await sendEmail(trainerEmail, "🎉 Your Course has been Approved - AI Authority", courseApprovalEmailContent);
      }
    } catch (emailError) {
      console.error("Failed to send course approval email:", emailError);
      // Don't block approval if email fails
    }

    res.status(200).json({ success: true, message: "Course approved successfully", data: course });
  } catch (error) {
    console.error("Approve Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 4. Admin: Reject Course
export const rejectCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await TrainerCourse.findByIdAndUpdate(
      id,
      { approvalStatus: "rejected", isResubmitted: false },
      { new: true }
    );

    if (!course) return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, message: "Course rejected", data: course });
  } catch (error) {
    console.error("Reject Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 5. Public: Get Approved Courses
export const getApprovedCourses = async (req, res) => {
  try {
    const courses = await TrainerCourse.find({ approvalStatus: "approved" }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Fetch Approved Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 6. Trainer Dashboard: Get Trainer's Own Courses
export const getTrainerCourses = async (req, res) => {
  try {
    const { trainerId } = req.params;

    const courses = await TrainerCourse.find({ trainerId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    console.error("Trainer Courses Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 7. Trainer: Update/Edit Course and Resubmit
export const updateTrainerCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      courseName,
      startDate,
      endDate,
      trainerName,
      organisationName,
      mode,
      courseType,
      courseURL,
      description,
      price,
      modules, // Updated to use modules instead of lessons
    } = req.body;

    // Validate required fields
    if (
      !courseName ||
      !startDate ||
      !endDate ||
      !trainerName ||
      !organisationName ||
      !mode ||
      !courseType ||
      price === undefined
    ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Validate modules only for Recorded courses
    if (mode === "Recorded") {
      if (!modules || !Array.isArray(modules) || modules.length === 0) {
        return res.status(400).json({ success: false, message: "At least one module is required for Recorded courses" });
      }
      for (const mod of modules) {
        if (!mod.lessons || !Array.isArray(mod.lessons) || mod.lessons.length === 0) {
          return res.status(400).json({ success: false, message: "Each module must have at least one lesson" });
        }
      }
    }

    // Prepare update data
    const updateData = {
      courseName,
      startDate,
      endDate,
      trainerName,
      organisationName,
      mode,
      courseType,
      courseURL,
      description,
      price,
      modules, // Use modules
      approvalStatus: "pending",
      isResubmitted: true,
    };

    const updatedCourse = await TrainerCourse.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedCourse) return res.status(404).json({ success: false, message: "Course not found" });

    res.status(200).json({ success: true, message: "Course updated and resubmitted for approval", data: updatedCourse });
  } catch (error) {
    console.error("Update Course Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 8. Delete Course (Admin or Trainer if rejected)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Delete request received:", { id });

    const course = await TrainerCourse.findById(id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const deletedCourse = await TrainerCourse.findByIdAndDelete(id);

    console.log("Course deleted successfully:", deletedCourse);
    res.status(200).json({ success: true, message: "Course deleted successfully", data: deletedCourse });
  } catch (error) {
    console.error("Delete Course Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 9. Admin: Fetch ALL Courses (pending + approved + rejected)
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await TrainerCourse.find()
      .populate("trainerId", "personalInfo.fullName personalInfo.email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error("Fetch All Courses Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

