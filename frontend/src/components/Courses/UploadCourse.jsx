import React from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { uploadTrainerCourse, getUserProfile } from "../../services/api";
import { v4 as uuidv4 } from 'uuid';

export default function UploadCourse() {
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

  // URL regex same as your previous one (accepts example.com, www.example.com, https://example.com)
  const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/;

  const validationSchema = Yup.object().shape({
    courseName: Yup.string().trim().required("Course Name is required"),
    startDate: Yup.date().required("Start Date is required").typeError("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .typeError("End Date is required")
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
    trainerName: Yup.string().trim().required("Trainer Name is required"),
    organisationName: Yup.string().trim().required("Organisation Name is required"),
    mode: Yup.string()
      .oneOf(["Recorded", "Live Class", "Onsite"], "Select a valid Mode")
      .required("Mode is required"),
    courseType: Yup.string().required("Course Type is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .min(0, "Price must be at least 0"),
    description: Yup.string()
      .trim()
      .max(5000, "Description must be less than 5000 characters"),
    modules: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().trim().required("Module title is required"),
          lessons: Yup.array()
            .of(
              Yup.object().shape({
                title: Yup.string().trim().required("Lesson title is required"),
                videoURL: Yup.string()
                  .trim()
                  .required("Lesson video URL is required")
                  .matches(urlRegex, "Please enter a valid URL"),
              })
            )
            .min(1, "At least one lesson is required in each module"),
        })
      ),
  }, [['mode', 'modules']]);

  const initialValues = {
    courseName: "",
    startDate: "",
    endDate: "",
    trainerName: "",
    organisationName: "",
    mode: "",
    courseType: "",
    price: "",
    description: "",
    modules: [],
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Get user ID from JWT token
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please log in to upload a course.");
        setSubmitting(false);
        return;
      }

      let trainerId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        trainerId = payload._id || payload.id || payload.userId;
        console.log("Trainer ID from token:", trainerId);
      } catch (err) {
        console.error("Error decoding token:", err);
        alert("Session error. Please log out and log back in.");
        setSubmitting(false);
        return;
      }

      if (!trainerId) {
        alert("Unable to verify trainer ID. Please log out and log back in.");
        setSubmitting(false);
        return;
      }

      // Process modules and lessons
      const processedModules = values.modules.map((module, mIdx) => ({
        moduleId: uuidv4(),
        title: module.title,
        order: mIdx + 1,
        lessons: module.lessons.map((lesson, lIdx) => ({
          lessonId: uuidv4(),
          title: lesson.title,
          videoURL: lesson.videoURL,
          order: lIdx + 1,
          assessmentId: null,
          required: false

        })),
      }));

      const payload = {
        trainerId,
        courseName: values.courseName.trim(),
        startDate: values.startDate,
        endDate: values.endDate,
        trainerName: values.trainerName.trim(),
        organisationName: values.organisationName.trim(),
        mode: values.mode.trim(),
        courseType: values.courseType.trim(),
        description: values.description?.trim() || "No description provided",
        price: Number(values.price),
        modules: processedModules,
      };


      console.log("Submitting course data:", payload);

      await uploadTrainerCourse(payload);

      alert("Course submitted for approval!");
      resetForm();
      window.location.href = "/profile";
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to upload course";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Upload Training Course</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            validateForm,
            setTouched,
          }) => (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                
                // Custom validation: Only require modules for Recorded courses
                if (values.mode === 'Recorded' && values.modules.length === 0) {
                  alert("Please add at least one module for Recorded courses");
                  return;
                }
                
                // Validate first and show alert if missing
                const formErrors = await validateForm();
                console.log('Form Errors:', formErrors);
                console.log('Current Mode:', values.mode);
                console.log('Modules Count:', values.modules.length);
                
                // Filter out modules error if mode is not Recorded
                if (values.mode !== 'Recorded' && formErrors.modules) {
                  delete formErrors.modules;
                }
                
                if (Object.keys(formErrors).length > 0) {
                  // Mark all fields touched so errors show up inline
                  setTouched({
                    courseName: true,
                    startDate: true,
                    endDate: true,
                    trainerName: true,
                    organisationName: true,
                    mode: true,
                    courseType: true,
                    price: true,
                    description: true,

                    modules: values.modules.map((module) => ({
                      title: true,
                      lessons: module.lessons.map(() => ({
                        title: true,
                        videoURL: true,
                      })),
                    })),
                  });

                  // Build friendly alert message
                  const msg = Object.entries(formErrors)
                    .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1")}: ${v}`)
                    .join("\n");
                  alert("Please fix the following errors:\n\n" + msg);
                  return;
                }
                // If no errors, submit
                handleSubmit();
              }}
              className="space-y-5"
            >
              {/* Course Name */}
              <div>
                <label className="block font-medium mb-1">Course Name *</label>
                <input
                  type="text"
                  name="courseName"
                  value={values.courseName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter course title"
                />
                {touched.courseName && errors.courseName && (
                  <div className="text-red-600 text-sm mt-1">{errors.courseName}</div>
                )}
              </div>

              {/* Start Date */}
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

              {/* End Date */}
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

              {/* Trainer Name */}
              <div>
                <label className="block font-medium mb-1">Trainer Name *</label>
                <input
                  type="text"
                  name="trainerName"
                  value={values.trainerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter trainer name"
                />
                {touched.trainerName && errors.trainerName && (
                  <div className="text-red-600 text-sm mt-1">{errors.trainerName}</div>
                )}
              </div>

              {/* Organisation Name */}
              <div>
                <label className="block font-medium mb-1">Organisation Name *</label>
                <input
                  type="text"
                  name="organisationName"
                  value={values.organisationName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter organisation name"
                />
                {touched.organisationName && errors.organisationName && (
                  <div className="text-red-600 text-sm mt-1">{errors.organisationName}</div>
                )}
              </div>

              {/* Mode */}
              <div>
                <label className="block font-medium mb-1">Mode *</label>
                <select
                  name="mode"
                  value={values.mode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select mode</option>
                  <option value="Recorded">Recorded</option>
                  <option value="Live Class">Live Class</option>
                  <option value="Onsite">Onsite</option>
                </select>
                {touched.mode && errors.mode && (
                  <div className="text-red-600 text-sm mt-1">{errors.mode}</div>
                )}
              </div>

              {/* Course Type */}
              <div>
                <label className="block font-medium mb-1">Type of Training *</label>
                <select
                  name="courseType"
                  value={values.courseType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select training type</option>
                  {courseTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {touched.courseType && errors.courseType && (
                  <div className="text-red-600 text-sm mt-1">{errors.courseType}</div>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block font-medium mb-1">Price (USD) *</label>
                <input
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter course price"
                  min="0"
                  step="0.01"
                />
                {touched.price && errors.price && (
                  <div className="text-red-600 text-sm mt-1">{errors.price}</div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">Course Description (Optional)</label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Describe what students will learn in this course..."
                  rows="4"
                />
                {touched.description && errors.description && (
                  <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                )}
              </div>


              {/* Course Modules Section */}
              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Course Modules *</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Add at least one module. Each module can have multiple lessons (each with a title and video URL).
                </p>

                <FieldArray name="modules">
                  {({ push: pushModule, remove: removeModule }) => (
                    <div className="space-y-6">
                      {values.modules.length === 0 ? (
                        <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed">
                          <p className="text-gray-500 mb-3">No modules added yet</p>
                          <button
                            type="button"
                            onClick={() => pushModule({ title: "", lessons: [] })}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            + Add First Module
                          </button>
                        </div>
                      ) : (
                        <>
                          {values.modules.map((module, mIdx) => (
                            <div key={mIdx} className="border rounded-lg p-4 bg-gray-50">
                              <div className="flex justify-between items-center mb-3">
                                <span className="font-semibold text-gray-700">Module {mIdx + 1}</span>
                                <button
                                  type="button"
                                  onClick={() => removeModule(mIdx)}
                                  className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-sm"
                                >
                                  Delete Module
                                </button>
                              </div>

                              <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Module Title *</label>
                                <input
                                  type="text"
                                  name={`modules.${mIdx}.title`}
                                  value={module.title}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className="w-full p-2 border rounded-lg"
                                  placeholder="e.g., Introduction to AI"
                                />
                                {touched.modules?.[mIdx]?.title && errors.modules?.[mIdx]?.title && (
                                  <div className="text-red-600 text-sm mt-1">{errors.modules[mIdx].title}</div>
                                )}
                              </div>

                              {/* Lessons for this module */}
                              <FieldArray name={`modules.${mIdx}.lessons`}>
                                {({ push: pushLesson, remove: removeLesson }) => (
                                  <div className="space-y-4">
                                    {module.lessons.length === 0 ? (
                                      <div className="text-center py-4 bg-gray-100 rounded-lg border-2 border-dashed">
                                        <p className="text-gray-500 mb-2">No lessons in this module yet</p>
                                        <button
                                          type="button"
                                          onClick={() => pushLesson({ title: "", videoURL: "" })}
                                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                        >
                                          + Add First Lesson
                                        </button>
                                      </div>
                                    ) : (
                                      <>
                                        {module.lessons.map((lesson, lIdx) => (
                                          <div key={lIdx} className="border rounded-lg p-3 bg-white">
                                            <div className="flex justify-between items-center mb-2">
                                              <span className="font-semibold text-gray-700">Lesson {lIdx + 1}</span>
                                              <button
                                                type="button"
                                                onClick={() => removeLesson(lIdx)}
                                                className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition text-xs"
                                              >
                                                Delete Lesson
                                              </button>
                                            </div>
                                            <div className="space-y-2">
                                              <div>
                                                <label className="block text-xs font-medium mb-1">Lesson Title *</label>
                                                <input
                                                  type="text"
                                                  name={`modules.${mIdx}.lessons.${lIdx}.title`}
                                                  value={lesson.title}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  className="w-full p-2 border rounded-lg"
                                                  placeholder="e.g., What is AI?"
                                                />
                                                {touched.modules?.[mIdx]?.lessons?.[lIdx]?.title && errors.modules?.[mIdx]?.lessons?.[lIdx]?.title && (
                                                  <div className="text-red-600 text-xs mt-1">{errors.modules[mIdx].lessons[lIdx].title}</div>
                                                )}
                                              </div>
                                              <div>
                                                <label className="block text-xs font-medium mb-1">Lesson Video URL *</label>
                                                <input
                                                  type="text"
                                                  name={`modules.${mIdx}.lessons.${lIdx}.videoURL`}
                                                  value={lesson.videoURL}
                                                  onChange={handleChange}
                                                  onBlur={handleBlur}
                                                  className="w-full p-2 border rounded-lg"
                                                  placeholder="https://vimeo.com/... or https://youtube.com/..."
                                                />
                                                {touched.modules?.[mIdx]?.lessons?.[lIdx]?.videoURL && errors.modules?.[mIdx]?.lessons?.[lIdx]?.videoURL && (
                                                  <div className="text-red-600 text-xs mt-1">{errors.modules[mIdx].lessons[lIdx].videoURL}</div>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => pushLesson({ title: "", videoURL: "" })}
                                          className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                        >
                                          + Add Another Lesson
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </FieldArray>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => pushModule({ title: "", lessons: [] })}
                            className="w-full py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition mt-2"
                          >
                            + Add Another Module
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </FieldArray>
                {touched.modules && errors.modules && typeof errors.modules === 'string' && (
                  <div className="text-red-600 text-sm mt-2">{errors.modules}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              >
                {isSubmitting ? "Submitting..." : "Submit Course"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
