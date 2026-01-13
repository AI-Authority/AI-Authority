import Assessment from "../models/Assessment.js";
import AssessmentResult from "../models/AssessmentResult.js";
import CourseEnrollment from "../models/CourseEnrollment.js";
import TrainerCourse from "../models/TrainerCourse.js";
import { v4 as uuidv4 } from "uuid";

// ======================
// LEARNER ROUTES
// ======================

/**
 * GET ASSESSMENT (WITHOUT CORRECT ANSWERS)
 * GET /api/assessment/:assessmentId
 * Protected: JWT required, enrollment check (except admin)
 */
export const getAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;

    // Find assessment
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        error: "ASSESSMENT_NOT_FOUND",
        message: "This assessment does not exist",
      });
    }

    if (!assessment.isActive) {
      return res.status(410).json({
        error: "ASSESSMENT_DEACTIVATED",
        message: "This assessment is no longer available",
      });
    }

    // Check if questions exist
    if (!assessment.questions || assessment.questions.length === 0) {
      return res.status(400).json({
        error: "EMPTY_ASSESSMENT",
        message: "This assessment has no questions configured",
      });
    }

    // Enrollment check (skip for admin)
    if (!isAdmin) {
      const enrollment = await CourseEnrollment.findOne({
        userId: userId,
        courseId: assessment.courseId,
        status: "active",
      });

      if (!enrollment) {
        return res.status(403).json({
          error: "NOT_ENROLLED",
          message: "You must enroll in this course to take assessments",
        });
      }
    }

    // Sanitize questions - REMOVE CORRECT ANSWERS
    const sanitizedQuestions = assessment.questions.map((q) => ({
      questionId: q.questionId,
      questionText: q.questionText,
      options: q.options,
      // correctAnswer EXCLUDED - SECURITY CRITICAL
      // explanation EXCLUDED - shown only after submission
    }));

    res.json({
      assessmentId: assessment._id,
      title: assessment.title,
      courseId: assessment.courseId,
      lessonId: assessment.lessonId,
      totalQuestions: sanitizedQuestions.length,
      questions: sanitizedQuestions,
    });
  } catch (error) {
    console.error("Error fetching assessment:", error);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to load assessment",
    });
  }
};

/**
 * SUBMIT ASSESSMENT
 * POST /api/assessment/submit
 * Protected: JWT required
 * Body: { assessmentId, answers: [{ questionId, selectedOption }] }
 */
export const submitAssessment = async (req, res) => {
  try {
    const { assessmentId, answers } = req.body;
    const userId = req.user._id;
    const userModel = req.user.userModel || "User";

    // Validate request
    if (!assessmentId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: "INVALID_REQUEST",
        message: "assessmentId and answers array are required",
      });
    }

    // Find assessment
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        error: "ASSESSMENT_NOT_FOUND",
        message: "Assessment not found",
      });
    }

    // Validate answer format
    const isValidAnswers = answers.every(
      (a) =>
        typeof a.questionId === "string" &&
        typeof a.selectedOption === "number"
    );

    if (!isValidAnswers) {
      return res.status(400).json({
        error: "INVALID_ANSWER_FORMAT",
        message: "Answers must include questionId (string) and selectedOption (number)",
      });
    }

    // Check for duplicate submission (within last 5 seconds)
    const recentSubmission = await AssessmentResult.findOne({
      userId: userId,
      assessmentId: assessmentId,
      attemptedAt: { $gte: new Date(Date.now() - 5000) },
    });

    if (recentSubmission) {
      return res.status(429).json({
        error: "DUPLICATE_SUBMISSION",
        message: "Please wait before submitting again",
      });
    }

    // Check all questions are answered
    const submittedQuestionIds = answers.map((a) => a.questionId);
    const missingQuestions = assessment.questions
      .filter((q) => !submittedQuestionIds.includes(q.questionId))
      .map((q) => q.questionId);

    if (missingQuestions.length > 0) {
      return res.status(400).json({
        error: "INCOMPLETE_SUBMISSION",
        message: "Please answer all questions",
        missingQuestions,
      });
    }

    // Calculate score (BACKEND ONLY - SECURITY CRITICAL)
    let score = 0;
    const results = assessment.questions.map((question) => {
      const userAnswer = answers.find((a) => a.questionId === question.questionId);
      const isCorrect = userAnswer.selectedOption === question.correctAnswer;

      if (isCorrect) score++;

      return {
        questionId: question.questionId,
        questionText: question.questionText,
        options: question.options,
        userAnswer: userAnswer.selectedOption,
        correctAnswer: question.correctAnswer, // Revealed only after submission
        isCorrect,
        explanation: question.explanation || "",
      };
    });

    // Get attempt number
    const previousAttempts = await AssessmentResult.countDocuments({
      userId: userId,
      courseId: assessment.courseId,
      lessonId: assessment.lessonId,
      assessmentId: assessmentId,
    });

    const attemptNumber = previousAttempts + 1;

    // Store result
    const assessmentResult = await AssessmentResult.create({
      userId: userId,
      userModel: userModel,
      courseId: assessment.courseId,
      lessonId: assessment.lessonId,
      assessmentId: assessmentId,
      attemptNumber: attemptNumber,
      answers: answers,
      score: score,
      totalQuestions: assessment.questions.length,
      attemptedAt: new Date(),
    });

    res.json({
      success: true,
      resultId: assessmentResult._id,
      score: score,
      total: assessment.questions.length,
      attemptNumber: attemptNumber,
      results: results,
    });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    res.status(500).json({
      error: "SUBMISSION_FAILED",
      message: "Failed to save your results. Please try again.",
    });
  }
};

