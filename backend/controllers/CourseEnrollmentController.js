import CourseEnrollment from "../models/CourseEnrollment.js"; // enrollment model
import TrainerCourse from "../models/TrainerCourse.js"; // course model

// return enrolled course IDs (used by listing page)
export const getMyEnrolledCourses = async (req, res) => {
  try {
    const { _id, userModel } = req.user; // logged-in user
    const enrollments = await CourseEnrollment.find( // fetch active enrollments
      { userId: _id, userModel, status: "active" },
      "courseId"
    );
    res.status(200).json({ // return only IDs
      success: true,
      data: enrollments.map(e => e.courseId.toString())
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" }); // fail
  }
};

// return full course details (used by My Courses page)
export const getMyEnrolledCourseDetails = async (req, res) => {
  try {
    const { _id, userModel } = req.user; // logged-in user
    const enrollments = await CourseEnrollment.find({ // fetch + populate courses
      userId: _id,
      userModel,
      status: "active"
    }).populate("courseId");
    res.status(200).json({ // return TrainerCourse docs
      success: true,
      data: enrollments.map(e => e.courseId).filter(Boolean)
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" }); // fail
  }
};

// create enrollment after successful payment
export const createEnrollment = async (req, res) => {
  try {
    const { courseId, paymentProvider, paymentId, amountPaid } = req.body; // payment data
    const { _id, userModel } = req.user; // logged-in user

    const course = await TrainerCourse.findOne({ // validate approved course
      _id: courseId,
      approvalStatus: "approved"
    });
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const exists = await CourseEnrollment.findOne({ // prevent duplicate
      userId: _id,
      userModel,
      courseId
    });
    if (exists) {
      return res.status(200).json({ success: true, message: "Already enrolled" });
    }

    await CourseEnrollment.create({ // save enrollment
      userId: _id,
      userModel,
      courseId,
      paymentProvider,
      paymentId,
      amountPaid
    });

    res.status(201).json({ success: true, message: "Enrollment successful" }); // success
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" }); // fail
  }
};

// validate watch access for a course
export const validateCourseAccess = async (req, res) => {
  try {
    const { courseId } = req.params; // requested course
    const { _id, userModel } = req.user; // logged-in user

    const enrollment = await CourseEnrollment.findOne({ // check access
      userId: _id,
      userModel,
      courseId,
      status: "active"
    });
    if (!enrollment) {
      return res.status(403).json({ success: false, allowed: false });
    }

    const course = await TrainerCourse.findById(courseId).select("courseURL"); // fetch URL
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.status(200).json({ success: true, allowed: true, courseURL: course.courseURL }); // allow
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" }); // fail
  }
};
