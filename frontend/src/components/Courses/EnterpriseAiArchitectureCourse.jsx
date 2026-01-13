import React from "react";
import { useNavigate } from "react-router-dom";

export default function EnterpriseAiArchitectureCourse() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 min-h-screen pb-20">

      {/* HERO HEADER (Blue Gradient) */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-20 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Enterprise AI Architecture
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
            Course Overview
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The Enterprise AI Architecture course program equips professionals with the skills and 
            expertise to design, lead, and scale AI initiatives across the enterprise. Participants 
            will learn how to architect AI systems that are strategically aligned with business 
            objectives, operationally effective, and tailored to the unique needs of their organization.
          </p>

          <h3 className="text-xl font-semibold mb-3">Key Competencies You Will Gain:</h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg space-y-2 leading-relaxed">
            <li>Analyzing organizational context and strategic drivers</li>
            <li>Adapting AI frameworks for enterprise needs</li>
            <li>Establishing AI principles for ethical implementation</li>
            <li>Defining detailed AI strategies and roadmaps</li>
            <li>Designing multi-layer enterprise AI architecture</li>
            <li>Building scalable implementation & migration strategies</li>
            <li>Implementing AI governance and compliance frameworks</li>
            <li>Leading change initiatives across business & tech teams</li>
          </ul>
        </section>

        {/* WHO CAN ATTEND */}
        <section className="bg-white shadow-md rounded-2xl p-10 border border-gray-200 mb-14">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Who Should Attend?
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            Enterprise Architects, Business & Technology Executives, Program/Project Managers, 
            Operations Executives, and leaders responsible for enterprise AI adoption.
          </p>
        </section>

        {/* DAY 1 */}
        <section className="bg-white shadow-md rounded-2xl p-10 border-l-4 border-blue-600 mb-14">
          <h3 className="text-2xl font-bold text-blue-700 mb-5">
            Day 1 Topics — Foundations & Strategy
          </h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg leading-relaxed space-y-3">
            <li>
              <strong>What is Artificial Intelligence?</strong>
              <div>Describes what AI is and its historical evolution.</div>
            </li>
            <li>
              <strong>What is Enterprise AI Architecture?</strong>
              <div>
                A structural design enabling enterprise-wide AI development, deployment and governance.
              </div>
            </li>
            <li>
              <strong>Enterprise AI Skills</strong>
              <div>
                Includes ML engineering, data science, AI ethics, governance, and enterprise process alignment.
              </div>
            </li>
            <li>
              <strong>Enterprise AI Architecture Framework</strong>
              <div>The blueprint defining all AI-enabling layers and their interactions.</div>
            </li>
            <li>
              <strong>Components of Enterprise AI Architecture</strong>
              <div>Strategy, Business, Data, Technology, Applications.</div>
            </li>
            <li>
              <strong>AI Context</strong>
              <div>
                Understanding business goals, industry dynamics, regulatory needs, and user expectations.
              </div>
            </li>
            <li>
              <strong>AI Strategy</strong>
              <div>
                Aligning AI initiatives with organizational goals, using data, tech, and talent effectively.
              </div>
            </li>
          </ul>
        </section>

        {/* DAY 2 */}
        <section className="bg-white shadow-md rounded-2xl p-10 border-l-4 border-blue-600 mb-14">
          <h3 className="text-2xl font-bold text-blue-700 mb-5">
            Day 2 Topics — Enterprise Architecture Layers
          </h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg leading-relaxed space-y-3">
            <li>
              <strong>Enterprise AI Business Architecture</strong>
              <div>Aligning AI with business capabilities, processes, and value chains.</div>
            </li>

            <li>
              <strong>Enterprise AI Data Architecture</strong>
              <div>Data modeling, governance, lineage, quality, and readiness for AI.</div>
            </li>

            <li>
              <strong>Enterprise AI Application Architecture</strong>
              <div>Integrating AI across applications, systems, and workflows.</div>
            </li>

            <li>
              <strong>Enterprise AI Technology Architecture</strong>
              <div>
                Infrastructure, cloud, tools, and platforms needed to deploy AI at scale.
              </div>
            </li>

            <li>
              <strong>AI Implementation</strong>
              <div>Real-world deployment methodologies and operational readiness.</div>
            </li>

            <li>
              <strong>Road-mapping AI Architecture</strong>
              <div>
                Strategic adoption cycle, prioritization, and enterprise rollout planning.
              </div>
            </li>
          </ul>
        </section>

        {/* DAY 3 */}
        <section className="bg-white shadow-md rounded-2xl p-10 border-l-4 border-blue-600 mb-14">
          <h3 className="text-2xl font-bold text-blue-700 mb-5">
            Day 3 Topics — Governance, Security & Innovation
          </h3>

          <ul className="list-disc ml-6 text-gray-700 text-lg leading-relaxed space-y-3">
            <li>
              <strong>AI Governance</strong>
              <div>Ensuring ethical AI, risk mitigation, compliance, transparency, and accountability.</div>
            </li>

            <li>
              <strong>AI Change Management</strong>
              <div>Preparing people, culture, and teams for AI-driven transformation.</div>
            </li>

            <li>
              <strong>AI Security</strong>
              <div>Protecting models from adversarial attacks, theft, manipulation and breaches.</div>
            </li>

            <li>
              <strong>Innovation & Agility</strong>
              <div>
                Leveraging AI to accelerate enterprise innovation and adaptive strategy.
              </div>
            </li>

            <li>
              <strong>AI in Enterprise Architecture</strong>
              <div>
                How AI enhances and accelerates Enterprise Architecture processes.
              </div>
            </li>
          </ul>
        </section>

        {/* CTA */}
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
