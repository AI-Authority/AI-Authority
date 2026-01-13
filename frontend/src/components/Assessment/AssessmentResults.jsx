import React from "react";

export default function AssessmentResults({ results, assessmentTitle, onRetry, onBack }) {
  const { score, total, attemptNumber, results: questionResults } = results;
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Score Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <div className="mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-4">
              <span className="text-4xl">📊</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Assessment Complete!
          </h1>
          <p className="text-gray-600 mb-6">{assessmentTitle}</p>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 mb-6">
            <div className="text-5xl font-bold mb-2">
              {score} / {total}
            </div>
            <div className="text-xl">{percentage}% Correct</div>
            <div className="text-sm mt-2 opacity-90">
              Attempt #{attemptNumber}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onRetry}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Try Again
            </button>
            <button
              onClick={onBack}
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Back to Course
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Answer Review</h2>

          {questionResults.map((result, index) => {
            const isCorrect = result.isCorrect;

            return (
              <div
                key={result.questionId}
                className={`border-l-4 p-6 mb-4 rounded-lg ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start mb-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 ${
                      isCorrect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {isCorrect ? "✓" : "✗"}
                      </span>
                      <span
                        className={`font-semibold ${
                          isCorrect ? "text-green-700" : "text-red-700"
                        }`}
                      >
                        {isCorrect ? "Correct" : "Incorrect"}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {result.questionText}
                    </h3>
                  </div>
                </div>

                {/* Options Review */}
                <div className="ml-11 space-y-2">
                  {result.options.map((option, optionIndex) => {
                    const isUserAnswer = result.userAnswer === optionIndex;
                    const isCorrectAnswer = result.correctAnswer === optionIndex;

                    let optionClass = "bg-white border-gray-200";
                    let label = "";

                    if (isCorrectAnswer) {
                      optionClass = "bg-green-100 border-green-400";
                      label = "✓ Correct Answer";
                    }

                    if (isUserAnswer && !isCorrect) {
                      optionClass = "bg-red-100 border-red-400";
                      label = "✗ Your Answer";
                    }

                    if (isUserAnswer && isCorrect) {
                      label = "✓ Your Answer";
                    }

                    return (
                      <div
                        key={optionIndex}
                        className={`p-3 border-2 rounded-lg ${optionClass}`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-800">{option}</span>
                          {label && (
                            <span
                              className={`text-sm font-semibold ${
                                isCorrectAnswer
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {label}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {result.explanation && (
                  <div className="ml-11 mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600 font-semibold text-sm">
                        💡 Explanation:
                      </span>
                      <p className="text-gray-700 text-sm flex-1">
                        {result.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={onBack}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Back to Course
          </button>
        </div>
      </div>
    </div>
  );
}
