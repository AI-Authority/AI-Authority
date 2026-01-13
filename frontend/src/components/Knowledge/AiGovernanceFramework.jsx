import { useNavigate } from "react-router-dom";
import aiGovernanceDiagram from "../../assets/ai-governance.png";

export default function AiGovernanceFramework() {
  const navigate = useNavigate();

  const principles = [
    "Trustworthy – AI systems must operate reliably and consistently",
    "Transparent – Decisions and data flows must be visible and auditable",
    "Explainable – AI outcomes should be interpretable and understandable",
    "Accountable – Humans remain responsible for oversight and outcomes",
    "Ethical – AI must respect values, rights, and societal impact",
    "Fair – Systems must avoid bias and ensure equitable treatment"
  ];

  const components = [
    {
      number: "1",
      title: "Organization & Roles",
      subtitle: "Clear Ownership and Accountability",
      content: "Effective AI governance begins with well-defined organizational structures.",
      includes: {
        title: "This includes:",
        items: [
          "AI leadership roles (CAIO, AI Governance Lead, Data Ethics Officer)",
          "Cross-functional governance committees",
          "Responsibilities across engineering, legal, security, and business teams"
        ]
      },
      purpose: "Ensure accountability and consistency in how AI is developed, used, and monitored."
    },
    {
      number: "2",
      title: "Operational Roles",
      subtitle: "Who builds, manages, validates, and oversees AI?",
      content: "Operational governance defines the hands-on responsibilities of:",
      roles: [
        "Data scientists",
        "ML engineers",
        "DevOps & MLOps teams",
        "Risk management teams",
        "Business process owners"
      ],
      purpose: "Clarify who does what throughout the AI lifecycle."
    },
    {
      number: "3",
      title: "Operating Model",
      subtitle: "The structure for how AI is delivered and governed",
      content: "Your operating model defines:",
      defines: [
        "Centralized vs. federated governance",
        "Standardized workflows for model development",
        "Lifecycle management processes",
        "Approval and sign-off checkpoints"
      ],
      purpose: "Create repeatable, controlled AI delivery processes across the organization."
    },
    {
      number: "4",
      title: "Risk & Compliance",
      subtitle: "Managing risks and meeting regulatory obligations",
      content: "This covers all compliance obligations, including:",
      obligations: [
        "GDPR",
        "ISO standards",
        "Industry regulations",
        "Data protection laws",
        "Audit and traceability requirements"
      ],
      note: "Risk and compliance appear twice in the diagram because they apply across both development and deployment phases.",
      purpose: "Protect the organization, customers, and stakeholders from unintended harm and regulatory violations."
    },
    {
      number: "5",
      title: "Policies & Standards",
      subtitle: "The rules that govern how AI is built and used",
      content: "These include:",
      standards: [
        "Data handling policies",
        "AI ethics guidelines",
        "Model approval standards",
        "Responsible AI documentation",
        "Bias mitigation standards",
        "Security and privacy guidelines"
      ],
      purpose: "Establish consistent rules and quality controls across projects and teams."
    },
    {
      number: "6",
      title: "Model Governance",
      subtitle: "Oversight of systems that learn and adapt",
      content: "Model Governance ensures that every AI model is:",
      ensures: [
        "Reviewed",
        "Validated",
        "Versioned",
        "Monitored",
        "Audited"
      ],
      alsoIncludes: {
        title: "It also includes:",
        items: [
          "Model cards",
          "Drift detection",
          "Performance reviews",
          "Lifecycle documentation"
        ]
      },
      purpose: "Maintain control and accountability over models, even post-deployment."
    },
    {
      number: "7",
      title: "Tools & Monitoring",
      subtitle: "Technology that enforces governance",
      content: "This includes tools for:",
      tools: [
        "Model monitoring",
        "Bias and fairness detection",
        "Explainability (XAI)",
        "Audit logs",
        "Security scanning",
        "Drift and anomaly alerting"
      ],
      purpose: "Automate governance and ensure real-time visibility into AI behavior."
    }
  ];

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
              AI Governance Framework: Ensuring Responsible, Transparent, and Compliant AI Across the Enterprise
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Governance Framework provides organizations with a clear structure for managing the risks, responsibilities, and ethical considerations associated with artificial intelligence. As AI systems become more capable and more deeply embedded in business processes, governance ensures they remain trustworthy, transparent, explainable, accountable, ethical, and fair.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              This framework defines the roles, standards, policies, and operational guardrails needed to govern AI throughout its lifecycle, from development to deployment and ongoing monitoring. It centralizes all governance activities into a unified model that supports enterprise-scale AI adoption.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-16">
            <img 
              src={aiGovernanceDiagram} 
              alt="AI Governance Framework Diagram" 
              className="w-full h-[95vh] object-contain opacity-95"
              style={{ maxWidth: '100vw', maxHeight: '95vh' }}
            />
          </div>

          {/* Core Principles Section */}
          <div className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 shadow-lg border border-blue-100">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Core Principles of AI Governance
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              At the center of the framework lie six foundational principles that define how AI should behave and operate:
            </p>
            <div className="space-y-3 mb-6">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-blue-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-gray-800 text-base md:text-lg leading-relaxed">{principle}</span>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed italic">
              These principles guide every surrounding layer and decision in the AI governance ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Components */}
      <section className="px-6 py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Components Grid */}
          <div className="space-y-10 mb-24">
            {components.map((component, index) => (
              <div 
                key={index}
                className="rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                    {component.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                      {component.title}
                    </h3>
                    <h4 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                      {component.subtitle}
                    </h4>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                      {component.content}
                    </p>
                    
                    {component.includes && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{component.includes.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {component.includes.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {component.roles && (
                      <div className="mb-5">
                        <ul className="space-y-2.5 ml-2">
                          {component.roles.map((role, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{role}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {component.defines && (
                      <div className="mb-5">
                        <ul className="space-y-2.5 ml-2">
                          {component.defines.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {component.obligations && (
                      <div className="mb-5">
                        <ul className="space-y-2.5 ml-2">
                          {component.obligations.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {component.note && (
                          <p className="text-gray-600 italic mt-4 text-base bg-white rounded-lg p-4 shadow-sm">
                            {component.note}
                          </p>
                        )}
                      </div>
                    )}
                    
                    {component.standards && (
                      <div className="mb-5">
                        <ul className="space-y-2.5 ml-2">
                          {component.standards.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {component.ensures && (
                      <div className="mb-5">
                        <ul className="space-y-2.5 ml-2">
                          {component.ensures.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {component.alsoIncludes && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{component.alsoIncludes.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {component.alsoIncludes.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {component.tools && (
                      <div className="mb-5">
                        <ul className="space-y-2.5 ml-2">
                          {component.tools.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <p className="text-gray-700 italic text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                      <span className="font-semibold">Purpose:</span> {component.purpose}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Integrated Compliance Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-10 shadow-xl border border-blue-100 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Integrated Compliance Across the Framework
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              Governance in this framework is continuous, not a one-time checkpoint. It spans:
            </p>
            <ul className="space-y-2.5 ml-2 mb-6">
              {["Data", "Models", "Applications", "Operations", "Organizational structures"].map((item, idx) => (
                <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                  <span className="text-blue-600 mr-3 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 italic text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
              <span className="font-semibold">Purpose:</span> Ensure AI processes remain safe, compliant, and aligned with organizational values throughout their lifecycle.
            </p>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center max-w-5xl mx-auto">
              The AI Governance Framework provides enterprises with a robust structure for overseeing AI responsibly. By integrating roles, risk controls, standards, and monitoring tools and grounding everything in fairness, transparency, ethics, and accountability; organizations can adopt AI confidently and sustainably.
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