/**
 * GET USER'S ASSESSMENT HISTORY
 * GET /api/assessment/results/:courseId/:lessonId
 * Protected: JWT required
 */
export const getUserResults = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const userId = req.user._id;

    const results = await AssessmentResult.find({
      userId: userId,
      courseId: courseId,
      lessonId: lessonId,
    })
      .sort({ attemptedAt: -1 })
      .select("attemptNumber score totalQuestions attemptedAt")
      .limit(10);

    // Get best score
    const bestResult = results.length > 0
      ? results.reduce((best, current) =>
          current.score > best.score ? current : best
        )
      : null;

    res.json({
      attempts: results,
      bestScore: bestResult ? bestResult.score : 0,
      totalAttempts: results.length,
    });
  } catch (error) {
    console.error("Error fetching user results:", error);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to fetch results",
    });
  }
};

// ======================
// ADMIN / TRAINER ROUTES
// ======================

/**
 * CREATE ASSESSMENT
 * POST /api/admin/assessment
 * Protected: Admin or course trainer only
 */
export const createAssessment = async (req, res) => {
  try {
    const { courseId, lessonId, title, questions } = req.body;
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;

    // Validate request
    if (!courseId || !lessonId || !title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        error: "INVALID_REQUEST",
        message: "courseId, lessonId, title, and questions array are required",
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({
        error: "EMPTY_QUESTIONS",
        message: "At least one question is required",
      });
    }

    // Find course
    const course = await TrainerCourse.findById(courseId);

    if (!course) {
      return res.status(404).json({
        error: "COURSE_NOT_FOUND",
        message: "Course not found",
      });
    }

    // Debug logging
    console.log("=== Assessment Authorization Debug ===");
    console.log("Course ID:", courseId);
    console.log("Course trainerId:", course.trainerId);
    console.log("User ID from token:", userId);
    console.log("Comparison:", course.trainerId.toString(), "===", userId.toString());
    console.log("Are they equal?", course.trainerId.toString() === userId.toString());

    // Authorization: Only course trainer (admin access removed)
    if (course.trainerId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "UNAUTHORIZED",
        message: "Only the course trainer can create assessments",
      });
    }

    // Generate question IDs if not provided
    const processedQuestions = questions.map((q, index) => ({
      questionId: q.questionId || `q${index + 1}-${uuidv4().substring(0, 8)}`,
      questionText: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || "",
    }));

    // Create assessment
    const assessment = await Assessment.create({
      courseId,
      lessonId,
      title,
      questions: processedQuestions,
      isActive: true,
      createdBy: userId,
    });

    // Link assessment to lesson in TrainerCourse (updated for modules structure)
    let lessonFound = false;
    if (course.modules && Array.isArray(course.modules)) {
      for (const module of course.modules) {
        if (module.lessons && Array.isArray(module.lessons)) {
          const lesson = module.lessons.find((l) => l.lessonId === lessonId);
          if (lesson) {
            lesson.assessmentId = assessment._id;
            lessonFound = true;
            break;
          }
        }
      }
    }
    
    if (lessonFound) {
      await course.save();
    }

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      assessmentId: assessment._id,
      assessment: {
        id: assessment._id,
        title: assessment.title,
        courseId: assessment.courseId,
        lessonId: assessment.lessonId,
        totalQuestions: assessment.questions.length,
      },
    });
  } catch (error) {
    console.error("Error creating assessment:", error);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to create assessment",
    });
  }
};

