import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { submitTrainerMembership } from "../../services/api";
import { useNavigate } from "react-router-dom";

const TrainerRegister = () => {
  const navigate = useNavigate();
  const [resumePreview, setResumePreview] = useState(null);
  const [deckPreview, setDeckPreview] = useState(null);
  const [focusedField, setFocusedField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const expertiseOptions = [
    "AI Fundamentals",
    "Machine Learning",
    "Generative AI",
    "Data Science",
    "Prompt Engineering",
    "AI Tools",
    "Corporate AI Training",
  ];

  const trainingOptions = [
    "Workshops",
    "Webinars",
    "Bootcamps",
    "Corporate Training",
    "Certification courses",
  ];

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits.")
      .required("Phone Number is required."),
    country: Yup.string().required("Required"),
    linkedinURL: Yup.string().url("Invalid URL").required("Required"),
    portfolioURL: Yup.string().url("Invalid URL").nullable(),
    expertise: Yup.array()
      .min(1, "Select at least one expertise")
      .required("Required"),
    yearsExperience: Yup.number()
      .typeError("Must be a number")
      .required("Required"),
    resume: Yup.mixed().required("Resume is required"),
    sampleDeck: Yup.mixed().nullable(),
    clients: Yup.array()
      .of(
        Yup.object({
          companyName: Yup.string().required("Required"),
          companyAddress: Yup.string().required("Required"),
          phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone Number must be exactly 10 digits.")
            .required("Phone Number is required."),
          email: Yup.string().email("Invalid").required("Required"),
        })
      )
      .length(3, "Three clients required"),
    trainingTypes: Yup.array()
      .min(1, "Select at least one training type")
      .required("Required"),
    pricingRange: Yup.string().nullable(),
    availability: Yup.string().required("Required"),

    // 🔽 UPDATED FIELD
    trainerPitch: Yup.string()
      .required("Required")
      .test(
        "collaboration-required",
        "Select at least one collaboration preference (Co-hosting, Trainer certification, Content partnerships, or AI-Authority events).",
        function () {
          const {
            coHosting,
            trainerCertification,
            contentPartnership,
            authorityEvents,
          } = this.parent; // all values in the form
          return (
            coHosting ||
            trainerCertification ||
            contentPartnership ||
            authorityEvents
          );
        }
      ),

    coHosting: Yup.boolean(),
    trainerCertification: Yup.boolean(),
    contentPartnership: Yup.boolean(),
    authorityEvents: Yup.boolean(),
    termsAccepted: Yup.boolean()
      .oneOf([true], "You must accept the terms")
      .required(),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
  });

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

    const data = await res.json();
    return data.url;
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      linkedinURL: "",
      portfolioURL: "",
      expertise: [],
      yearsExperience: "",
      resume: null,
      sampleDeck: null,
      clients: [
        { companyName: "", companyAddress: "", phone: "", email: "" },
        { companyName: "", companyAddress: "", phone: "", email: "" },
        { companyName: "", companyAddress: "", phone: "", email: "" },
      ],
      trainingTypes: [],
      pricingRange: "",
      availability: "",
      trainerPitch: "",
      coHosting: false,
      trainerCertification: false,
      contentPartnership: false,
      authorityEvents: false,
      termsAccepted: false,
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        let resumeURL = "";
        let sampleDeckURL = "";

        if (values.resume) {
          resumeURL = await uploadToCloudinary(values.resume, "trainer-resume");
        }
        if (values.sampleDeck) {
          sampleDeckURL = await uploadToCloudinary(values.sampleDeck, "trainer-deck");
        }

        const payload = {
          password: values.password,
          personalInfo: {
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            country: values.country,
            linkedinURL: values.linkedinURL,
            portfolioURL: values.portfolioURL,
          },
          trainerProfile: {
            expertiseAreas: values.expertise,
            yearsExperience: values.yearsExperience,
            resumeURL,
            sampleDeckURL,
            previousClients: values.clients,
          },
          trainingDetails: {
            typesOffered: values.trainingTypes,
            pricingRange: values.pricingRange,
            availability: values.availability,
          },
          collaborationPrefs: {
            coHosting: values.coHosting,
            trainerCertification: values.trainerCertification,
            contentPartnership: values.contentPartnership,
            authorityEvents: values.authorityEvents,
            trainerPitch: values.trainerPitch,
          },
          termsAccepted: values.termsAccepted,
        };

        const res = await submitTrainerMembership(payload);

        alert(res?.data?.message || "Trainer membership submitted successfully!");
        navigate("/login");
      } catch (err) {
        console.error("SUBMIT ERROR:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Submission failed. Please try again.";
        alert(msg);
      }
      setSubmitting(false);
    },
  });

  const inputStyle =
    "border px-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 bg-white text-gray-800";
  const errorStyle = "border-red-500 ring-red-500";
  const floatLabelClass =
    "absolute left-3 -top-3 bg-white px-1 text-xs font-medium text-gray-600";

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

  return (
    <div className="w-full bg-gray-50 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Trainer Membership – Registration
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Apply to become a certified trainer at AI Authority.
        </p>
      </div>

      <form
        onSubmit={handleFormSubmit}
        className="max-w-4xl mx-auto space-y-16 bg-white p-10 rounded-2xl shadow-md border"
      >
        {/* SECTION A */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section A: Personal & Contact Information
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
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.fullName) setFocusedField("");
                }}
                onFocus={() => setFocusedField("fullName")}
                value={formik.values.fullName}
                className={`${inputStyle} pt-5 ${formik.touched.fullName && formik.errors.fullName && errorStyle
                  }`}
              />
            </div>

            {/* Email */}
            <div className="relative">
              {(focusedField === "email" || formik.values.email) && (
                <span className={floatLabelClass}>Email Address</span>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.email) setFocusedField("");
                }}
                onFocus={() => setFocusedField("email")}
                value={formik.values.email}
                className={`${inputStyle} pt-5 ${formik.touched.email && formik.errors.email && errorStyle
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
                className={`${inputStyle} pt-5 ${formik.touched.phone && formik.errors.phone && errorStyle
                  }`}
              />
            </div>

            {/* Country */}
            <div className="relative">
              {(focusedField === "country" || formik.values.country) && (
                <span className={floatLabelClass}>Country</span>
              )}
              <input
                name="country"
                placeholder="Country"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.country) setFocusedField("");
                }}
                onFocus={() => setFocusedField("country")}
                value={formik.values.country}
                className={`${inputStyle} pt-5 ${formik.touched.country && formik.errors.country && errorStyle
                  }`}
              />
            </div>

            {/* LinkedIn */}
            <div className="relative">
              {(focusedField === "linkedinURL" || formik.values.linkedinURL) && (
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
                className={`${inputStyle} pt-5 ${formik.touched.linkedinURL &&
                  formik.errors.linkedinURL &&
                  errorStyle
                  }`}
              />
            </div>

            {/* Portfolio */}
            <div className="relative">
              {(focusedField === "portfolioURL" || formik.values.portfolioURL) && (
                <span className={floatLabelClass}>
                  Portfolio / Website (Optional)
                </span>
              )}
              <input
                name="portfolioURL"
                placeholder="Portfolio / Website (Optional)"
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  if (!formik.values.portfolioURL) setFocusedField("");
                }}
                onFocus={() => setFocusedField("portfolioURL")}
                value={formik.values.portfolioURL}
                className={`${inputStyle} pt-5 ${formik.touched.portfolioURL &&
                  formik.errors.portfolioURL &&
                  errorStyle
                  }`}
              />
            </div>
          </div>
        </div>

        {/* SECTION B */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section B: Trainer Profile</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <p className="font-medium mb-2">Expertise Area *</p>
          <div className="flex flex-wrap gap-3 mb-2">
            {expertiseOptions.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => {
                  const selected = formik.values.expertise;
                  if (selected.includes(item)) {
                    formik.setFieldValue(
                      "expertise",
                      selected.filter((x) => x !== item)
                    );
                  } else {
                    formik.setFieldValue("expertise", [...selected, item]);
                  }
                }}
                className={`px-4 py-2 rounded-full border ${formik.values.expertise.includes(item)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {formik.touched.expertise && formik.errors.expertise && (
            <p className="text-red-500 text-sm mb-3">
              {formik.errors.expertise}
            </p>
          )}

          <div className="relative mb-6">
            {(focusedField === "yearsExperience" ||
              formik.values.yearsExperience) && (
                <span className={floatLabelClass}>
                  Years of Training Experience
                </span>
              )}
            <input
              name="yearsExperience"
              type="number"
              placeholder="Years of Training Experience"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.yearsExperience) setFocusedField("");
              }}
              onFocus={() => setFocusedField("yearsExperience")}
              value={formik.values.yearsExperience}
              className={`${inputStyle} pt-5 ${formik.touched.yearsExperience &&
                formik.errors.yearsExperience &&
                errorStyle
                }`}
            />
          </div>

          <p className="font-medium">Upload Resume *</p>
          <input
            type="file"
            onChange={(e) => {
              formik.setFieldValue("resume", e.target.files[0]);
              setResumePreview(URL.createObjectURL(e.target.files[0]));
            }}
            className={`${inputStyle} ${formik.touched.resume && formik.errors.resume && errorStyle
              }`}
          />
          {resumePreview && (
            <p className="text-green-600 text-sm mt-1">File selected</p>
          )}

          <p className="font-medium mt-4">
            Upload Sample Training Deck (Optional)
          </p>
          <input
            type="file"
            onChange={(e) => {
              formik.setFieldValue("sampleDeck", e.target.files[0]);
              setDeckPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className={inputStyle}
          />

          <h3 className="font-semibold mt-8 mb-4">
            Previous Clients (3 Required)
          </h3>

          {formik.values.clients.map((c, idx) => (
            <div key={idx} className="mb-6">
              <h4 className="font-medium mb-2">Client {idx + 1}</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                <div className="relative">
                  {(focusedField === `client${idx}.companyName` ||
                    c.companyName) && (
                      <span className={floatLabelClass}>Company Name</span>
                    )}
                  <input
                    placeholder="Company Name"
                    value={c.companyName}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `clients[${idx}].companyName`,
                        e.target.value
                      )
                    }
                    onFocus={() =>
                      setFocusedField(`client${idx}.companyName`)
                    }
                    onBlur={() => {
                      if (!formik.values.clients[idx].companyName)
                        setFocusedField("");
                    }}
                    className={`${inputStyle} pt-5 ${formik.errors.clients &&
                      formik.errors.clients[idx]?.companyName &&
                      errorStyle
                      }`}
                  />
                </div>

                <div className="relative">
                  {(focusedField === `client${idx}.companyAddress` ||
                    c.companyAddress) && (
                      <span className={floatLabelClass}>Company Address</span>
                    )}
                  <input
                    placeholder="Company Address"
                    value={c.companyAddress}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `clients[${idx}].companyAddress`,
                        e.target.value
                      )
                    }
                    onFocus={() =>
                      setFocusedField(`client${idx}.companyAddress`)
                    }
                    onBlur={() => {
                      if (!formik.values.clients[idx].companyAddress)
                        setFocusedField("");
                    }}
                    className={`${inputStyle} pt-5 ${formik.errors.clients &&
                      formik.errors.clients[idx]?.companyAddress &&
                      errorStyle
                      }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  {(focusedField === `client${idx}.phone` || c.phone) && (
                    <span className={floatLabelClass}>Phone Number</span>
                  )}
                  <input
                    placeholder="Phone Number"
                    value={c.phone}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `clients[${idx}].phone`,
                        e.target.value
                      )
                    }
                    onFocus={() => setFocusedField(`client${idx}.phone`)}
                    onBlur={() => {
                      if (!formik.values.clients[idx].phone)
                        setFocusedField("");
                    }}
                    className={`${inputStyle} pt-5 ${formik.errors.clients &&
                      formik.errors.clients[idx]?.phone &&
                      errorStyle
                      }`}
                  />
                </div>

                <div className="relative">
                  {(focusedField === `client${idx}.email` || c.email) && (
                    <span className={floatLabelClass}>Email Address</span>
                  )}
                  <input
                    placeholder="Email Address"
                    type="email"
                    value={c.email}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `clients[${idx}].email`,
                        e.target.value
                      )
                    }
                    onFocus={() => setFocusedField(`client${idx}.email`)}
                    onBlur={() => {
                      if (!formik.values.clients[idx].email)
                        setFocusedField("");
                    }}
                    className={`${inputStyle} pt-5 ${formik.errors.clients &&
                      formik.errors.clients[idx]?.email &&
                      errorStyle
                      }`}
                  />
                </div>
              </div>

              {formik.errors.clients && formik.errors.clients[idx] && (
                <p className="text-red-500 text-sm mt-1">
                  All fields for this client are required.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* SECTION C */}
        <div>
          <h2 className="text-2xl font-bold mb-1">Section C: Training Details</h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <p className="font-medium mb-2">Types of Training You Offer *</p>

          <div className="flex flex-wrap gap-3 mb-2">
            {trainingOptions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const selected = formik.values.trainingTypes;
                  if (selected.includes(item)) {
                    formik.setFieldValue(
                      "trainingTypes",
                      selected.filter((t) => t !== item)
                    );
                  } else {
                    formik.setFieldValue("trainingTypes", [...selected, item]);
                  }
                }}
                className={`px-4 py-2 rounded-full border ${formik.values.trainingTypes.includes(item)
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {formik.touched.trainingTypes && formik.errors.trainingTypes && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.trainingTypes}
            </p>
          )}

          <div className="relative mt-4">
            {(focusedField === "pricingRange" ||
              formik.values.pricingRange) && (
                <span className={floatLabelClass}>
                  Average Pricing Range (Optional)
                </span>
              )}
            <input
              name="pricingRange"
              placeholder="Average Pricing Range (Optional)"
              onChange={formik.handleChange}
              onBlur={() => {
                if (!formik.values.pricingRange) setFocusedField("");
              }}
              onFocus={() => setFocusedField("pricingRange")}
              value={formik.values.pricingRange}
              className={`${inputStyle} pt-5`}
            />
          </div>

<div className="relative mt-6">
  {(focusedField === "availability" || formik.values.availability) && (
    <span className={floatLabelClass}>Availability</span>
  )}

  <select
    name="availability"
    onChange={formik.handleChange}
    onBlur={(e) => {
      formik.handleBlur(e);
      if (!formik.values.availability) setFocusedField("");
    }}
    onFocus={() => setFocusedField("availability")}
    value={formik.values.availability}
    className={`${inputStyle} pt-5 appearance-none pr-10 ${
      formik.touched.availability && formik.errors.availability && errorStyle
    }`}
  >
    <option value="">Availability</option>
    <option>Weekdays</option>
    <option>Weekends</option>
    <option>Both</option>
  </select>

  {/* Dropdown Arrow Icon */}
  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
    ▼
  </span>
</div>

        </div>

        {/* SECTION D */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section D: Collaboration Preferences
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
            <label>
              <input
                type="checkbox"
                checked={formik.values.coHosting}
                onChange={(e) =>
                  formik.setFieldValue("coHosting", e.target.checked)
                }
              />{" "}
              Co-hosting sessions
            </label>

            <label>
              <input
                type="checkbox"
                checked={formik.values.trainerCertification}
                onChange={(e) =>
                  formik.setFieldValue(
                    "trainerCertification",
                    e.target.checked
                  )
                }
              />{" "}
              Trainer certification
            </label>

            <label>
              <input
                type="checkbox"
                checked={formik.values.contentPartnership}
                onChange={(e) =>
                  formik.setFieldValue(
                    "contentPartnership",
                    e.target.checked
                  )
                }
              />{" "}
              Content partnerships
            </label>

            <label>
              <input
                type="checkbox"
                checked={formik.values.authorityEvents}
                onChange={(e) =>
                  formik.setFieldValue("authorityEvents", e.target.checked)
                }
              />{" "}
              AI-Authority events
            </label>
          </div>

          <div className="relative mt-4">
            {(focusedField === "trainerPitch" ||
              formik.values.trainerPitch) && (
                <span className={floatLabelClass}>
                  Your trainer pitch (2–4 lines)
                </span>
              )}
            <textarea
              name="trainerPitch"
              rows="3"
              placeholder="Your trainer pitch (2–4 lines)"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                if (!formik.values.trainerPitch) setFocusedField("");
              }}
              onFocus={() => setFocusedField("trainerPitch")}
              value={formik.values.trainerPitch}
              className={`${inputStyle} pt-5 mt-0 ${formik.touched.trainerPitch &&
                formik.errors.trainerPitch &&
                errorStyle
                }`}
            />
          </div>
        </div>

        {/* SECTION E */}
        <div>
          <h2 className="text-2xl font-bold mb-1">
            Section E: Terms & Confirmation
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6" />

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
            />
            I agree to abide by AI-Authority guidelines for trainers.
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
          <div className="h-1 w-20 bg-blue-600 mb-6" />

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
                className={`${inputStyle} pt-5 ${formik.touched.password &&
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
                className={`${inputStyle} pt-5 ${formik.touched.confirmPassword &&
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

        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className={`px-12 py-3.5 text-lg font-semibold text-white rounded-full ${formik.isSubmitting
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

export default TrainerRegister;
