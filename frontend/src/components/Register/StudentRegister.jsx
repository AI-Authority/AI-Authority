import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitStudentMembership } from "../../services/api";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const navigate = useNavigate();

  const skillOptions = [
    "AI basics",
    "ML",
    "Python",
    "GenAI",
    "Data analytics",
    "AI tools",
  ];

  const lookingForOptions = [
    "Internships",
    "Mentorship",
    "Training",
    "Projects",
  ];

  const [resumePreview, setResumePreview] = useState(null);
  const [studentIdPreview, setStudentIdPreview] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Yup Validation Schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
          .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits.")
          .required("Phone Number is required."),
    location: Yup.string().required("Required"),
    age: Yup.number().required("Required"),
    studentId: Yup.string(),

    institution: Yup.string().required("Required"),
    course: Yup.string().required("Required"),
    fieldOfStudy: Yup.string().required("Required"),
    currentYearOrSemester: Yup.string().required("Required"),
    graduationYear: Yup.number().required("Required"),

    interestInAI: Yup.string().required("Required"),

    skills: Yup.array().min(1, "Select at least one skill").required("Required"),

    lookingFor: Yup.array()
      .min(1, "Select at least one option")
      .required("Required"),

    resume: Yup.mixed().required("Resume required"),
    studentIdFile: Yup.mixed().required("Student ID required"),

    terms: Yup.boolean()
      .oneOf([true], "You must confirm you are a student")
      .required("Required"),

    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      age: "",
      studentId: "",

      institution: "",
      course: "",
      fieldOfStudy: "",
      currentYearOrSemester: "",
      graduationYear: "",

      interestInAI: "",
      skills: [],
      lookingFor: [],

      resume: null,
      studentIdFile: null,

      terms: false,
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        const uploadToCloudinary = async (file, route) => {
          const fd = new FormData();
          fd.append("file", file);

          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/api/membership/upload/${route}`,
            { method: "POST", body: fd }
          );
          const data = await res.json();
          return data.url;
        };

        const resumeURL = await uploadToCloudinary(
          values.resume,
          "student-resume"
        );
        const studentIdURL = await uploadToCloudinary(
          values.studentIdFile,
          "student-id"
        );

        const payload = {
          password: values.password,

          studentInfo: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            location: values.location,
            age: Number(values.age),
            studentId: values.studentId,
          },

          academicDetails: {
            institution: values.institution,
            course: values.course,
            fieldOfStudy: values.fieldOfStudy,
            currentYearOrSemester: values.currentYearOrSemester,
            graduationYear: Number(values.graduationYear),
          },

          aspirations: {
            interestInAI: values.interestInAI,
            skillsToBuild: values.skills,
            lookingFor: values.lookingFor,
          },

          uploads: {
            resumeURL,
            studentIdURL,
          },

          termsAccepted: values.terms,
        };

        await submitStudentMembership(payload);
        alert("Student membership submitted successfully!");
        navigate("/login");
      } catch (error) {
        console.error("SUBMISSION ERROR:", error);
        
        // Extract the actual error message from the backend response
        let errorMessage = "Unknown error occurred";
        
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        alert("Submission failed: " + errorMessage);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputStyle =
    "border px-4 py-3 rounded-xl w-full bg-white text-gray-800 focus:outline-none focus:ring-2";
  const errorStyle = "border-red-500 ring-red-500";
  const floatLabelClass =
    "absolute left-3 -top-3 bg-white px-1 text-xs font-medium text-gray-600";

  // Helper: collect ALL error messages
  const collectAllErrorMessages = (errorsObj) => {
    const messages = [];
    const traverse = (val) => {
      if (!val) return;
      if (typeof val === "string") messages.push(val);
      else if (typeof val === "object") Object.values(val).forEach(traverse);
    };
    traverse(errorsObj);
    return Array.from(new Set(messages));
  };

  // Custom submit handler to show ALL errors in alert
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      const messages = collectAllErrorMessages(errors);
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {}),
        true
      );
      alert(messages.join("\n"));
      return;
    }

    formik.handleSubmit();
  };

  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Student Membership – Registration
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Complete the form below to apply for Student Membership.
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="max-w-4xl mx-auto space-y-16 bg-white p-10 rounded-2xl shadow-md border"
      >
        {/* SECTION A */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section A: Student Information
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative">
              {(focusedField === "fullName" || formik.values.fullName) && (
                <span className={floatLabelClass}>Full Name</span>
              )}
              <input
                name="fullName"
                placeholder="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.fullName) setFocusedField("");
                }}
                onFocus={() => setFocusedField("fullName")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.fullName &&
                  formik.errors.fullName &&
                  errorStyle
                }`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              {(focusedField === "email" || formik.values.email) && (
                <span className={floatLabelClass}>Email Address</span>
              )}
              <input
                name="email"
                placeholder="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.email) setFocusedField("");
                }}
                onFocus={() => setFocusedField("email")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.email && formik.errors.email && errorStyle
                }`}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              {(focusedField === "phone" || formik.values.phone) && (
                <span className={floatLabelClass}>Phone Number</span>
              )}
              <input
                name="phone"
                placeholder="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.phone) setFocusedField("");
                }}
                onFocus={() => setFocusedField("phone")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.phone && formik.errors.phone && errorStyle
                }`}
              />
            </div>

            {/* Location */}
            <div className="relative">
              {(focusedField === "location" || formik.values.location) && (
                <span className={floatLabelClass}>Country / City</span>
              )}
              <input
                name="location"
                placeholder="Country / City"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.location) setFocusedField("");
                }}
                onFocus={() => setFocusedField("location")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.location &&
                  formik.errors.location &&
                  errorStyle
                }`}
              />
            </div>

            {/* Age */}
            <div className="relative">
              {(focusedField === "age" || formik.values.age) && (
                <span className={floatLabelClass}>Age</span>
              )}
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.age) setFocusedField("");
                }}
                onFocus={() => setFocusedField("age")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.age && formik.errors.age && errorStyle
                }`}
              />
            </div>

            {/* Student ID */}
            <div className="relative">
              {(focusedField === "studentId" || formik.values.studentId) && (
                <span className={floatLabelClass}>Student ID (Optional)</span>
              )}
              <input
                name="studentId"
                placeholder="Student ID (Optional)"
                value={formik.values.studentId}
                onChange={formik.handleChange}
                onBlur={() => {
                  if (!formik.values.studentId) setFocusedField("");
                }}
                onFocus={() => setFocusedField("studentId")}
                className={`${inputStyle} pt-5`}
              />
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section B: Academic Details</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institution */}
            <div className="relative">
              {(focusedField === "institution" ||
                formik.values.institution) && (
                <span className={floatLabelClass}>
                  Institution / University Name
                </span>
              )}
              <input
                name="institution"
                placeholder="Institution / University Name"
                value={formik.values.institution}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.institution) setFocusedField("");
                }}
                onFocus={() => setFocusedField("institution")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.institution &&
                  formik.errors.institution &&
                  errorStyle
                }`}
              />
            </div>

            {/* Course */}
            <div className="relative">
              {(focusedField === "course" || formik.values.course) && (
                <span className={floatLabelClass}>Course / Degree</span>
              )}
              <input
                name="course"
                placeholder="Course / Degree"
                value={formik.values.course}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.course) setFocusedField("");
                }}
                onFocus={() => setFocusedField("course")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.course && formik.errors.course && errorStyle
                }`}
              />
            </div>

            {/* Field of Study */}
            <div className="relative">
              {(focusedField === "fieldOfStudy" ||
                formik.values.fieldOfStudy) && (
                <span className={floatLabelClass}>Field of Study</span>
              )}
              <input
                name="fieldOfStudy"
                placeholder="Field of Study"
                value={formik.values.fieldOfStudy}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.fieldOfStudy) setFocusedField("");
                }}
                onFocus={() => setFocusedField("fieldOfStudy")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.fieldOfStudy &&
                  formik.errors.fieldOfStudy &&
                  errorStyle
                }`}
              />
            </div>

            {/* Year / Semester */}
            <div className="relative">
              {(focusedField === "currentYearOrSemester" ||
                formik.values.currentYearOrSemester) && (
                <span className={floatLabelClass}>
                  Current Year / Semester
                </span>
              )}
              <input
                name="currentYearOrSemester"
                placeholder="Current Year / Semester"
                value={formik.values.currentYearOrSemester}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.currentYearOrSemester)
                    setFocusedField("");
                }}
                onFocus={() => setFocusedField("currentYearOrSemester")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.currentYearOrSemester &&
                  formik.errors.currentYearOrSemester &&
                  errorStyle
                }`}
              />
            </div>

            {/* Graduation Year */}
            <div className="relative">
              {(focusedField === "graduationYear" ||
                formik.values.graduationYear) && (
                <span className={floatLabelClass}>Graduation Year</span>
              )}
              <input
                name="graduationYear"
                type="number"
                placeholder="Graduation Year"
                value={formik.values.graduationYear}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.graduationYear) setFocusedField("");
                }}
                onFocus={() => setFocusedField("graduationYear")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.graduationYear &&
                  formik.errors.graduationYear &&
                  errorStyle
                }`}
              />
            </div>
          </div>
        </div>

        {/* SECTION C */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section C: AI Aspirations</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          {/* Interest in AI */}
          <div className="relative">
            {(focusedField === "interestInAI" ||
              formik.values.interestInAI) && (
              <span className={floatLabelClass}>
                What interests you most in AI?
              </span>
            )}
            <textarea
              name="interestInAI"
              placeholder="What interests you most in AI?"
              value={formik.values.interestInAI}
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.interestInAI) setFocusedField("");
              }}
              onFocus={() => setFocusedField("interestInAI")}
              className={`${inputStyle} pt-5 ${
                formik.touched.interestInAI &&
                formik.errors.interestInAI &&
                errorStyle
              }`}
              rows="3"
            />
          </div>

          {/* Skills */}
          <p className="font-medium mt-4 mb-2">Skills you want to build:</p>

          <div className="flex flex-wrap gap-3">
            {skillOptions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => {
                  const selected = formik.values.skills;
                  if (selected.includes(skill)) {
                    formik.setFieldValue(
                      "skills",
                      selected.filter((s) => s !== skill)
                    );
                  } else {
                    formik.setFieldValue("skills", [...selected, skill]);
                  }
                }}
                className={`px-4 py-2 rounded-full border text-sm ${
                  formik.values.skills.includes(skill)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
          {formik.touched.skills && formik.errors.skills && (
            <p className="text-red-600 text-sm">{formik.errors.skills}</p>
          )}

          {/* Looking for */}
          <p className="font-medium mt-6 mb-2">Are you looking for:</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            {lookingForOptions.map((item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formik.values.lookingFor.includes(item)}
                  onChange={() => {
                    const selected = formik.values.lookingFor;
                    if (selected.includes(item)) {
                      formik.setFieldValue(
                        "lookingFor",
                        selected.filter((i) => i !== item)
                      );
                    } else {
                      formik.setFieldValue("lookingFor", [
                        ...selected,
                        item,
                      ]);
                    }
                  }}
                />
                {item}
              </label>
            ))}
          </div>
          {formik.touched.lookingFor && formik.errors.lookingFor && (
            <p className="text-red-600 text-sm">{formik.errors.lookingFor}</p>
          )}
        </div>

        {/* SECTION D */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section D: Uploads</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          {/* Resume */}
          <p className="font-medium">Resume *</p>
          <input
            type="file"
            onChange={(e) => {
              formik.setFieldValue("resume", e.target.files[0]);
              setResumePreview(URL.createObjectURL(e.target.files[0]));
            }}
            className={`${inputStyle} ${
              formik.touched.resume && formik.errors.resume ? errorStyle : ""
            }`}
          />
          {resumePreview && (
            <p className="text-green-600 text-sm mt-1">File selected</p>
          )}

          {/* Student ID */}
          <p className="font-medium mt-4">Student ID / Confirmation *</p>
          <input
            type="file"
            onChange={(e) => {
              formik.setFieldValue("studentIdFile", e.target.files[0]);
              setStudentIdPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className={`${inputStyle} ${
              formik.touched.studentIdFile && formik.errors.studentIdFile
                ? errorStyle
                : ""
            }`}
          />
          {studentIdPreview && (
            <p className="text-green-600 text-sm mt-1">File selected</p>
          )}
        </div>

        {/* SECTION E */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section E: Terms</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              checked={formik.values.terms}
              onChange={formik.handleChange}
            />
            I confirm I am a student and eligible for this membership.
          </label>

          {formik.touched.terms && formik.errors.terms && (
            <p className="text-red-600 text-sm">{formik.errors.terms}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Create Login Password</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="relative">
              {(focusedField === "password" ||
                formik.values.password) && (
                <span className={floatLabelClass}>Create a Password</span>
              )}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.password) setFocusedField("");
                }}
                onFocus={() => setFocusedField("password")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.password &&
                  formik.errors.password &&
                  errorStyle
                }`}
                style={{ paddingRight: "2.5rem" }}
              />
              <span
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  // Eye off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-5.52 0-10-7-10-7a19.79 19.79 0 014.23-4.62" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  // Eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4.48-7 11-7 11 7 11 7-4.48 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              {(focusedField === "confirmPassword" ||
                formik.values.confirmPassword) && (
                <span className={floatLabelClass}>Confirm Password</span>
              )}
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.confirmPassword) setFocusedField("");
                }}
                onFocus={() => setFocusedField("confirmPassword")}
                className={`${inputStyle} pt-5 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  errorStyle
                }`}
                style={{ paddingRight: "2.5rem" }}
              />
              <span
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-500"
                onClick={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
              >
                {showConfirmPassword ? (
                  // Eye off
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-5.52 0-10-7-10-7a19.79 19.79 0 014.23-4.62" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  // Eye
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4.48-7 11-7 11 7 11 7-4.48 7-11 7S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            className={`px-12 py-3.5 rounded-full text-white text-lg font-semibold 
              ${
                formik.isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {formik.isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentRegister;
