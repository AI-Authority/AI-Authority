import React from "react";
import { useNavigate } from "react-router-dom";

export default function AiStrategyCourse() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 min-h-screen pb-20">

      {/* HERO HEADER (Blue Gradient) */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
            AI Strategy
          </h1>
          <p className="text-lg mt-4 opacity-90">
            Course Details
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto mt-16 px-6">

        {/* OVERVIEW CARD */}
        <section className="bg-white shadow-xl rounded-2xl p-10 border border-gray-200 mb-14">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            AI Strategy Course
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The AI Strategy course prepares professionals to design and lead a comprehensive AI 
            strategy that drives measurable business impact. Participants will learn how to align AI 
            initiatives with organizational goals, engage stakeholders effectively, and create a 
            clear, actionable roadmap for AI adoption.
          </p>

          <h3 className="text-xl font-semibold mb-3">You will gain expertise in:</h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg space-y-2 leading-relaxed">
            <li>Identifying key stakeholders and addressing their needs and concerns</li>
            <li>Crafting an AI vision aligned with strategic business objectives</li>
            <li>Conducting value assessments to prioritize high-impact AI use cases</li>
            <li>Performing readiness assessments across technology, data, talent, and governance</li>
            <li>Defining organizational enablers to realize the AI vision</li>
            <li>Designing a strategic roadmap for enabling capabilities</li>
            <li>Formulating practical, scalable AI implementation strategies</li>
          </ul>
        </section>

        {/* WHO CAN ATTEND */}
        <section className="bg-white shadow-md rounded-2xl p-10 border border-gray-200 mb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Who Should Attend?
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            Top-level management, CXOs, innovation leaders, digital transformation professionals, 
            Enterprise Architects, Business and Technology executives, Program/Project Managers, 
            Operations executives.
          </p>
        </section>

        {/* DAY 1 */}
        <section className="bg-white shadow-md rounded-2xl p-10 border-l-4 border-blue-600 mb-14">
          <h3 className="text-2xl font-bold text-blue-700 mb-5">
            Day 1 Topics — AI Fundamentals & Strategy Foundations
          </h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg leading-relaxed space-y-3">
            <li>
              <strong>What is Artificial Intelligence?</strong>
              <div>Describes what Artificial Intelligence is and its history.</div>
            </li>

            <li>
              <strong>What is AI Strategy?</strong>
              <div>
                Defines a structured plan for how an organization will use artificial intelligence 
                to achieve its business objectives sustainably and responsibly.
              </div>
            </li>

            <li>
              <strong>AI Strategy Components</strong>
              <div>Key components required to build a strong AI strategy.</div>
            </li>

            <li>
              <strong>Organization Context</strong>
              <div>Understanding the environment and motivation of the organization.</div>
            </li>

            <li>
              <strong>Environment</strong>
              <div>Business, Technology, and AI environment mapping.</div>
            </li>

            <li>
              <strong>Motivation</strong>
              <div>Drivers, goals, and objectives behind AI adoption.</div>
            </li>

            <li>
              <strong>Stakeholder Engagement</strong>
              <div>Identifying and engaging the right stakeholders.</div>
            </li>

            <li>
              <strong>Concerns</strong>
              <div>Identifying the high-level requirements and concerns of stakeholders.</div>
            </li>
          </ul>
        </section>

        {/* DAY 2 */}
        <section className="bg-white shadow-md rounded-2xl p-10 border-l-4 border-blue-600 mb-14">
          <h3 className="text-2xl font-bold text-blue-700 mb-5">
            Day 2 Topics — Strategy Execution & AI Readiness
          </h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg leading-relaxed space-y-3">
            <li>
              <strong>AI Vision</strong>
              <div>Establishing a long-term AI vision for the organization.</div>
            </li>

            <li>
              <strong>AI Value</strong>
              <div>Evaluating AI's value from business, technology, and societal perspectives.</div>
            </li>

            <li>
              <strong>AI Readiness Assessment</strong>
              <div>Assessing the organization's readiness for AI across multiple dimensions.</div>
            </li>

            <li>
              <strong>AI Enablement</strong>
              <div>Identifying the components needed to enable AI implementation.</div>
            </li>

            <li>
              <strong>AI Roadmap</strong>
              <div>Creating a strategic roadmap for enterprise-wide AI adoption.</div>
            </li>

            <li>
              <strong>AI Implementation Strategy</strong>
              <div>Creating a high-level implementation strategy.</div>
            </li>
          </ul>
        </section>

        {/* CTA BUTTON */}
        <div className="text-center mt-20">
          <button
            onClick={() => {
              const token = localStorage.getItem("userToken");
              if (!token) {
                alert("Please log in to enroll in this course");
                navigate("/login");
                return;
              }
              navigate("/payment");
            }}
            className="px-10 py-4 bg-blue-700 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-800 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </main>
  );
}
