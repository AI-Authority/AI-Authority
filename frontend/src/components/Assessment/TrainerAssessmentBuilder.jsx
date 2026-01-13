import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createAssessment,
  getAssessmentWithAnswers,
  updateAssessment,
  deleteAssessment,
} from "../../services/api";
import axios from "axios";

export default function TrainerAssessmentBuilder() {
  const navigate = useNavigate();
  const [trainerId, setTrainerId] = useState("");

  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Helper function to decode JWT and get user ID
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("userToken");
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded token payload:", payload);
      return payload._id || payload.id || payload.userId;
    } catch (err) {
      console.error("Error decoding token:", err);
      return null;
    }
  };

  const checkTrainerAccess = () => {
    const token = localStorage.getItem("userToken");
    const userId = getUserIdFromToken();
    
    console.log("Checking trainer access...");
    console.log("User ID from token:", userId);
    console.log("Token exists:", !!token);
    
    if (!userId || !token) {
      console.error("Missing credentials");
      alert("Trainer access required. Please log in as a trainer.");
      navigate("/login");
      return false;
    }
    setTrainerId(userId);
    return true;
  };

  const loadTrainerCourses = async () => {
    try {
      setLoading(true);
      setError("");
      
      const token = localStorage.getItem("userToken");
      const userId = getUserIdFromToken();
      
      console.log("Loading courses for trainer:", userId);
      
      if (!userId || !token) {
        setError("Please log in as a trainer");
        setLoading(false);
        return;
      }
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/trainer/courses/${userId}`,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Courses loaded:", res.data);
      
      // Only show approved courses
      const approvedCourses = (res.data.data || []).filter(c => c.approvalStatus === "approved");
      setCourses(approvedCourses);
      
      if (approvedCourses.length === 0) {
        setError("You have no approved courses yet. Please upload and get a course approved first.");
      }
    } catch (err) {
      console.error("Error loading courses:", err);
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.message || "Failed to load your courses. Please make sure you are logged in as a trainer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hasAccess = checkTrainerAccess();
    if (hasAccess) {
      loadTrainerCourses();
    }
  }, []);

  const handleCourseSelect = (e) => {
    const courseId = e.target.value;
    const course = courses.find((c) => c._id === courseId);
    setSelectedCourse(course);
    setSelectedLesson(null);
    resetForm();
  };

  // Helper function to get all lessons from all modules
  const getAllLessonsFromCourse = (course) => {
    if (!course || !course.modules) return [];
    const allLessons = [];
    course.modules.forEach((module) => {
      if (module.lessons && Array.isArray(module.lessons)) {
        module.lessons.forEach((lesson) => {
          allLessons.push({
            ...lesson,
            moduleName: module.title, // Add module name for context
          });
        });
      }
    });
    return allLessons;
  };

  const handleLessonSelect = (e) => {
    const lessonId = e.target.value;
    const allLessons = getAllLessonsFromCourse(selectedCourse);
    const lesson = allLessons.find((l) => l.lessonId === lessonId);
    setSelectedLesson(lesson);
    
    // If lesson has assessment, load it
    if (lesson?.assessmentId) {
      loadExistingAssessment(lesson.assessmentId);
    } else {
      resetForm();
    }
  };

  const loadExistingAssessment = async (assessmentId) => {
    try {
      setLoading(true);
      const res = await getAssessmentWithAnswers(assessmentId);
      const assessment = res.data;
      
      setAssessmentTitle(assessment.title);
      setQuestions(assessment.questions.map(q => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || "",
      })));
      
      setMessage("Loaded existing assessment for editing");
    } catch (err) {
      console.error("Error loading assessment:", err);
      setError("Failed to load existing assessment");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setAssessmentTitle("");
    setQuestions([
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ]);
    setMessage("");
    setError("");
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) {
      alert("At least one question is required");
      return;
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length >= 6) {
      alert("Maximum 6 options allowed");
      return;
    }
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeOption = (qIndex, optionIndex) => {
    const updated = [...questions];
    if (updated[qIndex].options.length <= 2) {
      alert("Minimum 2 options required");
      return;
    }
    updated[qIndex].options.splice(optionIndex, 1);
    // Adjust correct answer if needed
    if (updated[qIndex].correctAnswer >= updated[qIndex].options.length) {
      updated[qIndex].correctAnswer = 0;
    }
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation
    if (!selectedCourse || !selectedLesson) {
      setError("Please select a course and lesson");
      return;
    }

    if (!assessmentTitle.trim()) {
      setError("Please enter assessment title");
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        setError(`Question ${i + 1}: Please enter question text`);
        return;
      }
      for (let j = 0; j < q.options.length; j++) {
        if (!q.options[j].trim()) {
          setError(`Question ${i + 1}: Option ${j + 1} cannot be empty`);
          return;
        }
      }
    }

    try {
      setLoading(true);

      const payload = {
        courseId: selectedCourse._id,
        lessonId: selectedLesson.lessonId,
        title: assessmentTitle,
        questions: questions,
      };

      if (selectedLesson.assessmentId) {
        // Update existing assessment
        await updateAssessment(selectedLesson.assessmentId, payload);
        setMessage("Assessment updated successfully!");
      } else {
        // Create new assessment
        await createAssessment(payload);
        setMessage("Assessment created successfully!");
      }

      // Reload courses to get updated assessment IDs
      await loadTrainerCourses();
    } catch (err) {
      console.error("Error saving assessment:", err);
      setError(err.response?.data?.message || "Failed to save assessment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssessment = async () => {
    if (!selectedLesson?.assessmentId) {
      setError("No assessment to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this assessment? This action cannot be undone.")) {
      return;
    }

    try {
      setLoading(true);
      await deleteAssessment(selectedLesson.assessmentId);
      setMessage("Assessment deleted successfully!");
      resetForm();
      await loadTrainerCourses();
      setSelectedLesson(null);
    } catch (err) {
      console.error("Error deleting assessment:", err);
      setError(err.response?.data?.message || "Failed to delete assessment");
    } finally {
      setLoading(false);
    }
  };

  if (loading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Assessment Builder
              </h1>
              <p className="text-gray-600">
                Create and manage assessments for your course lessons
              </p>
            </div>
            <button
              onClick={() => navigate("/trainer/courses-dashboard")}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              ← Back to Courses
            </button>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Course and Lesson Selection */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Select Course & Lesson
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course *
              </label>
              <select
                value={selectedCourse?._id || ""}
                onChange={handleCourseSelect}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select Course --</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson *
              </label>
              <select
                value={selectedLesson?.lessonId || ""}
                onChange={handleLessonSelect}
                disabled={!selectedCourse}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">-- Select Lesson --</option>
                {getAllLessonsFromCourse(selectedCourse).map((lesson) => (
                  <option key={lesson.lessonId} value={lesson.lessonId}>
                    {lesson.moduleName} - {lesson.title} {lesson.assessmentId ? "(Has Assessment)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        {selectedLesson && (
          <form onSubmit={handleSubmit}>
            {/* Assessment Title */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Assessment Details
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Title *
                </label>
                <input
                  type="text"
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  placeholder="e.g., Module 1 - Basics Quiz"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Questions */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Questions ({questions.length})
                </h2>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  + Add Question
                </button>
              </div>

              {questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="border-2 border-gray-200 rounded-lg p-6 mb-4 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      Question {qIndex + 1}
                    </h3>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Question Text *
                    </label>
                    <textarea
                      value={question.questionText}
                      onChange={(e) =>
                        updateQuestion(qIndex, "questionText", e.target.value)
                      }
                      placeholder="Enter your question here..."
                      rows="3"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Options */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Options * (Select the correct answer)
                    </label>
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={question.correctAnswer === optIndex}
                          onChange={() =>
                            updateQuestion(qIndex, "correctAnswer", optIndex)
                          }
                          className="w-5 h-5"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateOption(qIndex, optIndex, e.target.value)
                          }
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {question.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(qIndex, optIndex)}
                            className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    {question.options.length < 6 && (
                      <button
                        type="button"
                        onClick={() => addOption(qIndex)}
                        className="mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 text-sm"
                      >
                        + Add Option
                      </button>
                    )}
                  </div>

                  {/* Explanation */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Explanation (Optional)
                    </label>
                    <textarea
                      value={question.explanation}
                      onChange={(e) =>
                        updateQuestion(qIndex, "explanation", e.target.value)
                      }
                      placeholder="Explain why this is the correct answer..."
                      rows="2"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  {selectedLesson?.assessmentId && (
                    <button
                      type="button"
                      onClick={handleDeleteAssessment}
                      disabled={loading}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400 font-semibold flex items-center gap-2 shadow-md"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Assessment
                    </button>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:bg-gray-100 font-semibold"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 font-semibold shadow-md"
                  >
                    {loading
                      ? "Saving..."
                      : selectedLesson?.assessmentId
                      ? "Update Assessment"
                      : "Create Assessment"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* No Lesson Selected */}
        {!selectedLesson && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Select a Lesson to Continue
            </h3>
            <p className="text-gray-600">
              Choose a course and lesson from the dropdowns above to create or edit an assessment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
