import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { updateTrainerCourse } from "../../services/api";
import { v4 as uuidv4 } from 'uuid';

export default function EditCourseModal({ course, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("details"); // "details" or "lessons"
  
  const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const courseTypes = [
    "Enterprise AI Architecture",
    "AI Strategy",
    "AI Solution Architecture",
    "AI Security",
    "AI Operations",
    "AI Integration",
    "AI Governance",
    "AI Executive",
    "AI Developer Foundation",
    "AI Developer Advanced",
    "AI Computing",
  ];

  const validationSchema = Yup.object().shape({
    courseName: Yup.string().trim().required("Course Name is required"),
    trainerName: Yup.string().trim().required("Trainer Name is required"),
    organisationName: Yup.string().trim().required("Organisation Name is required"),
    mode: Yup.string()
      .oneOf(["Recorded", "Live Class", "Onsite"], "Select a valid Mode")
      .required("Mode is required"),
    courseType: Yup.string()
      .oneOf(courseTypes, "Select a valid Course Type")
      .required("Course Type is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .min(Yup.ref("startDate"), "End date must be after start date"),
    description: Yup.string().trim().max(10000, "Description is too long (max 10000 characters)"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be non-negative"),
    lessons: Yup.array()
      .of(
        Yup.object().shape({
          lessonId: Yup.string().required(),
          title: Yup.string().trim().required("Lesson title is required"),
          videoURL: Yup.string()
            .trim()
            .required("Video URL is required")
            .matches(urlRegex, "Enter a valid video URL"),
          order: Yup.number().required().min(1, "Order must be at least 1"),
        })
      )
      .min(1, "At least one lesson is required"),
  });

  const handleUpdate = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Ensure lessons have unique orders and lessonIds
      const processedLessons = values.lessons.map((lesson, index) => ({
        ...lesson,
        order: index + 1, // Auto-assign order based on array position
        lessonId: lesson.lessonId || uuidv4()
      }));

      const updatedData = {
        ...values,
        lessons: processedLessons
      };

      await updateTrainerCourse(course._id, updatedData);
      alert("Course updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating course:", error);
      const msg = error.response?.data?.message || "Failed to update course";
      alert(msg);
      setFieldError("general", msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Initial values with lessons array
  // If course has courseURL but no lessons, convert it to lesson format
  const migrateLegacyCourse = () => {
    if (course.courseURL && (!course.lessons || course.lessons.length === 0)) {
      return [{
        lessonId: uuidv4(),
        title: "Main Course Video",
        videoURL: course.courseURL,
        order: 1,
        assessmentId: null
      }];
    }
    return course.lessons || [];
  };

  const initialValues = {
    courseName: course.courseName || "",
    trainerName: course.trainerName || "",
    organisationName: course.organisationName || "",
    mode: course.mode || "",
    courseType: course.courseType || "",
    startDate: course.startDate ? course.startDate.split("T")[0] : "",
    endDate: course.endDate ? course.endDate.split("T")[0] : "",
    description: course.description || "",
    price: course.price || 0,
    lessons: migrateLegacyCourse()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Edit Course</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-6">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "details"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Course Details
          </button>
          <button
            onClick={() => setActiveTab("lessons")}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === "lessons"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Manage Lessons ({initialValues.lessons.length})
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Course Details Tab */}
              {activeTab === "details" && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-1">Course Name *</label>
                    <input
                      type="text"
                      name="courseName"
                      value={values.courseName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                    />
                    {touched.courseName && errors.courseName && (
                      <div className="text-red-600 text-sm mt-1">{errors.courseName}</div>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Trainer Name *</label>
                    <input
                      type="text"
                      name="trainerName"
                      value={values.trainerName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                    />
                    {touched.trainerName && errors.trainerName && (
                      <div className="text-red-600 text-sm mt-1">{errors.trainerName}</div>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Organisation Name *</label>
                    <input
                      type="text"
                      name="organisationName"
                      value={values.organisationName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                    />
                    {touched.organisationName && errors.organisationName && (
                      <div className="text-red-600 text-sm mt-1">{errors.organisationName}</div>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Mode *</label>
                    <select
                      name="mode"
                      value={values.mode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select Mode</option>
                      <option value="Recorded">Recorded</option>
                      <option value="Live Class">Live Class</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                    {touched.mode && errors.mode && (
                      <div className="text-red-600 text-sm mt-1">{errors.mode}</div>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Course Type *</label>
                    <select
                      name="courseType"
                      value={values.courseType}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="">Select Course Type</option>
                      {courseTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {touched.courseType && errors.courseType && (
                      <div className="text-red-600 text-sm mt-1">{errors.courseType}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-1">Start Date *</label>
                      <input
                        type="date"
                        name="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-3 border rounded-lg"
                      />
                      {touched.startDate && errors.startDate && (
                        <div className="text-red-600 text-sm mt-1">{errors.startDate}</div>
                      )}
                    </div>

                    <div>
                      <label className="block font-medium mb-1">End Date *</label>
                      <input
                        type="date"
                        name="endDate"
                        value={values.endDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-3 border rounded-lg"
                      />
                      {touched.endDate && errors.endDate && (
                        <div className="text-red-600 text-sm mt-1">{errors.endDate}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Course Description *</label>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                      rows="4"
                      maxLength={10000}
                    />
                    <div className="flex justify-between items-center">
                      {touched.description && errors.description ? (
                        <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                      ) : (
                        <div />
                      )}
                      <div className="text-gray-400 text-sm mt-1">
                        {values.description.length}/10000
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Price (USD) *</label>
                    <input
                      type="number"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 border rounded-lg"
                      min="0"
                      step="0.01"
                    />
                    {touched.price && errors.price && (
                      <div className="text-red-600 text-sm mt-1">{errors.price}</div>
                    )}
                  </div>
                </div>
              )}

              {/* Lessons Tab */}
              {activeTab === "lessons" && (
                <FieldArray name="lessons">
                  {({ push, remove, move }) => (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Course Lessons ({values.lessons.length})
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Manage video lessons and their order
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            push({
                              lessonId: uuidv4(),
                              title: "",
                              videoURL: "",
                              order: values.lessons.length + 1,
                              assessmentId: null,
                            })
                          }
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                        >
                          <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            width="20"
                            height="20"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add Lesson
                        </button>
                      </div>

                      {values.lessons.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                          <h3 className="mt-2 text-lg font-medium text-gray-900">No lessons yet</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Get started by adding your first lesson
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              push({
                                lessonId: uuidv4(),
                                title: "",
                                videoURL: "",
                                order: 1,
                                assessmentId: null,
                              })
                            }
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            Add First Lesson
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {values.lessons.map((lesson, index) => (
                            <div
                              key={lesson.lessonId || index}
                              className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition"
                            >
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    #{index + 1}
                                  </span>
                                  <div>
                                    <span className="text-xs text-gray-500 block">
                                      Lesson ID: {lesson.lessonId?.substring(0, 8)}...
                                    </span>
                                    {lesson.assessmentId && (
                                      <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mt-1">
                                        <svg
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          width="12"
                                          height="12"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                          />
                                        </svg>
                                        Assessment Linked
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  {/* Move Up */}
                                  <button
                                    type="button"
                                    onClick={() => index > 0 && move(index, index - 1)}
                                    disabled={index === 0}
                                    className={`p-2 rounded transition ${
                                      index === 0
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                    }`}
                                    title="Move up"
                                  >
                                    <svg
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      width="16"
                                      height="16"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 15l7-7 7 7"
                                      />
                                    </svg>
                                  </button>
                                  {/* Move Down */}
                                  <button
                                    type="button"
                                    onClick={() =>
                                      index < values.lessons.length - 1 && move(index, index + 1)
                                    }
                                    disabled={index === values.lessons.length - 1}
                                    className={`p-2 rounded transition ${
                                      index === values.lessons.length - 1
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                                    }`}
                                    title="Move down"
                                  >
                                    <svg
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      width="16"
                                      height="16"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                      />
                                    </svg>
                                  </button>
                                  {/* Delete */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      // Prevent deletion of last lesson
                                      if (values.lessons.length === 1) {
                                        alert("⚠️ Cannot delete the last lesson.\n\nA course must have at least one lesson.");
                                        return;
                                      }

                                      const hasAssessment = lesson.assessmentId;
                                      const message = hasAssessment
                                        ? `⚠️ WARNING: This lesson has an assessment linked to it!\n\nLesson: "${lesson.title}"\nAssessment ID: ${lesson.assessmentId}\n\nDeleting this lesson will NOT delete the assessment, but students won't be able to access it from the course.\n\nAre you sure you want to continue?`
                                        : `Are you sure you want to delete lesson "${lesson.title || 'Untitled'}"?\n\nThis action cannot be undone.`;
                                      
                                      if (window.confirm(message)) {
                                        remove(index);
                                      }
                                    }}
                                    disabled={values.lessons.length === 1}
                                    className={`px-3 py-2 rounded transition flex items-center gap-1 ${
                                      values.lessons.length === 1
                                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        : "bg-red-100 text-red-600 hover:bg-red-200"
                                    }`}
                                    title={values.lessons.length === 1 ? "Cannot delete last lesson" : "Delete lesson"}
                                  >
                                    <svg
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      width="16"
                                      height="16"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-700">
                                    Lesson Title *
                                  </label>
                                  <input
                                    type="text"
                                    name={`lessons.${index}.title`}
                                    value={lesson.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Introduction to AI Architecture"
                                  />
                                  {touched.lessons?.[index]?.title &&
                                    errors.lessons?.[index]?.title && (
                                      <div className="text-red-600 text-sm mt-1">
                                        {errors.lessons[index].title}
                                      </div>
                                    )}
                                </div>

                                <div>
                                  <label className="block text-sm font-medium mb-1 text-gray-700">
                                    Video URL *
                                  </label>
                                  <input
                                    type="text"
                                    name={`lessons.${index}.videoURL`}
                                    value={lesson.videoURL}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="https://vimeo.com/... or https://youtube.com/..."
                                  />
                                  {touched.lessons?.[index]?.videoURL &&
                                    errors.lessons?.[index]?.videoURL && (
                                      <div className="text-red-600 text-sm mt-1">
                                        {errors.lessons[index].videoURL}
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <div className="flex gap-3">
                          <svg
                            className="flex-shrink-0 text-blue-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            width="20"
                            height="20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div>
                            <p className="text-sm text-blue-800 font-medium">
                              💡 Pro Tips
                            </p>
                            <ul className="text-sm text-blue-700 mt-2 space-y-1 list-disc list-inside">
                              <li>Lesson order is auto-assigned based on position</li>
                              <li>Use up/down arrows to reorder lessons</li>
                              <li>Add assessments after saving lessons (Admin Dashboard → Assessments)</li>
                              <li>Warning will appear when deleting lessons with assessments</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </FieldArray>
              )}

              {/* Submit Button (shown on both tabs) */}
              <div className="pt-4 border-t">
                {errors.general && (
                  <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
                    {errors.general}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                >
                  {isSubmitting
                    ? "Updating..."
                    : course.approvalStatus === "approved"
                    ? "Update & Re-approve"
                    : "Update & Resubmit"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