/**
 * UPDATE ASSESSMENT
 * PUT /api/admin/assessment/:assessmentId
 * Protected: Admin or course trainer only
 */
export const updateAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { title, questions, isActive } = req.body;
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;

    // Find assessment
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        error: "ASSESSMENT_NOT_FOUND",
        message: "Assessment not found",
      });
    }

    // Find course
    const course = await TrainerCourse.findById(assessment.courseId);

    // Authorization: Only course trainer (admin access removed)
    if (course.trainerId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "UNAUTHORIZED",
        message: "Only the course trainer can update this assessment",
      });
    }

    // Update fields
    if (title) assessment.title = title;
    if (isActive !== undefined) assessment.isActive = isActive;
    
    if (questions && Array.isArray(questions)) {
      // Generate IDs for new questions
      const processedQuestions = questions.map((q, index) => ({
        questionId: q.questionId || `q${index + 1}-${uuidv4().substring(0, 8)}`,
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || "",
      }));
      assessment.questions = processedQuestions;
    }

    await assessment.save();

    res.json({
      success: true,
      message: "Assessment updated successfully",
      assessment: {
        id: assessment._id,
        title: assessment.title,
        isActive: assessment.isActive,
        totalQuestions: assessment.questions.length,
      },
    });
  } catch (error) {
    console.error("Error updating assessment:", error);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to update assessment",
    });
  }
};

/**
 * DELETE / DISABLE ASSESSMENT
 * DELETE /api/admin/assessment/:assessmentId
 * Protected: Admin or course trainer only
 */
export const deleteAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;

    // Find assessment
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        error: "ASSESSMENT_NOT_FOUND",
        message: "Assessment not found",
      });
    }

    // Find course
    const course = await TrainerCourse.findById(assessment.courseId);

    // Authorization: Only course trainer (admin access removed)
    if (course.trainerId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "UNAUTHORIZED",
        message: "Only the course trainer can delete this assessment",
      });
    }

    // Soft delete - set isActive to false (preserves historical data)
    assessment.isActive = false;
    await assessment.save();

    // Remove link from course lesson (updated for modules structure)
    let lessonFound = false;
    if (course.modules && Array.isArray(course.modules)) {
      for (const module of course.modules) {
        if (module.lessons && Array.isArray(module.lessons)) {
          const lesson = module.lessons.find(
            (l) => l.assessmentId && l.assessmentId.toString() === assessmentId
          );
          if (lesson) {
            lesson.assessmentId = null;
            lessonFound = true;
            break;
          }
        }
      }
    }
    
    if (lessonFound) {
      await course.save();
    }

    res.json({
      success: true,
      message: "Assessment disabled successfully",
    });
  } catch (error) {
    console.error("Error deleting assessment:", error);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to delete assessment",
    });
  }
};

/**
 * GET ASSESSMENT WITH ANSWERS (ADMIN/TRAINER ONLY)
 * GET /api/admin/assessment/:assessmentId
 * Protected: Admin or course trainer only
 */
export const getAssessmentWithAnswers = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const userId = req.user._id;
    const isAdmin = req.user.isAdmin;

    // Find assessment
    const assessment = await Assessment.findById(assessmentId);

    if (!assessment) {
      return res.status(404).json({
        error: "ASSESSMENT_NOT_FOUND",
        message: "Assessment not found",
      });
    }

    // Find course
    const course = await TrainerCourse.findById(assessment.courseId);

    // Authorization
    if (!isAdmin && course.trainerId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "UNAUTHORIZED",
        message: "Only the course trainer or admin can view full assessment details",
      });
    }

    // Return full assessment including correct answers
    res.json({
      assessmentId: assessment._id,
      title: assessment.title,
      courseId: assessment.courseId,
      lessonId: assessment.lessonId,
      isActive: assessment.isActive,
      questions: assessment.questions, // Includes correct answers
      createdAt: assessment.createdAt,
      updatedAt: assessment.updatedAt,
    });
  } catch (error) {
    console.error("Error fetching assessment with answers:", error);
    res.status(500).json({
      error: "SERVER_ERROR",
      message: "Failed to load assessment",
    });
  }
};
