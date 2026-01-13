import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateTrainerCourse } from "../../services/api";

export default function EditCourseModal({ course, onClose, onSuccess }) {
  // URL regex similar to upload form
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
    courseType: Yup.string().required("Course Type is required"),
    startDate: Yup.date().required("Start Date is required").typeError("Start Date is required"),
    endDate: Yup.date()
      .required("End Date is required")
      .typeError("End Date is required")
      .min(Yup.ref("startDate"), "End Date cannot be before Start Date"),
    courseURL: Yup.string()
      .trim()
      .required("Course URL is required")
      .matches(urlRegex, "Please enter a valid URL (example.com, www.example.com, https://example.com)"),
    description: Yup.string()
      .trim()
      .required("Course Description is required")
      .max(10000, "Description must be at most 10000 characters"),
    price: Yup.number().typeError("Price must be a number").required("Price is required").min(0, "Price must be at least 0"),
  });

  // Prepare initial values from course (ensure dates formatted yyyy-mm-dd)
  const initialValues = {
    courseName: course.courseName || "",
    trainerName: course.trainerName || "",
    organisationName: course.organisationName || "",
    mode: course.mode || "",
    courseType: course.courseType || "",
    startDate: course.startDate ? String(course.startDate).slice(0, 10) : "",
    endDate: course.endDate ? String(course.endDate).slice(0, 10) : "",
    courseURL: course.courseURL || "",
    description: course.description || "",
    price: course.price !== undefined ? course.price : "",
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await updateTrainerCourse(course._id, values);
      alert("Course updated and resubmitted for approval!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      const errMsg = err.response?.data?.message || err.message || "Failed to update course";
      alert(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-gray-700">×</button>
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>

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
                const formErrors = await validateForm();
                if (Object.keys(formErrors).length > 0) {
                  // mark all touched to show inline errors
                  const touchedFields = Object.keys(initialValues).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                  }, {});
                  setTouched(touchedFields);
                  const msg = Object.entries(formErrors)
                    .map(([k, v]) => `${k.replace(/([A-Z])/g, " $1")}: ${v}`)
                    .join("\n");
                  alert("Please fix the following errors:\n\n" + msg);
                  return;
                }
                handleSubmit();
              }}
              className="space-y-4"
            >
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
                {touched.courseName && errors.courseName && <div className="text-red-600 text-sm mt-1">{errors.courseName}</div>}
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
                  placeholder="Enter trainer name"
                />
                {touched.trainerName && errors.trainerName && <div className="text-red-600 text-sm mt-1">{errors.trainerName}</div>}
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
                  placeholder="Enter organisation name"
                />
                {touched.organisationName && errors.organisationName && <div className="text-red-600 text-sm mt-1">{errors.organisationName}</div>}
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
                  <option value="">Select mode</option>
                  <option value="Recorded">Recorded</option>
                  <option value="Live Class">Live Class</option>
                  <option value="Onsite">Onsite</option>
                </select>
                {touched.mode && errors.mode && <div className="text-red-600 text-sm mt-1">{errors.mode}</div>}
              </div>

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
                {touched.courseType && errors.courseType && <div className="text-red-600 text-sm mt-1">{errors.courseType}</div>}
              </div>

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
                {touched.startDate && errors.startDate && <div className="text-red-600 text-sm mt-1">{errors.startDate}</div>}
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
                {touched.endDate && errors.endDate && <div className="text-red-600 text-sm mt-1">{errors.endDate}</div>}
              </div>

              <div>
                <label className="block font-medium mb-1">Course URL *</label>
                <input
                  type="text"
                  name="courseURL"
                  value={values.courseURL}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="https://example.com OR www.example.com OR example.com"
                />
                {touched.courseURL && errors.courseURL && <div className="text-red-600 text-sm mt-1">{errors.courseURL}</div>}
              </div>

              <div>
                <label className="block font-medium mb-1">Course Description *</label>
                <textarea
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Enter detailed course description"
                  rows="4"
                  maxLength={10000}
                />
                <div className="flex justify-between items-center">
                  {touched.description && errors.description ? (
                    <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                  ) : (
                    <div />
                  )}
                  <div className="text-gray-400 text-sm mt-1">{values.description.length}/10000</div>
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
                  placeholder="Enter course price"
                  min="0"
                  step="0.01"
                />
                {touched.price && errors.price && <div className="text-red-600 text-sm mt-1">{errors.price}</div>}
              </div>

              <div>
                {/** If you want inline api error, you could keep error state; Formik handles validation errors */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {isSubmitting ? "Updating..." : (course.approvalStatus === "approved" ? "Update & Re-approve" : "Update & Resubmit")}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
