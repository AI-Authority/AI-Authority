import React, { useState } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { updateTrainerCourse } from "../../services/api";
import { v4 as uuidv4 } from 'uuid';

export default function EditCourseModal({ course, onClose, onSuccess }) {
  const [activeTab, setActiveTab] = useState("details"); // "details" or "modules"
  
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
    modules: Yup.array()
      .of(
        Yup.object().shape({
          moduleId: Yup.string().required(),
          title: Yup.string().trim().required("Module title is required"),
          order: Yup.number().required().min(1),
          lessons: Yup.array()
            .of(
              Yup.object().shape({
                lessonId: Yup.string().required(),
                title: Yup.string().trim().required("Lesson title is required"),
                videoURL: Yup.string()
                  .trim()
                  .required("Video URL is required")
                  .matches(urlRegex, "Enter a valid video URL"),
                order: Yup.number().required().min(1),
              })
            )
            .min(1, "Each module must have at least one lesson"),
        })
      )
      .min(1, "At least one module is required"),
  });

  const handleUpdate = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Ensure modules and lessons have unique orders and IDs
      const processedModules = values.modules.map((module, mIdx) => ({
        ...module,
        order: mIdx + 1,
        moduleId: module.moduleId || uuidv4(),
        lessons: module.lessons.map((lesson, lIdx) => ({
          ...lesson,
          order: lIdx + 1,
          lessonId: lesson.lessonId || uuidv4()
        }))
      }));

      const updatedData = {
        ...values,
        modules: processedModules
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

  // Initial values with modules array
  // Migrate from old lesson structure if needed
  const migrateToModules = () => {
    // If course already has modules, return them
    if (course.modules && course.modules.length > 0) {
      return course.modules;
    }
    
    // If course has old lessons array, migrate it to a single module
    if (course.lessons && course.lessons.length > 0) {
      return [{
        moduleId: uuidv4(),
        title: "Main Module",
        order: 1,
        lessons: course.lessons
      }];
    }
    
    // If course only has courseURL, create a module with one lesson
    if (course.courseURL) {
      return [{
        moduleId: uuidv4(),
        title: "Main Module",
        order: 1,
        lessons: [{
          lessonId: uuidv4(),
          title: "Main Course Video",
          videoURL: course.courseURL,
          order: 1,
          assessmentId: null
        }]
      }];
    }
    
    // Default: empty module with one empty lesson
    return [{
      moduleId: uuidv4(),
      title: "",
      order: 1,
      lessons: [{
        lessonId: uuidv4(),
        title: "",
        videoURL: "",
        order: 1,
        assessmentId: null
      }]
    }];
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
    modules: migrateToModules()
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
            ×
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              {/* Tab Navigation */}
              <div className="border-b px-6">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-3 font-medium border-b-2 transition ${
                      activeTab === "details"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Course Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("modules")}
                    className={`px-4 py-3 font-medium border-b-2 transition ${
                      activeTab === "modules"
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Modules & Lessons ({initialValues.modules.length})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Details Tab */}
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

                    <div className="grid grid-cols-2 gap-4">
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
                          <option value="">Select Type</option>
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
                      <label className="block font-medium mb-1">Description</label>
                      <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        className="w-full p-3 border rounded-lg"
                        placeholder="Describe your course..."
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

                {/* Modules Tab */}
                {activeTab === "modules" && (
                  <FieldArray name="modules">
                    {({ push: pushModule, remove: removeModule }) => (
                      <div className="space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold">Course Modules ({values.modules.length})</h3>
                            <p className="text-sm text-gray-600">Organize your course into modules with lessons</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => pushModule({
                              moduleId: uuidv4(),
                              title: "",
                              order: values.modules.length + 1,
                              lessons: [{
                                lessonId: uuidv4(),
                                title: "",
                                videoURL: "",
                                order: 1,
                                assessmentId: null
                              }]
                            })}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                          >
                            + Add Module
                          </button>
                        </div>

                        {/* Modules List */}
                        {values.modules.map((module, mIdx) => (
                          <div key={module.moduleId || mIdx} className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                            {/* Module Header */}
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    Module {mIdx + 1}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {module.lessons?.length || 0} lesson(s)
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  name={`modules.${mIdx}.title`}
                                  value={module.title}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="Module title (e.g., Introduction to AI)"
                                  className="w-full p-2 border rounded-lg font-medium"
                                />
                                {touched.modules?.[mIdx]?.title && errors.modules?.[mIdx]?.title && (
                                  <div className="text-red-600 text-xs mt-1">{errors.modules[mIdx].title}</div>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  if (values.modules.length === 1) {
                                    alert("Cannot delete the last module");
                                    return;
                                  }
                                  if (window.confirm(`Delete module "${module.title || 'Untitled'}"?`)) {
                                    removeModule(mIdx);
                                  }
                                }}
                                className="ml-4 px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                              >
                                Delete Module
                              </button>
                            </div>

                            {/* Lessons in Module */}
                            <FieldArray name={`modules.${mIdx}.lessons`}>
                              {({ push: pushLesson, remove: removeLesson }) => (
                                <div className="ml-4 space-y-3">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-gray-700">Lessons</h4>
                                    <button
                                      type="button"
                                      onClick={() => pushLesson({
                                        lessonId: uuidv4(),
                                        title: "",
                                        videoURL: "",
                                        order: module.lessons.length + 1,
                                        assessmentId: null
                                      })}
                                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                                    >
                                      + Add Lesson
                                    </button>
                                  </div>

                                  {module.lessons && module.lessons.map((lesson, lIdx) => (
                                    <div key={lesson.lessonId || lIdx} className="border rounded-lg p-3 bg-white">
                                      <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-medium text-gray-600">Lesson {lIdx + 1}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            if (module.lessons.length === 1) {
                                              alert("Each module must have at least one lesson");
                                              return;
                                            }
                                            if (window.confirm(`Delete lesson "${lesson.title || 'Untitled'}"?`)) {
                                              removeLesson(lIdx);
                                            }
                                          }}
                                          className="text-red-600 text-sm hover:underline"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                      <div className="space-y-2">
                                        <div>
                                          <input
                                            type="text"
                                            name={`modules.${mIdx}.lessons.${lIdx}.title`}
                                            value={lesson.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Lesson title"
                                            className="w-full p-2 border rounded text-sm"
                                          />
                                          {touched.modules?.[mIdx]?.lessons?.[lIdx]?.title && errors.modules?.[mIdx]?.lessons?.[lIdx]?.title && (
                                            <div className="text-red-600 text-xs mt-1">{errors.modules[mIdx].lessons[lIdx].title}</div>
                                          )}
                                        </div>
                                        <div>
                                          <input
                                            type="text"
                                            name={`modules.${mIdx}.lessons.${lIdx}.videoURL`}
                                            value={lesson.videoURL}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Video URL"
                                            className="w-full p-2 border rounded text-sm"
                                          />
                                          {touched.modules?.[mIdx]?.lessons?.[lIdx]?.videoURL && errors.modules?.[mIdx]?.lessons?.[lIdx]?.videoURL && (
                                            <div className="text-red-600 text-xs mt-1">{errors.modules[mIdx].lessons[lIdx].videoURL}</div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                )}

                {/* Submit Button */}
                <div className="pt-4 border-t mt-6">
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
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
