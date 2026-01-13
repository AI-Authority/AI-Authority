// Updated Membership Page with Full Content for Each Category
import snaLogo from "../../assets/SNA-Logo-1.jpg";
import coeussLogo from "../../assets/coeuss.jpg";
import tekshapersLogo from "../../assets/logo-new.png";
import infiniteLogo from "../../assets/final-logo-3.png";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/Untitled-design-27.png";

export default function Membership() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const categories = [
    {
      title: "Corporate Membership",
      short:
        "AI Authority's Corporate Membership is designed for companies that need expert support, trusted guidance, and access to the right capabilities as they adopt and expand AI within their organisation. It provides a structured way for businesses to access reliable AI expertise, resources, and talent whenever they need it.",
      register: "/register/corporate",
      viewMore: "/membership/corporate",
    },
    {
      title: "AI Authority Architecture Board Membership",
      short:
        "The AI Architecture Board Membership is designed for highly experienced professionals in the AI industry who play a critical role in evaluating, designing, and guiding AI solutions across the AI Authority network. These members form the Architecture Board responsible for ensuring that AI systems are built with technical excellence, governance integrity, and industry-aligned standards.",
      register: "/register/architect",
      viewMore: "/membership/architect",
    },
    {
      title: "Trainer Membership",
      short:
        "The Trainer Membership is designed for educators, facilitators, consultants, and learning professionals who are passionate about advancing AI literacy and professional development. This membership empowers trainers to deliver high-quality AI education using AI Authority's trusted, standardized content and training ecosystem.",
      register: "/register/trainer",
      viewMore: "/membership/trainer",
    },
    {
      title: "Student Membership",
      short:
        "The Student Membership is designed for individuals currently enrolled in academic programs who want to strengthen their AI expertise, gain real-world exposure, and build meaningful industry connections. It empowers students to accelerate their learning, participate in hands-on activities, and engage with a global AI community.",
      register: "/register/student",
      viewMore: "/membership/student",
    },
    {
      title: "Individual Membership",
      short:
        "The Individual Membership is ideal for anyone looking to grow their expertise, expand their network, and actively contribute to the advancement of the AI industry. It supports professionals at all levels — whether you're deepening your knowledge, exploring new opportunities, or shaping the future of responsible AI.",
      register: "/register/individual",
      viewMore: "/membership/individual",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div
        className="relative h-[65vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative z-10 text-5xl md:text-6xl font-bold text-white">
          Membership
        </h1>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
        <div className="bg-indigo-50/40 rounded-2xl p-10 max-w-6xl mx-auto shadow-sm">
          <h2 className="text-4xl font-bold text-center text-gray-900 tracking-tight mb-6">
            Membership at <span className="text-indigo-600">AI-Authority</span>
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
            AI Authority is a professional association dedicated to advancing responsible artificial intelligence governance, education, and industry collaboration. As a trusted hub for AI professionals, organizations, students, and trainers, AI Authority provides access to exclusive resources, ongoing training, and thought leadership that shape the future of AI strategy and compliance.
            Members benefit from unique networking opportunities, advocacy in AI policy, and direct input into global best practices, ensuring every participant plays an active role in the evolution and ethical adoption of artificial intelligence.
          </p>
        </div>

        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div
              className="w-full md:w-[60%] rounded-2xl p-10 shadow-md relative overflow-hidden border border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-purple-50"
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>

              <h3 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                {cat.title}
              </h3>

              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {cat.short}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(cat.register)}
                  className="px-8 py-3 text-lg rounded-full font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Register
                </button>

                <button
                  onClick={() => navigate(cat.viewMore)}
                  className="px-8 py-3 text-lg rounded-full font-semibold bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 transition"
                >
                  View More
                </button>
              </div>
            </div>

            <div className="hidden md:block w-[40%]"></div>
          </div>
        ))}

        <div className="rounded-2xl p-14 bg-gradient-to-br from-indigo-100/60 via-white/70 to-indigo-100/40 border border-white/40 backdrop-blur-xl shadow-lg">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Our Current Members
            </h2>
            <p className="mt-3 text-2xl font-semibold text-blue-600 tracking-wide drop-shadow-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
              Trusted by forward-thinking organizations across industries
            </p>
          </div>

          <div className="text-center max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed space-y-4">
            <p>
              We are proud to collaborate with companies that are driving innovation, embracing AI adoption, and shaping the future of technology.
            </p>
            <p>
              These valued organizations are part of our growing AI-Authority ecosystem, working alongside us to build a smarter, more connected AI community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-12 items-center justify-items-center">
            {[
              { src: snaLogo, alt: "SNA Technologies" },
              { src: coeussLogo, alt: "Coeuss.co" },
              { src: tekshapersLogo, alt: "Tekshapers" },
              { src: infiniteLogo, alt: "Infinite IT Consulting" },
            ].map((logo, index) => (
              <div
                key={index}
                className="w-full h-32 flex items-center justify-center rounded-2xl p-6 bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:bg-white/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <img src={logo.src} alt={logo.alt} className="h-14 object-contain opacity-95" />
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-12 text-lg italic">
            More organizations are joining us every month as we expand our global AI network.
          </p>
        </div>

        <div className="text-center pt-2">
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/profile")}
              className="bg-indigo-600 text-white text-lg font-semibold px-12 py-3 rounded-full hover:bg-indigo-700 transition"
            >
              View My Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-600 text-white text-lg font-semibold px-12 py-3.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
