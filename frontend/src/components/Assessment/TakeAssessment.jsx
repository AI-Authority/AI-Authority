import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssessment, submitAssessment } from "../../services/api";
import AssessmentResults from "./AssessmentResults";

export default function TakeAssessment() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  const draftKey = `assessment-draft-${assessmentId}`;

  useEffect(() => {
    loadAssessment();
    loadDraftAnswers();
  }, [assessmentId]);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getAssessment(assessmentId);
      setAssessment(res.data);
    } catch (err) {
      console.error("Error loading assessment:", err);
      setError(
        err.response?.data?.message || "Failed to load assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const loadDraftAnswers = () => {
    try {
      const saved = localStorage.getItem(draftKey);
      if (saved) {
        const draft = JSON.parse(saved);
        setAnswers(draft);
      }
    } catch (err) {
      console.error("Error loading draft:", err);
    }
  };

  const saveDraftAnswers = (newAnswers) => {
    try {
      localStorage.setItem(draftKey, JSON.stringify(newAnswers));
    } catch (err) {
      console.error("Error saving draft:", err);
    }
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    const newAnswers = {
      ...answers,
      [questionId]: optionIndex,
    };
    setAnswers(newAnswers);
    saveDraftAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all questions answered
    const unansweredQuestions = assessment.questions.filter(
      (q) => answers[q.questionId] === undefined
    );

    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions before submitting. ${unansweredQuestions.length} questions remaining.`);
      return;
    }

    // Confirm submission
    const confirmed = window.confirm(
      `Are you sure you want to submit your assessment? You have answered all ${assessment.totalQuestions} questions.`
    );

    if (!confirmed) return;

    try {
      setSubmitting(true);
      setError("");

      // Format answers for API
      const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
        questionId,
        selectedOption,
      }));

      const res = await submitAssessment({
        assessmentId,
        answers: formattedAnswers,
      });

      // Clear draft
      localStorage.removeItem(draftKey);

      // Show results
      setResults(res.data);
    } catch (err) {
      console.error("Error submitting assessment:", err);
      setError(
        err.response?.data?.message || "Failed to submit assessment. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetry = () => {
    setResults(null);
    setAnswers({});
    localStorage.removeItem(draftKey);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !assessment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Show results after submission
  if (results) {
    return (
      <AssessmentResults
        results={results}
        assessmentTitle={assessment.title}
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  // Assessment taking UI
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / assessment.totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {assessment.title}
              </h1>
              <p className="text-gray-600">
                {assessment.totalQuestions} Questions
              </p>
            </div>
            <button
              onClick={handleBack}
              className="text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              ← Back
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>
                {answeredCount} / {assessment.totalQuestions} answered
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Questions */}
        <form onSubmit={handleSubmit}>
          {assessment.questions.map((question, qIndex) => {
            const isAnswered = answers[question.questionId] !== undefined;

            return (
              <div
                key={question.questionId}
                className="bg-white rounded-lg shadow-md p-6 mb-4"
              >
                {/* Question Header */}
                <div className="flex items-start mb-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                      isAnswered
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {qIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {question.questionText}
                    </h3>
                  </div>
                </div>

                {/* Options */}
                <div className="ml-11 space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[question.questionId] === optionIndex;

                    return (
                      <label
                        key={optionIndex}
                        className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition ${
                          isSelected
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={question.questionId}
                          value={optionIndex}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswerChange(question.questionId, optionIndex)
                          }
                          className="mt-1 mr-3 w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-800">{option}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                {answeredCount === assessment.totalQuestions ? (
                  <span className="text-green-600 font-semibold">
                    ✓ All questions answered
                  </span>
                ) : (
                  <span>
                    {assessment.totalQuestions - answeredCount} questions remaining
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`px-8 py-3 rounded-lg font-semibold transition ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {submitting ? "Submitting..." : "Submit Assessment"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
