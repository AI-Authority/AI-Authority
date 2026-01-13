import { useNavigate } from "react-router-dom";
import aiSecurityDiagram from "../../assets/ai-security.png";

export default function AiSecurityFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "User Interface Layer",
      subtitle: "Secure visibility and communication for operational teams",
      content: "This top layer ensures that all insights, alerts, and monitoring dashboards accessible to end-users operate securely.",
      components: [
        {
          name: "Dashboards",
          items: [
            "Provide secure, role-based visibility into system health and threats",
            "Display security alerts, risk scores, and real-time metrics"
          ]
        },
        {
          name: "Alerts / Notifications",
          items: [
            "Notify teams of threats, anomalies, model risks, or infrastructure vulnerabilities",
            "Support escalation workflows and audit logs"
          ]
        }
      ],
      purpose: "Ensure operators receive accurate, timely, and secure security insights for proactive action."
    },
    {
      number: "2",
      title: "AI Security Controls",
      subtitle: "The core defense against AI-specific threats",
      content: "This layer introduces AI-centric security mechanisms tailored to protect models and systems from adversarial attacks.",
      keyComponents: [
        {
          name: "Threat Detection",
          items: [
            "Identifies unusual activity, model anomalies, adversarial inputs",
            "Detects data poisoning, model manipulation, or prompt injection (LLMs)"
          ]
        },
        {
          name: "Vulnerability Management",
          items: [
            "Scans AI pipelines for weaknesses",
            "Includes patching, configuration management, secure dependency management"
          ]
        }
      ],
      purpose: "Provide proactive defenses to reduce AI-specific attack vectors before they cause impact."
    },
    {
      number: "3",
      title: "AI Model Lifecycle Security",
      subtitle: "Security embedded across the entire AI lifecycle",
      content: "AI models require continuous oversight from development through deployment.",
      coreComponents: [
        {
          name: "Model Risk Assessment",
          items: [
            "Evaluates vulnerability to bias, leakage, adversarial attacks, or misuse",
            "Helps classify risk levels and required controls"
          ]
        },
        {
          name: "Secure Model Development",
          items: [
            "Enforces secure coding practices",
            "Includes threat modelling, validation, and cryptographic safeguards",
            "Ensures training processes and data remain secure"
          ]
        },
        {
          name: "Model Monitoring",
          items: [
            "Tracks drift, anomalies, performance degradation, and malicious interference",
            "Supports runtime security and compliance monitoring"
          ]
        }
      ],
      purpose: "Ensure models remain trustworthy, secure, and aligned with governance rules even after deployment."
    },
    {
      number: "4",
      title: "Data & Infrastructure Security",
      subtitle: "The foundation that protects everything beneath AI systems",
      content: "This layer secures the underlying data, infrastructure, and environments where AI operates.",
      keyComponents: [
        {
          name: "Data Protection",
          items: [
            "Encryption (at rest/in transit)",
            "Data masking, anonymization, tokenization",
            "Prevents unauthorized access or exposure"
          ]
        },
        {
          name: "Access Control",
          items: [
            "Enforces least-privilege access to data, models, pipelines",
            "Includes role-based and attribute-based access controls"
          ]
        },
        {
          name: "Secure Deployment",
          items: [
            "Ensures AI models are deployed in hardened environments",
            "Container security, network segmentation, secure endpoints",
            "Protects APIs from injection, scraping, or exploit attempts"
          ]
        }
      ],
      purpose: "Provide a robust security foundation that prevents breaches, unauthorized access, and system compromise."
    }
  ];

  const risks = [
    "Model manipulation",
    "Prompt injection",
    "Data poisoning",
    "Adversarial attacks",
    "Leakage of sensitive data",
    "LLM hallucination risks",
    "API exploitation",
    "Unauthorized model replication"
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
              AI Security Framework: Protecting AI Systems, Data, and Models Across Their Entire Lifecycle
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Security Framework provides a structured approach for safeguarding AI systems from emerging threats, vulnerabilities, and misuse. As organizations deploy AI models from predictive systems to large-scale generative AI security becomes an essential pillar of responsible AI.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              This framework ensures that every layer of AI, from data pipelines to model development to deployment; remains secure, compliant, and resilient against attacks.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              The architecture consists of four integrated layers: user interface security, AI security controls, model lifecycle security, and data/infrastructure protection.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-16">
            <img 
              src={aiSecurityDiagram} 
              alt="AI Security Framework Diagram" 
              className="w-full max-w-7xl object-contain opacity-95"
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
                    
                    {layer.components && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Components:</p>
                        <div className="space-y-4">
                          {layer.components.map((component, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                              <h5 className="font-bold text-gray-900 mb-2">{component.name}</h5>
                              <ul className="space-y-2 ml-2">
                                {component.items.map((item, i) => (
                                  <li key={i} className="text-gray-700 flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {layer.keyComponents && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Key Components:</p>
                        <div className="space-y-4">
                          {layer.keyComponents.map((component, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                              <h5 className="font-bold text-gray-900 mb-2">{component.name}</h5>
                              <ul className="space-y-2 ml-2">
                                {component.items.map((item, i) => (
                                  <li key={i} className="text-gray-700 flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {layer.coreComponents && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Core Components:</p>
                        <div className="space-y-4">
                          {layer.coreComponents.map((component, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                              <h5 className="font-bold text-gray-900 mb-2">{component.name}</h5>
                              <ul className="space-y-2 ml-2">
                                {component.items.map((item, i) => (
                                  <li key={i} className="text-gray-700 flex items-start">
                                    <span className="text-blue-600 mr-2">•</span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-gray-700 italic text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                      <span className="font-semibold">Purpose:</span> {layer.purpose}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why AI Security Matters Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-10 shadow-xl border border-blue-100 mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why AI Security Matters
            </h3>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              As AI systems grow more powerful and autonomous, they introduce new risks that traditional cybersecurity cannot address alone. AI Security ensures protection against:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {risks.map((risk, index) => (
                <div key={index} className="flex items-start bg-white rounded-xl p-4 shadow-sm">
                  <span className="text-blue-600 mr-3 font-bold text-lg">•</span>
                  <span className="text-gray-800 text-base md:text-lg leading-relaxed">{risk}</span>
                </div>
              ))}
            </div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed italic font-medium">
              A secure AI system is not only safer, it is more reliable, compliant, and trustworthy.
            </p>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center max-w-5xl mx-auto">
              The AI Security Framework establishes a complete architecture for protecting AI systems end-to-end. By securing the user interface, enforcing AI-focused security controls, embedding protective measures throughout the model lifecycle, and ensuring strong data and infrastructure protection, organizations can deploy AI with confidence and resilience.
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
