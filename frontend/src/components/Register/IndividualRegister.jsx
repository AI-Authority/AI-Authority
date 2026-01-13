import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitIndividualMembership } from "../../services/api";
import { useNavigate } from "react-router-dom";

const LINKEDIN_REGEX = /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/i;

const IndividualRegister = () => {
  const navigate = useNavigate();
  const [cvPreview, setCvPreview] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const interestOptions = [
    "AI learning",
    "Research",
    "Career growth",
    "Freelance work",
    "Community participation",
    "Events & networking",
  ];

  const goalKeys = [
    "speakingOpportunities",
    "writingContributions",
    "communityGroups",
    "mentorship",
  ];

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
      .required("Phone Number is required"),
    location: Yup.string().required("Location is required"),
    linkedinURL: Yup.string()
      .matches(
        LINKEDIN_REGEX,
        "Please enter a valid LinkedIn Profile URL (must contain linkedin.com)"
      )
      .required("LinkedIn URL is required"),
    currentRole: Yup.string().required("Current Role / Profession is required"),
    industry: Yup.string().required("Industry is required"),
    yearsExperience: Yup.number()
      .typeError("Years of Experience must be a number")
      .required("Years of Experience is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Areas of Interest is required"),
    expectations: Yup.string().required(
      "Please describe what you want to gain from AI-Authority"
    ),
    membershipGoals: Yup.object()
      .shape({
        speakingOpportunities: Yup.boolean(),
        writingContributions: Yup.boolean(),
        communityGroups: Yup.boolean(),
        mentorship: Yup.boolean(),
      })
      .test(
        "at-least-one-goal",
        "Select at least one option in 'Are you open to'",
        function (values) {
          return (
            values.speakingOpportunities ||
            values.writingContributions ||
            values.communityGroups ||
            values.mentorship
          );
        }
      ),
    termsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required("You must accept the terms"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/membership/upload/individual-cv`,
      { method: "POST", body: fd }
    );

    const data = await res.json();
    return data.url;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedinURL: "",
      currentRole: "",
      industry: "",
      yearsExperience: "",
      interests: [],
      expectations: "",
      membershipGoals: {
        speakingOpportunities: false,
        writingContributions: false,
        communityGroups: false,
        mentorship: false,
      },
      cv: null,
      termsAccepted: false,
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let cvURL = "";
        if (values.cv) {
          cvURL = await uploadToCloudinary(values.cv);
        }

        const payload = {
          password: values.password,
          type: "individual",
          personalInfo: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            location: values.location,
            linkedinURL: values.linkedinURL,
          },
          professionalBackground: {
            currentRole: values.currentRole,
            industry: values.industry,
            yearsExperience: Number(values.yearsExperience),
            areasOfInterest: values.interests,
          },
          membershipGoals: {
            expectations: values.expectations,
            ...values.membershipGoals,
          },
          uploads: { cvURL },
          termsAccepted: values.termsAccepted,
        };

        await submitIndividualMembership(payload);

        alert("Individual membership submitted successfully!");
        navigate("/login");
      } catch (err) {
        console.error("SUBMISSION ERROR:", err);
        
        // Extract the actual error message from the backend response
        let errorMessage = "Unknown error occurred";
        
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        
        alert("Submission failed: " + errorMessage);
      }
      setSubmitting(false);
    },
  });

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

  const inputStyle =
    "border px-4 py-3 rounded-xl w-full bg-white text-gray-800 focus:outline-none focus:ring-2";
  const errorStyle = "border-red-500 ring-red-500";
  const floatLabelClass =
    "absolute left-3 -top-3 bg-white px-1 text-xs font-medium text-gray-600";

  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Individual Membership – Registration
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Join the AI Authority community and grow your professional journey.
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="max-w-4xl mx-auto space-y-16 bg-white p-10 rounded-2xl shadow-md border border-gray-100"
      >
        {/* SECTION A */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Section A: Personal Information
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative">
              {(focusedField === "fullName" || formik.values.fullName) && (
                <span className={floatLabelClass}>Full Name</span>
              )}
              <input
                name="fullName"
                placeholder="Full Name"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.fullName) setFocusedField("");
                }}
                onFocus={() => setFocusedField("fullName")}
                value={formik.values.fullName}
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
                type="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.email) setFocusedField("");
                }}
                onFocus={() => setFocusedField("email")}
                value={formik.values.email}
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
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.phone) setFocusedField("");
                }}
                onFocus={() => setFocusedField("phone")}
                value={formik.values.phone}
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
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.location) setFocusedField("");
                }}
                onFocus={() => setFocusedField("location")}
                value={formik.values.location}
                className={`${inputStyle} pt-5 ${
                  formik.touched.location &&
                  formik.errors.location &&
                  errorStyle
                }`}
              />
            </div>

            {/* LinkedIn URL */}
            <div className="relative">
              {(focusedField === "linkedinURL" ||
                formik.values.linkedinURL) && (
                <span className={floatLabelClass}>LinkedIn URL</span>
              )}
              <input
                name="linkedinURL"
                placeholder="LinkedIn URL"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.linkedinURL) setFocusedField("");
                }}
                onFocus={() => setFocusedField("linkedinURL")}
                value={formik.values.linkedinURL}
                className={`${inputStyle} pt-5 ${
                  formik.touched.linkedinURL &&
                  formik.errors.linkedinURL &&
                  errorStyle
                }`}
              />
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section B: Professional Background
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

          {/* Current Role */}
          <div className="relative">
            {(focusedField === "currentRole" ||
              formik.values.currentRole) && (
              <span className={floatLabelClass}>
                Current Role / Profession
              </span>
            )}
            <input
              name="currentRole"
              placeholder="Current Role / Profession"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.currentRole) setFocusedField("");
              }}
              onFocus={() => setFocusedField("currentRole")}
              value={formik.values.currentRole}
              className={`${inputStyle} pt-5 ${
                formik.touched.currentRole &&
                formik.errors.currentRole &&
                errorStyle
              }`}
            />
          </div>

          {/* Industry */}
          <div className="relative mt-6">
            {(focusedField === "industry" || formik.values.industry) && (
              <span className={floatLabelClass}>Industry</span>
            )}
            <input
              name="industry"
              placeholder="Industry"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.industry) setFocusedField("");
              }}
              onFocus={() => setFocusedField("industry")}
              value={formik.values.industry}
              className={`${inputStyle} pt-5 ${
                formik.touched.industry &&
                formik.errors.industry &&
                errorStyle
              }`}
            />
          </div>

          {/* Years Experience */}
          <div className="relative mt-6">
            {(focusedField === "yearsExperience" ||
              formik.values.yearsExperience) && (
              <span className={floatLabelClass}>Years of Experience</span>
            )}
            <input
              name="yearsExperience"
              type="number"
              placeholder="Years of Experience"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.yearsExperience) setFocusedField("");
              }}
              onFocus={() => setFocusedField("yearsExperience")}
              value={formik.values.yearsExperience}
              className={`${inputStyle} pt-5 ${
                formik.touched.yearsExperience &&
                formik.errors.yearsExperience &&
                errorStyle
              }`}
            />
          </div>

          <p className="mt-6 font-medium">Areas of Interest *</p>

          <div className="flex flex-wrap gap-3 mt-3">
            {interestOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  const selected = formik.values.interests;
                  if (selected.includes(opt)) {
                    formik.setFieldValue(
                      "interests",
                      selected.filter((i) => i !== opt)
                    );
                  } else {
                    formik.setFieldValue("interests", [...selected, opt]);
                  }
                }}
                className={`px-4 py-2 rounded-full border text-sm ${
                  formik.values.interests.includes(opt)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {formik.touched.interests && formik.errors.interests && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.interests}
            </p>
          )}
        </div>

        {/* SECTION C */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section C: Membership Goals</h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

          <div className="relative">
            {(focusedField === "expectations" ||
              formik.values.expectations) && (
              <span className={floatLabelClass}>
                What do you want to gain from AI-Authority?
              </span>
            )}
            <textarea
              name="expectations"
              rows="3"
              placeholder="What do you want to gain from AI-Authority?"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.expectations) setFocusedField("");
              }}
              onFocus={() => setFocusedField("expectations")}
              value={formik.values.expectations}
              className={`${inputStyle} pt-5 ${
                formik.touched.expectations &&
                formik.errors.expectations &&
                errorStyle
              }`}
            />
          </div>

          <p className="mt-4 mb-3 font-medium">Are you open to: *</p>

          <div
            className={`p-4 rounded-xl border ${
              formik.errors.membershipGoals
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            {goalKeys.map((key) => (
              <label key={key} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={formik.values.membershipGoals[key]}
                  onChange={() =>
                    formik.setFieldValue("membershipGoals", {
                      ...formik.values.membershipGoals,
                      [key]: !formik.values.membershipGoals[key],
                    })
                  }
                />
                {key.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>

          {formik.errors.membershipGoals && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.membershipGoals}
            </p>
          )}
        </div>

        {/* SECTION D */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section D: Optional Upload</h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

          <input
            type="file"
            className={inputStyle}
            onChange={(e) => {
              formik.setFieldValue("cv", e.target.files[0]);
              setCvPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {cvPreview && (
            <p className="text-green-600 text-sm mt-1">File selected</p>
          )}
        </div>

        {/* SECTION E */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section E: Declaration</h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formik.values.termsAccepted}
              onChange={formik.handleChange}
              className={
                formik.touched.termsAccepted &&
                formik.errors.termsAccepted &&
                "border-red-500"
              }
            />{" "}
            I agree to AI-Authority Membership Terms.
          </label>

          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.termsAccepted}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Create Login Password</h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="relative">
              {(focusedField === "password" || formik.values.password) && (
                <span className={floatLabelClass}>Create a Password</span>
              )}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a Password"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.password) setFocusedField("");
                }}
                onFocus={() => setFocusedField("password")}
                value={formik.values.password}
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
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.confirmPassword) setFocusedField("");
                }}
                onFocus={() => setFocusedField("confirmPassword")}
                value={formik.values.confirmPassword}
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
            disabled={formik.isSubmitting}
            className={`px-12 py-3.5 rounded-full text-white text-lg font-semibold ${
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

export default IndividualRegister;
