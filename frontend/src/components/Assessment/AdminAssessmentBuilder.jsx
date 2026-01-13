import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getApprovedCourses,
  createAssessment,
  getAssessmentWithAnswers,
  updateAssessment,
  deleteAssessment,
} from "../../services/api";

export default function AdminAssessmentBuilder() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

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

  useEffect(() => {
    checkAdminAccess();
    loadCourses();
  }, []);

  const checkAdminAccess = () => {
    const admin = localStorage.getItem("isAdmin") === "true";
    if (!admin) {
      alert("Admin access required");
      navigate("/");
      return;
    }
    setIsAdmin(true);
  };

  const loadCourses = async () => {
    try {
      const res = await getApprovedCourses();
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Error loading courses:", err);
      setError("Failed to load courses");
    }
  };

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
      if (q.correctAnswer < 0 || q.correctAnswer >= q.options.length) {
        setError(`Question ${i + 1}: Invalid correct answer selected`);
        return;
      }
    }

    try {
      setLoading(true);

      const assessmentData = {
        courseId: selectedCourse._id,
        lessonId: selectedLesson.lessonId,
        title: assessmentTitle,
        questions: questions,
      };

      // Check if updating or creating
      if (selectedLesson.assessmentId) {
        await updateAssessment(selectedLesson.assessmentId, assessmentData);
        setMessage("Assessment updated successfully!");
      } else {
        const res = await createAssessment(assessmentData);
        setMessage(`Assessment created successfully! ID: ${res.data.assessmentId}`);
      }

      // Refresh courses to get updated assessment links
      await loadCourses();
    } catch (err) {
      console.error("Error saving assessment:", err);
      setError(err.response?.data?.message || "Failed to save assessment");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAssessment = async () => {
    if (!selectedLesson?.assessmentId) {
      alert("No assessment to delete");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to disable this assessment? This will preserve historical data but hide it from students."
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteAssessment(selectedLesson.assessmentId);
      setMessage("Assessment disabled successfully");
      resetForm();
      await loadCourses();
    } catch (err) {
      console.error("Error deleting assessment:", err);
      setError("Failed to delete assessment");
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Assessment Builder
          </h1>
          <p className="text-gray-600">Create and manage course assessments</p>
        </div>

        {/* Course & Lesson Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Select Course & Lesson
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course
              </label>
              <select
                value={selectedCourse?._id || ""}
                onChange={handleCourseSelect}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lesson
              </label>
              <select
                value={selectedLesson?.lessonId || ""}
                onChange={handleLessonSelect}
                disabled={!selectedCourse || getAllLessonsFromCourse(selectedCourse).length === 0}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                <option value="">Select a lesson</option>
                {getAllLessonsFromCourse(selectedCourse).map((lesson) => (
                  <option key={lesson.lessonId} value={lesson.lessonId}>
                    {lesson.moduleName} - {lesson.title} {lesson.assessmentId ? "(Has Assessment)" : ""}
                  </option>
                ))}
              </select>
              {selectedCourse && getAllLessonsFromCourse(selectedCourse).length === 0 && (
                <p className="text-sm text-orange-600 mt-2">
                  This course has no lessons. Add lessons to the course first.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Assessment Form */}
        {selectedLesson && (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Assessment Details
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Assessment Title
                </label>
                <input
                  type="text"
                  value={assessmentTitle}
                  onChange={(e) => setAssessmentTitle(e.target.value)}
                  placeholder="e.g., Module 1 Quiz"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Questions */}
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Question {qIndex + 1}
                  </h3>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(qIndex)}
                      className="text-red-600 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {/* Question Text */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Question Text
                  </label>
                  <textarea
                    value={question.questionText}
                    onChange={(e) =>
                      updateQuestion(qIndex, "questionText", e.target.value)
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your question"
                    required
                  />
                </div>

                {/* Options */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Options
                  </label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex gap-2 mb-2">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() =>
                          updateQuestion(qIndex, "correctAnswer", optionIndex)
                        }
                        className="mt-3 w-4 h-4 text-green-600"
                        title="Mark as correct answer"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(qIndex, optionIndex, e.target.value)
                        }
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(qIndex, optionIndex)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
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
                      className="text-blue-600 hover:text-blue-700 font-semibold text-sm mt-2"
                    >
                      + Add Option
                    </button>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    ● Select the radio button to mark the correct answer
                  </p>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Explanation (Optional)
                  </label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) =>
                      updateQuestion(qIndex, "explanation", e.target.value)
                    }
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Explain the correct answer"
                  />
                </div>
              </div>
            ))}

            {/* Add Question Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={addQuestion}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 font-semibold transition"
              >
                + Add Another Question
              </button>
            </div>

            {/* Messages */}
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
              <div>
                {selectedLesson.assessmentId && (
                  <button
                    type="button"
                    onClick={handleDeleteAssessment}
                    disabled={loading}
                    className="text-red-600 hover:text-red-700 font-semibold"
                  >
                    Disable Assessment
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-3 rounded-lg font-semibold transition ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {loading
                    ? "Saving..."
                    : selectedLesson.assessmentId
                    ? "Update Assessment"
                    : "Create Assessment"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
