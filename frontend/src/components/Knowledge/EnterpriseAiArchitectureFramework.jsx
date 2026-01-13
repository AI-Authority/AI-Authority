import { useNavigate } from "react-router-dom";
import enterpriseAiArchDiagram from "../../assets/enterprise-ai-architecture-diagram.png";

export default function EnterpriseAiArchitectureFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "Context Layer",
      subtitle: "Establishing Your AI Starting Point",
      content: "Before building, organizations must understand where they stand today. The Context Layer defines the internal and external landscape that shapes AI adoption.",
      components: [
        "AI Environment – Current systems, tools, market landscape",
        "AI Maturity – Organizational readiness across skills, processes, and data",
        "AI Principles – Ethical and operational guidelines",
        "AI Drivers – Business challenges, opportunities, and innovation triggers"
      ],
      purpose: "Build awareness and set a realistic foundation for AI transformation."
    },
    {
      number: "2",
      title: "Strategy Layer",
      subtitle: "Defining Vision, Alignment & Direction",
      content: "The Strategy Layer outlines how AI will support long-term business goals and which stakeholders will drive the change.",
      components: [
        "Stakeholders – Cross-functional leadership and contributors",
        "AI Enablement – Upskilling, culture building, and platform readiness",
        "AI Value Assessment – High-impact use case identification",
        "AI Concerns – Risks, gaps, and organizational barriers",
        "AI Vision – Long-term roadmap and transformation goals"
      ],
      purpose: "Align the entire organization behind a clear, outcome-driven AI strategy."
    },
    {
      number: "3",
      title: "Business Layer",
      subtitle: "Translating AI Into Tangible Business Value",
      content: "This layer connects AI capabilities directly to business processes, customer impact, and enterprise efficiency.",
      components: [
        "Value Stream – Where and how AI generates value",
        "Capability Building – New business capabilities powered by AI",
        "Services – Business services enhanced or automated through AI",
        "Processes – AI-enabled workflows and operations",
        "Investments – Resource planning and ROI alignment"
      ],
      purpose: "Ensure every AI initiative directly contributes to business performance and growth."
    },
    {
      number: "4",
      title: "Data Layer",
      subtitle: "Building a Trusted Data Foundation",
      content: "Data is the backbone of enterprise AI. This layer establishes the governance, quality, and security needed to power AI systems.",
      components: [
        "Data Modelling",
        "Data Standards",
        "Data Lineage",
        "Data Security",
        "Data Privacy",
        "Data Governance",
        "Data Principles"
      ],
      purpose: "Deliver accurate, compliant, and reliable data for every AI model and application."
    },
    {
      number: "5",
      title: "Application Layer",
      subtitle: "Turning AI Into Real, Usable Products",
      content: "The Application Layer focuses on how AI capabilities are built, delivered, and monitored across the enterprise.",
      components: [
        "Application Services – AI-driven apps, APIs, and integrations",
        "Tools & IDEs – Engineering and data science tooling",
        "Monitoring Services – Performance tracking, drift detection, dashboards"
      ],
      purpose: "Operationalize AI through stable, scalable applications."
    },
    {
      number: "6",
      title: "Technology Layer",
      subtitle: "The Infrastructure That Powers Enterprise AI",
      content: "This layer defines the platforms, systems, and computing capabilities required to run AI workloads.",
      components: [
        "Technology Services – Cloud, MLOps, orchestration tools",
        "Technology Standards – Architecture and compliance frameworks",
        "Computing Power – CPUs, GPUs, distributed software stack"
      ],
      purpose: "Ensure AI systems are scalable, cost-efficient, and enterprise-grade."
    },
    {
      number: "7",
      title: "Implementation Layer",
      subtitle: "Deploying AI Models with Confidence",
      content: "The final layer is where strategy meets execution.",
      components: [
        "Model Selection – Choosing the right algorithms and architectures",
        "Frameworks – MLOps pipelines, deployment systems, and lifecycle workflows"
      ],
      purpose: "Deliver reliable, production-ready AI solutions at scale."
    }
  ];

  const verticalPillars = {
    governance: {
      title: "AI Governance",
      description: "Running across the entire framework, AI Governance ensures that AI is built responsibly, ethically, and securely.",
      includes: [
        "Fairness & Bias Management",
        "Transparency & Explainability",
        "Ethics & Accountability"
      ]
    },
    security: {
      title: "AI Security",
      description: "AI Security operates at every stage to ensure enterprise AI is trustworthy and resilient.",
      includes: [
        "Data Security",
        "Model Security",
        "Deployment Security",
        "Supply-Chain Security"
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/frameworks')}
            className="mb-8 text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2 text-base font-medium group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform duration-300">←</span> 
            <span>Back to Frameworks</span>
          </button>

          {/* Framework Introduction */}
          <div className="mb-4 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              Enterprise AI Architecture Framework: A Structured Blueprint for Scalable, Responsible, and ROI-Driven AI Adoption
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              The Enterprise AI Architecture Framework is our end-to-end blueprint that helps organizations adopt, scale, and govern AI with clarity and confidence. Designed for modern enterprises, this framework aligns strategy, data, technology, and governance into a unified structure, ensuring that AI delivers measurable business value while remaining safe, ethical, and compliant. This multi-layered architecture guides organizations from foundational understanding to full-scale implementation, with AI Governance and AI Security integrated at every stage.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-8">
            <img 
              src={enterpriseAiArchDiagram} 
              alt="Enterprise AI Architecture Framework Diagram" 
              className="w-full object-contain opacity-95"
            />
          </div>
        </div>
      </section>

      {/* Main Content - Layers */}
      <section className="px-6 py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Layers Grid */}
          <div className="space-y-10 mb-24">
            {layers.map((layer, index) => (
              <div 
                key={index}
                className="rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                    {layer.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                      {layer.title}
                    </h3>
                    <h4 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                      {layer.subtitle}
                    </h4>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                      {layer.content}
                    </p>
                    
                    <div className="mb-5">
                      <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">
                        Key Components:
                      </p>
                      <ul className="space-y-2.5 ml-2">
                        {layer.components.map((component, idx) => (
                          <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                            <span className="text-blue-600 mr-3 font-bold">•</span>
                            <span>{component}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-gray-700 italic mt-5 text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                      <span className="font-semibold">Purpose:</span> {layer.purpose}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vertical Pillars Section */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center tracking-tight">
              AI Governance & AI Security (Vertical Pillars)
            </h2>
            <p className="text-xl text-gray-700 mb-10 text-center max-w-4xl mx-auto">
              Responsibility and Security at Every Stage
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* AI Governance Pillar */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-10 shadow-lg border border-indigo-100">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {verticalPillars.governance.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  {verticalPillars.governance.description}
                </p>
                <p className="text-gray-700 font-semibold mb-3">Includes:</p>
                <ul className="space-y-2.5 ml-2">
                  {verticalPillars.governance.includes.map((item, idx) => (
                    <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start">
                      <span className="text-indigo-600 mr-3 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Security Pillar */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-lg border border-blue-100">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {verticalPillars.security.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                  {verticalPillars.security.description}
                </p>
                <p className="text-gray-700 font-semibold mb-3">Includes:</p>
                <ul className="space-y-2.5 ml-2">
                  {verticalPillars.security.includes.map((item, idx) => (
                    <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start">
                      <span className="text-blue-600 mr-3 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed mt-8 text-center max-w-4xl mx-auto">
              These pillars minimize risk and ensure compliance, making enterprise AI trustworthy and resilient.
            </p>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center max-w-5xl mx-auto">
              The Enterprise AI Architecture Framework provides a clear, actionable structure for organizations to adopt AI with purpose and precision. By combining strategy, data, technology, governance, and security, this framework empowers enterprises to build AI systems that scale sustainably, deliver measurable impact, and operate responsibly.
            </p>
          </div>

          {/* Back Button at Bottom */}
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/frameworks')}
              className="bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-105"
            >
              Back to Frameworks
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
