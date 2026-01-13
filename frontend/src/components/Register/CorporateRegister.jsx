import React, { useState } from "react";
import { submitCorporateMembership } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const LINKEDIN_REGEX = /^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.*$/i;

const CorporateRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [collaborations, setCollaborations] = useState([]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyDeck, setCompanyDeck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const validationSchema = Yup.object({
    companyName: Yup.string().required("Company Name is required."),
    website: Yup.string()
      .matches(
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i,
        "Please enter a valid Website URL."
      )
      .required("Website URL is required."),

    industry: Yup.string().required("Industry / Sector is required."),
    companySize: Yup.string().required("Company Size is required."),
    hqLocation: Yup.string().required("Headquarters Location is required."),
    additionalOffices: Yup.string(),

    contactName: Yup.string().required("Full Name is required."),
    contactTitle: Yup.string().required("Job Title / Designation is required."),
    contactEmail: Yup.string()
      .email("Please enter a valid Email Address.")
      .required("Email Address is required."),
    contactPhone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits.")
      .required("Phone Number is required."),
    contactLinkedIn: Yup.string().test(
      "is-valid-linkedin",
      "Please enter a valid LinkedIn Profile URL.",
      (value) => {
        if (!value) return true; // optional
        return LINKEDIN_REGEX.test(value.trim());
      }
    ),

    aiGoals: Yup.string().required(
      "Please describe your AI goals for the next 12 months."
    ),
    speakingOpportunity: Yup.string().required(
      "Please select if you are interested in speaking opportunities."
    ),

    referralSource: Yup.string().required("Please select a referral source."),
    terms1: Yup.boolean().oneOf(
      [true],
      "You must confirm that the above details are accurate."
    ),
    terms2: Yup.boolean().oneOf(
      [true],
      "You must agree to the AI-Authority Membership Terms & Policies."
    ),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Confirm Password is required."),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      website: "",
      industry: "",
      companySize: "",
      hqLocation: "",
      additionalOffices: "",

      contactName: "",
      contactTitle: "",
      contactEmail: "",
      contactPhone: "",
      contactLinkedIn: "",

      aiGoals: "",
      speakingOpportunity: "",

      referralSource: "",
      terms1: false,
      terms2: false,

      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: () => { }, // handled manually
  });

  const toggleCollab = (item) => {
    setCollaborations((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const uploadToCloudinary = async (file, route) => {
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/membership/upload/${route}`,
      {
        method: "POST",
        body: fd,
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData?.message || "File upload failed. Please try again."
      );
    }

    const data = await res.json();
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Run Yup validation via Formik
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      const firstErrorMessage = Object.values(errors)[0];
      alert(firstErrorMessage);
      setLoading(false);
      return;
    }

    const values = formik.values;

    // Collaboration must be selected
    if (collaborations.length === 0) {
      alert("Please select at least one collaboration type.");
      setLoading(false);
      return;
    }

    // Company logo required
    if (!companyLogo) {
      alert("Company Logo is required.");
      setLoading(false);
      return;
    }

    try {
      let companyLogoURL = "";
      let companyDeckURL = "";

      if (companyLogo) {
        companyLogoURL = await uploadToCloudinary(companyLogo, "company-logo");
      }

      if (companyDeck) {
        companyDeckURL = await uploadToCloudinary(companyDeck, "corporate-deck");
      }

      const payload = {
        password: values.password,

        companyName: values.companyName,
        websiteURL: values.website,
        industry: values.industry,
        companySize: values.companySize,
        headquartersLocation: values.hqLocation,
        additionalOffices: values.additionalOffices,

        contactPerson: {
          fullName: values.contactName,
          jobTitle: values.contactTitle,
          email: values.contactEmail,
          phone: values.contactPhone,
          linkedin: values.contactLinkedIn,
        },

        objectives: {
          aiGoals12Months: values.aiGoals,
          collaborationTypes: collaborations,
          speakingOpportunity: values.speakingOpportunity,
        },

        uploads: {
          companyLogoURL,
          pitchDeckURL: companyDeckURL,
        },

        termsAccepted: values.terms1,
        policiesAccepted: values.terms2,

        referralSource: values.referralSource,
      };

      await submitCorporateMembership(payload);

      alert("Corporate membership submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("AXIOS ERROR:", error);
      console.error("BACKEND RESPONSE:", error?.response?.data);
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Submission failed!";
      alert(backendMessage);
    }

    setLoading(false);
  };

  const inputStyle =
    "border border-gray-300 px-4 py-3 rounded-xl w-full bg-white text-gray-800 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  const floatLabelClass =
    "absolute left-3 -top-3 bg-white px-1 text-xs font-medium text-gray-600";

  const collabOptions = [
    "Networking",
    "Talent acquisition",
    "AI solution Development",
    "AI training",
    "Partnerships",
    "Thought leadership",
    "Research & insights",
  ];

  const referralOptions = [
    "LinkedIn",
    "Referral from client/partner",
    "Industry event/conference",
    "AI Authority website",
    "Online search",
    "Social media",
    "News/media coverage",
    "Other",
  ];

  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Corporate Membership – Registration
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Complete the form below to apply for Corporate Membership.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto space-y-16 bg-white p-10 rounded-2xl shadow-md border border-gray-100"
      >
        {/* SECTION A */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section A: Company Information
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
            {/* Company Name */}
            <div className="relative">
              {(focusedField === "companyName" ||
                formik.values.companyName) && (
                  <span className={floatLabelClass}>Company Name</span>
                )}
              <input
                type="text"
                name="companyName"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.companyName) setFocusedField("");
                }}
                onFocus={() => setFocusedField("companyName")}
                value={formik.values.companyName}
                placeholder="Company Name"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* Website */}
            <div className="relative">
              {(focusedField === "website" || formik.values.website) && (
                <span className={floatLabelClass}>Website URL</span>
              )}
              <input
                type="text"
                name="website"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.website) setFocusedField("");
                }}
                onFocus={() => setFocusedField("website")}
                value={formik.values.website}
                placeholder="Website URL"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* Industry */}
            {/* Industry */}
            <div className="relative">
              {(focusedField === "industry" || formik.values.industry) && (
                <span className={floatLabelClass}>Industry / Sector</span>
              )}

              <select
                name="industry"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.industry) setFocusedField("");
                }}
                onFocus={() => setFocusedField("industry")}
                value={formik.values.industry}
                className={`${inputStyle} pt-5 pr-10 appearance-none`} // pr-10 for space for icon
                required
              >
                <option value="">Industry / Sector</option>
                <option>Technology</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Manufacturing</option>
                <option>Education</option>
                <option>Consulting</option>
                <option>Other</option>
              </select>

              {/* Dropdown icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
              </span>
            </div>

            {/* Company Size */}
            <div className="relative">
              {(focusedField === "companySize" || formik.values.companySize) && (
                <span className={floatLabelClass}>Company Size</span>
              )}

              <select
                name="companySize"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.companySize) setFocusedField("");
                }}
                onFocus={() => setFocusedField("companySize")}
                value={formik.values.companySize}
                className={`${inputStyle} pt-5 pr-10 appearance-none`}
                required
              >
                <option value="">Company Size</option>
                <option value="1-10">1–10</option>
                <option value="11-50">11–50</option>
                <option value="51-200">51–200</option>
                <option value="200-1000">200–1000</option>
                <option value="1000+">1000+</option>
              </select>

              {/* Dropdown icon */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                ▼
              </span>
            </div>


            {/* HQ Location */}
            <div className="relative">
              {(focusedField === "hqLocation" ||
                formik.values.hqLocation) && (
                  <span className={floatLabelClass}>Headquarters Location</span>
                )}
              <input
                type="text"
                name="hqLocation"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.hqLocation) setFocusedField("");
                }}
                onFocus={() => setFocusedField("hqLocation")}
                value={formik.values.hqLocation}
                placeholder="Headquarters Location"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* Additional Offices */}
            <div className="relative">
              {(focusedField === "additionalOffices" ||
                formik.values.additionalOffices) && (
                  <span className={floatLabelClass}>
                    Additional Offices (Optional)
                  </span>
                )}
              <input
                type="text"
                name="additionalOffices"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.additionalOffices) setFocusedField("");
                }}
                onFocus={() => setFocusedField("additionalOffices")}
                value={formik.values.additionalOffices}
                placeholder="Additional Offices (Optional)"
                className={`${inputStyle} pt-5`}
              />
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section B: Primary Contact Person
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="relative">
              {(focusedField === "contactName" ||
                formik.values.contactName) && (
                  <span className={floatLabelClass}>Full Name</span>
                )}
              <input
                type="text"
                name="contactName"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.contactName) setFocusedField("");
                }}
                onFocus={() => setFocusedField("contactName")}
                value={formik.values.contactName}
                placeholder="Full Name"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* Job Title */}
            <div className="relative">
              {(focusedField === "contactTitle" ||
                formik.values.contactTitle) && (
                  <span className={floatLabelClass}>
                    Job Title / Designation
                  </span>
                )}
              <input
                type="text"
                name="contactTitle"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.contactTitle) setFocusedField("");
                }}
                onFocus={() => setFocusedField("contactTitle")}
                value={formik.values.contactTitle}
                placeholder="Job Title / Designation"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              {(focusedField === "contactEmail" ||
                formik.values.contactEmail) && (
                  <span className={floatLabelClass}>Email Address</span>
                )}
              <input
                type="email"
                name="contactEmail"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.contactEmail) setFocusedField("");
                }}
                onFocus={() => setFocusedField("contactEmail")}
                value={formik.values.contactEmail}
                placeholder="Email Address"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              {(focusedField === "contactPhone" ||
                formik.values.contactPhone) && (
                  <span className={floatLabelClass}>Phone Number</span>
                )}
              <input
                type="text"
                name="contactPhone"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.contactPhone) setFocusedField("");
                }}
                onFocus={() => setFocusedField("contactPhone")}
                value={formik.values.contactPhone}
                placeholder="Phone Number"
                className={`${inputStyle} pt-5`}
                required
              />
            </div>

            {/* LinkedIn */}
            <div className="relative">
              {(focusedField === "contactLinkedIn" ||
                formik.values.contactLinkedIn) && (
                  <span className={floatLabelClass}>
                    LinkedIn Profile URL (Optional)
                  </span>
                )}
              <input
                type="text"
                name="contactLinkedIn"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.contactLinkedIn) setFocusedField("");
                }}
                onFocus={() => setFocusedField("contactLinkedIn")}
                value={formik.values.contactLinkedIn}
                placeholder="LinkedIn Profile URL (Optional)"
                className={`${inputStyle} pt-5`}
              />
            </div>
          </div>
        </div>

        {/* SECTION C */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section C: Membership Objectives
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          {/* AI Goals */}
          <div className="relative">
            {(focusedField === "aiGoals" || formik.values.aiGoals) && (
              <span className={floatLabelClass}>
                AI goals for the next 12 months
              </span>
            )}
            <textarea
              name="aiGoals"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.aiGoals) setFocusedField("");
              }}
              onFocus={() => setFocusedField("aiGoals")}
              value={formik.values.aiGoals}
              placeholder="What are your AI goals for the next 12 months?"
              className={`${inputStyle} pt-5`}
              rows="3"
              required
            />
          </div>

          <p className="mt-4 mb-2 font-medium">Collaboration Type</p>

          <div className="flex flex-wrap gap-3">
            {collabOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => toggleCollab(item)}
                className={`px-4 py-2 rounded-full border text-sm 
                  ${collaborations.includes(item)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <p className="mt-6 mb-2 font-medium">Speaking Opportunities?</p>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="speakingOpportunity"
                value="Yes"
                onChange={formik.handleChange}
                checked={formik.values.speakingOpportunity === "Yes"}
                required
              />{" "}
              Yes
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="speakingOpportunity"
                value="No"
                onChange={formik.handleChange}
                checked={formik.values.speakingOpportunity === "No"}
                required
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* SECTION D */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section D: Uploads</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          <div className="space-y-4">
            <div>
              <p className="font-medium">Company Logo</p>
              <input
                type="file"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
                className={inputStyle}
                required
              />
            </div>

            <div>
              <p className="font-medium">
                Company Profile / Pitch Deck (Optional)
              </p>
              <input
                type="file"
                onChange={(e) => setCompanyDeck(e.target.files[0])}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* SECTION E */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section E: Terms</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms1"
              onChange={formik.handleChange}
              checked={formik.values.terms1}
              required
            />{" "}
            I confirm that the above details are accurate.
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms2"
              onChange={formik.handleChange}
              checked={formik.values.terms2}
              required
            />{" "}
            I agree to the AI-Authority Membership Terms &amp; Policies.
          </label>
        </div>

        {/* SECTION F */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section F: Referral Source
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          <div className="relative">
            {(focusedField === "referralSource" || formik.values.referralSource) && (
              <span className={floatLabelClass}>How did you hear about us?</span>
            )}

            <select
              name="referralSource"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.referralSource) setFocusedField("");
              }}
              onFocus={() => setFocusedField("referralSource")}
              value={formik.values.referralSource}
              className={`${inputStyle} pt-5 pr-10 appearance-none`}
              required
            >
              <option value="">How did you hear about us?</option>
              {referralOptions.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* Dropdown icon */}
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 7L10 12L15 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>


        {/* SECTION G */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Create Login Password</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>

          <div className="grid grid-cols-1 md-grid-cols-2 gap-6">

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
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.password) setFocusedField("");
                }}
                onFocus={() => setFocusedField("password")}
                className={`${inputStyle} pt-5`}
                style={{ paddingRight: "2.5rem" }} // space for icon
                required
              />

              {/* Eye Icon */}
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
              {(focusedField === "confirmPassword" || formik.values.confirmPassword) && (
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
                className={`${inputStyle} pt-5`}
                style={{ paddingRight: "2.5rem" }} // space for icon
                required
              />

              {/* Eye Icon */}
              <span
                className="absolute right-3 inset-y-0 flex items-center cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
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
            disabled={loading}
            className="px-12 py-3.5 rounded-full text-white text-lg font-semibold shadow-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CorporateRegister;
