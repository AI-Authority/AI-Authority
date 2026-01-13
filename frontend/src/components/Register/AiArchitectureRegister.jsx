import React, { useState } from "react";
import { submitArchitectMembership } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const LINKEDIN_REGEX = /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/i;

const AIArchitectRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const specializationOptions = [
    "AI Strategy",
    "AI Ethics",
    "Data Governance",
    "Machine Learning",
    "Enterprise AI",
    "Research",
    "Innovation Leadership",
    "Education & Training",
  ];

  const contributionOptions = [
    "Governance",
    "Research guidance",
    "Education",
    "Corporate partnerships",
    "Ethics & policy",
    "Community leadership",
  ];

  const inputStyle =
    "border border-gray-300 px-4 py-3 rounded-xl w-full bg-white text-gray-800 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const floatLabelClass =
    "absolute left-3 -top-3 bg-white px-1 text-xs font-medium text-gray-600";

  // ===== Yup Validation Schema =====
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required."),
    email: Yup.string()
      .email("Please enter a valid Email Address.")
      .required("Email Address is required."),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits.")
      .required("Phone Number is required."),
    country: Yup.string().required("Country is required."),
    currentPosition: Yup.string().required(
      "Current Position / Title is required."
    ),
    organizationName: Yup.string().required("Organization Name is required."),

    linkedinURL: Yup.string()
      .matches(
        LINKEDIN_REGEX,
        "Please enter a valid LinkedIn URL containing linkedin.com."
      )
      .required("LinkedIn URL is required."),
    personalWebsite: Yup.string(),

    yearsExperience: Yup.number()
      .typeError("Years of Experience is required.")
      .min(0, "Years of Experience cannot be negative.")
      .required("Years of Experience is required."),
    shortBio: Yup.string().required(
      "Short Bio is required (150–300 words)."
    ),

    specializations: Yup.array()
      .min(1, "Please select at least one Area of Specialization.")
      .required("Please select at least one Area of Specialization."),

    whyJoin: Yup.string().required(
      "Please explain why you want to join the AIA Architecture Board."
    ),
    contributions: Yup.array()
      .min(1, "Please select at least one way you plan to contribute.")
      .required("Please select at least one way you plan to contribute."),
    contributionText: Yup.string().required(
      "Please explain how you plan to contribute."
    ),
    suggestedInitiative: Yup.string(),

    reference1: Yup.object().shape({
      name: Yup.string().required("Reference 1: Name is required."),
      email: Yup.string()
        .email("Reference 1: Please enter a valid Email Address.")
        .required("Reference 1: Email is required."),
      relationship: Yup.string().required(
        "Reference 1: Relationship is required."
      ),
    }),

    reference2: Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(
        "Reference 2: Please enter a valid Email Address."
      ),
      relationship: Yup.string(),
    }),

    understandsSelective: Yup.boolean().oneOf(
      [true],
      "You must confirm that you understand board membership is selective."
    ),
    agreesToResponsibilities: Yup.boolean().oneOf(
      [true],
      "You must agree to AI-Authority’s board responsibilities and code of conduct."
    ),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required (minimum 6 characters)."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match.")
      .required("Confirm Password is required."),
  });

  // ===== Formik Setup =====
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      currentPosition: "",
      organizationName: "",
      linkedinURL: "",
      personalWebsite: "",

      yearsExperience: "",
      shortBio: "",
      whyJoin: "",
      contributionText: "",
      suggestedInitiative: "",

      specializations: [],
      contributions: [],

      reference1: { name: "", email: "", relationship: "" },
      reference2: { name: "", email: "", relationship: "" },

      understandsSelective: false,
      agreesToResponsibilities: false,

      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,

    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        personalDetails: {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          country: values.country,
          currentPosition: values.currentPosition,
          organizationName: values.organizationName,
          linkedinURL: values.linkedinURL,
          personalWebsite: values.personalWebsite,
        },

        expertise: {
          yearsExperience: values.yearsExperience,
          specializations: values.specializations,
          shortBio: values.shortBio,
        },

        contribution: {
          whyJoin: values.whyJoin,
          contributionTypes: values.contributions,
          contributionText: values.contributionText,
          suggestedInitiative: values.suggestedInitiative,
        },

        references: [values.reference1, values.reference2],

        terms: {
          understandsSelective: values.understandsSelective,
          agreesToResponsibilities: values.agreesToResponsibilities,
        },

        // Include password for backend hashing
        password: values.password,
      };

      try {
        console.log("Submitting AI Architect application:", payload);
        setIsSubmitting(true);
        const response = await submitArchitectMembership(payload);
        console.log("Application submitted successfully:", response);
        alert("Application submitted successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error("Error submitting the form:", error);
        alert(
          `Error: ${
            error?.response?.data?.message ||
            error?.message ||
            "Failed to submit application. Please try again."
          }`
        );
      } finally {
        setIsSubmitting(false);
        setSubmitting(false);
      }
    },
  });

  // ===== Helper: collect all error messages =====
  const collectAllErrorMessages = (errorsObj) => {
    const messages = [];

    const traverse = (val) => {
      if (!val) return;
      if (typeof val === "string") {
        messages.push(val);
      } else if (typeof val === "object") {
        Object.values(val).forEach(traverse);
      }
    };

    traverse(errorsObj);
    return Array.from(new Set(messages));
  };

  // ===== Custom Submit: validate + alert all errors =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      const messages = collectAllErrorMessages(errors);
      alert(messages.join("\n"));
      return;
    }

    // No validation errors → proceed with Formik submit
    formik.handleSubmit();
  };

  // Toggle multi-select arrays via Formik
  const toggleArrayField = (field, item) => {
    const selected = formik.values[field] || [];
    if (selected.includes(item)) {
      formik.setFieldValue(
        field,
        selected.filter((x) => x !== item)
      );
    } else {
      formik.setFieldValue(field, [...selected, item]);
    }
  };

  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
          AI Authority Architecture Board Member – Application
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Apply to join the Architecture Board of the AI Authority.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-16 bg-white p-10 rounded-2xl shadow-md border border-gray-100"
      >
        {/* SECTION A */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Section A: Personal & Professional Details
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative">
              {(focusedField === "fullName" || formik.values.fullName) && (
                <span className={floatLabelClass}>Full Name</span>
              )}
              <input
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => {
                  if (!formik.values.fullName) setFocusedField("");
                }}
                type="text"
                placeholder="Full Name"
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              {(focusedField === "email" || formik.values.email) && (
                <span className={floatLabelClass}>Email Address</span>
              )}
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("email")}
                onBlur={() => {
                  if (!formik.values.email) setFocusedField("");
                }}
                type="email"
                placeholder="Email Address"
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              {(focusedField === "phone" || formik.values.phone) && (
                <span className={floatLabelClass}>Phone Number</span>
              )}
              <input
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => {
                  if (!formik.values.phone) setFocusedField("");
                }}
                type="text"
                placeholder="Phone Number"
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Country */}
            <div className="relative">
              {(focusedField === "country" || formik.values.country) && (
                <span className={floatLabelClass}>Country</span>
              )}
              <input
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("country")}
                onBlur={() => {
                  if (!formik.values.country) setFocusedField("");
                }}
                type="text"
                placeholder="Country"
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Current Position */}
            <div className="relative">
              {(focusedField === "currentPosition" ||
                formik.values.currentPosition) && (
                <span className={floatLabelClass}>
                  Current Position / Title
                </span>
              )}
              <input
                name="currentPosition"
                value={formik.values.currentPosition}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("currentPosition")}
                onBlur={() => {
                  if (!formik.values.currentPosition) setFocusedField("");
                }}
                type="text"
                placeholder="Current Position / Title"
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Organization Name */}
            <div className="relative">
              {(focusedField === "organizationName" ||
                formik.values.organizationName) && (
                <span className={floatLabelClass}>Organization Name</span>
              )}
              <input
                name="organizationName"
                value={formik.values.organizationName}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("organizationName")}
                onBlur={() => {
                  if (!formik.values.organizationName) setFocusedField("");
                }}
                type="text"
                placeholder="Organization Name"
                className={`${inputStyle} pt-5`}
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
                value={formik.values.linkedinURL}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("linkedinURL")}
                onBlur={() => {
                  if (!formik.values.linkedinURL) setFocusedField("");
                }}
                type="text"
                placeholder="LinkedIn URL"
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Personal Website */}
            <div className="relative">
              {(focusedField === "personalWebsite" ||
                formik.values.personalWebsite) && (
                <span className={floatLabelClass}>
                  Personal Website / Portfolio (Optional)
                </span>
              )}
              <input
                name="personalWebsite"
                value={formik.values.personalWebsite}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("personalWebsite")}
                onBlur={() => {
                  if (!formik.values.personalWebsite) setFocusedField("");
                }}
                type="text"
                placeholder="Personal Website / Portfolio (Optional)"
                className={`${inputStyle} pt-5`}
              />
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Section B: Expertise & Background
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6"></div>

          {/* Years of Experience */}
          <div className="relative mb-6">
            {(focusedField === "yearsExperience" ||
              formik.values.yearsExperience) && (
              <span className={floatLabelClass}>
                Years of Experience in AI / Technology
              </span>
            )}
            <input
              name="yearsExperience"
              value={formik.values.yearsExperience}
              onChange={formik.handleChange}
              onFocus={() => setFocusedField("yearsExperience")}
              onBlur={() => {
                if (!formik.values.yearsExperience) setFocusedField("");
              }}
              type="number"
              placeholder="Years of Experience in AI / Technology"
              className={`${inputStyle} pt-5`}
            />
          </div>

          <p className="text-gray-800 font-medium mb-2">
            Areas of Specialization (Multi-select):
          </p>

          <div className="flex flex-wrap gap-3">
            {specializationOptions.map((sp) => (
              <button
                key={sp}
                type="button"
                onClick={() => toggleArrayField("specializations", sp)}
                className={`px-4 py-2 rounded-full text-sm transition-all border ${
                  formik.values.specializations.includes(sp)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {sp}
              </button>
            ))}
          </div>

          {/* Short Bio */}
          <div className="relative mt-6">
            {(focusedField === "shortBio" || formik.values.shortBio) && (
              <span className={floatLabelClass}>Short Bio (150–300 words)</span>
            )}
            <textarea
              name="shortBio"
              value={formik.values.shortBio}
              onChange={formik.handleChange}
              onFocus={() => setFocusedField("shortBio")}
              onBlur={() => {
                if (!formik.values.shortBio) setFocusedField("");
              }}
              rows="5"
              placeholder="Short Bio (150–300 words)"
              className={`${inputStyle} pt-5`}
            ></textarea>
          </div>
        </div>

        {/* SECTION C */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Section C: Board Contribution Statement
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6"></div>

          {/* Why Join */}
          <div className="relative mb-6">
            {(focusedField === "whyJoin" || formik.values.whyJoin) && (
              <span className={floatLabelClass}>
                Why do you want to join the AIA Architecture Board?
              </span>
            )}
            <textarea
              name="whyJoin"
              value={formik.values.whyJoin}
              onChange={formik.handleChange}
              onFocus={() => setFocusedField("whyJoin")}
              onBlur={() => {
                if (!formik.values.whyJoin) setFocusedField("");
              }}
              rows="4"
              placeholder="Why do you want to join the AIA Architecture Board?"
              className={`${inputStyle} pt-5`}
            ></textarea>
          </div>

          <p className="text-gray-800 font-medium mb-2">
            How do you plan to contribute? (Multi-select)
          </p>

          <div className="flex flex-wrap gap-3">
            {contributionOptions.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleArrayField("contributions", c)}
                className={`px-4 py-2 rounded-full text-sm transition-all border ${
                  formik.values.contributions.includes(c)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Contribution Text */}
          <div className="relative mt-6">
            {(focusedField === "contributionText" ||
              formik.values.contributionText) && (
              <span className={floatLabelClass}>
                Explain how you plan to contribute
              </span>
            )}
            <textarea
              name="contributionText"
              value={formik.values.contributionText}
              onChange={formik.handleChange}
              onFocus={() => setFocusedField("contributionText")}
              onBlur={() => {
                if (!formik.values.contributionText) setFocusedField("");
              }}
              rows="3"
              placeholder="Explain how you plan to contribute"
              className={`${inputStyle} pt-5`}
            ></textarea>
          </div>

          {/* Suggested Initiative */}
          <div className="relative mt-6">
            {(focusedField === "suggestedInitiative" ||
              formik.values.suggestedInitiative) && (
              <span className={floatLabelClass}>
                Suggest any initiative you’d like to lead (Optional)
              </span>
            )}
            <textarea
              name="suggestedInitiative"
              value={formik.values.suggestedInitiative}
              onChange={formik.handleChange}
              onFocus={() => setFocusedField("suggestedInitiative")}
              onBlur={() => {
                if (!formik.values.suggestedInitiative) setFocusedField("");
              }}
              rows="3"
              placeholder="Suggest any initiative you’d like to lead (Optional)"
              className={`${inputStyle} pt-5`}
            ></textarea>
          </div>
        </div>

        {/* SECTION D */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Section D: References
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6"></div>

          <h3 className="font-semibold text-gray-900 mb-2">Reference 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Ref1 Name */}
            <div className="relative">
              {(focusedField === "reference1.name" ||
                formik.values.reference1.name) && (
                <span className={floatLabelClass}>Reference Name</span>
              )}
              <input
                type="text"
                name="reference1.name"
                placeholder="Reference Name"
                value={formik.values.reference1.name}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("reference1.name")}
                onBlur={() => {
                  if (!formik.values.reference1.name) setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Ref1 Email */}
            <div className="relative">
              {(focusedField === "reference1.email" ||
                formik.values.reference1.email) && (
                <span className={floatLabelClass}>Email</span>
              )}
              <input
                type="email"
                name="reference1.email"
                placeholder="Email"
                value={formik.values.reference1.email}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("reference1.email")}
                onBlur={() => {
                  if (!formik.values.reference1.email) setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Ref1 Relationship */}
            <div className="relative">
              {(focusedField === "reference1.relationship" ||
                formik.values.reference1.relationship) && (
                <span className={floatLabelClass}>Relationship</span>
              )}
              <input
                type="text"
                name="reference1.relationship"
                placeholder="Relationship"
                value={formik.values.reference1.relationship}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("reference1.relationship")}
                onBlur={() => {
                  if (!formik.values.reference1.relationship)
                    setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
              />
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2">
            Reference 2 (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Ref2 Name */}
            <div className="relative">
              {(focusedField === "reference2.name" ||
                formik.values.reference2.name) && (
                <span className={floatLabelClass}>Reference Name</span>
              )}
              <input
                type="text"
                name="reference2.name"
                placeholder="Reference Name"
                value={formik.values.reference2.name}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("reference2.name")}
                onBlur={() => {
                  if (!formik.values.reference2.name) setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Ref2 Email */}
            <div className="relative">
              {(focusedField === "reference2.email" ||
                formik.values.reference2.email) && (
                <span className={floatLabelClass}>Email</span>
              )}
              <input
                type="email"
                name="reference2.email"
                placeholder="Email"
                value={formik.values.reference2.email}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("reference2.email")}
                onBlur={() => {
                  if (!formik.values.reference2.email) setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
              />
            </div>

            {/* Ref2 Relationship */}
            <div className="relative">
              {(focusedField === "reference2.relationship" ||
                formik.values.reference2.relationship) && (
                <span className={floatLabelClass}>Relationship</span>
              )}
              <input
                type="text"
                name="reference2.relationship"
                placeholder="Relationship"
                value={formik.values.reference2.relationship}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("reference2.relationship")}
                onBlur={() => {
                  if (!formik.values.reference2.relationship)
                    setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
              />
            </div>
          </div>
        </div>

        {/* SECTION E */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Section E: Terms & Declaration
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6"></div>

          <div className="space-y-3 text-gray-700">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="understandsSelective"
                checked={formik.values.understandsSelective}
                onChange={formik.handleChange}
              />{" "}
              I understand that board membership is selective and subject to
              review.
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreesToResponsibilities"
                checked={formik.values.agreesToResponsibilities}
                onChange={formik.handleChange}
              />{" "}
              I agree to AI-Authority’s board responsibilities and code of
              conduct.
            </label>
          </div>
        </div>

        {/* SECTION F — PASSWORD */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Create Login Password
          </h2>
          <div className="h-1 w-20 bg-blue-600 rounded mb-6"></div>

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
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={() => setFocusedField("password")}
                onBlur={() => {
                  if (!formik.values.password) setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
                style={{ paddingRight: "2.5rem" }}
                required
              />
              <span
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  // Eye off (hide)
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
                  // Eye (show)
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
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => {
                  if (!formik.values.confirmPassword) setFocusedField("");
                }}
                className={`${inputStyle} pt-5`}
                style={{ paddingRight: "2.5rem" }}
                required
              />
              <span
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  // Eye off (hide)
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
                  // Eye (show)
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
            disabled={isSubmitting}
            className={`px-12 py-3.5 rounded-full text-white text-lg font-semibold shadow-md 
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIArchitectRegister;
