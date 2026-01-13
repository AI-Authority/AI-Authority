import { useNavigate } from "react-router-dom";
import aiOperationsDiagram from "../../assets/ai-operations.png";

export default function AiOperationsFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "Data Sources Layer",
      subtitle: "Where Operations Insights Begin",
      content: "This foundational layer collects raw signals from all components of the enterprise environment.",
      keyInputs: {
        title: "Key Data Inputs:",
        items: [
          "Infrastructure – servers, compute nodes, containers, Kubernetes",
          "Applications – logs, performance metrics, usage patterns",
          "Networks – latency, packet loss, bandwidth patterns",
          "Cloud Services – cloud APIs, resource utilization, autoscaling logs"
        ]
      },
      purpose: "Provide comprehensive visibility across every operational component that influences AI performance."
    },
    {
      number: "2",
      title: "Monitoring & Observability Layer",
      subtitle: "Continuous, Real-Time Awareness of System Health",
      content: "This layer transforms raw data into observable insights that help teams understand system behavior.",
      capabilities: {
        title: "Core Capabilities:",
        items: [
          "Metrics Collection – CPU, memory, GPU usage, throughput, latency",
          "Log Analytics – log correlation, error pattern detection",
          "Tracing – request tracing across distributed systems and microservices"
        ]
      },
      purpose: "Enable deep observability, ensuring AI services are measurable and trackable from end to end."
    },
    {
      number: "3",
      title: "AI Ops Platform Layer",
      subtitle: "The Automation & Intelligence Engine of AIOps",
      content: "The platform layer is where AI and ML techniques turn data into actionable operational insights.",
      components: [
        {
          name: "Event Correlation",
          items: [
            "Connects related alerts and system signals into unified events",
            "Reduces noise and eliminates alert fatigue"
          ]
        },
        {
          name: "Incident Management",
          items: [
            "Prioritizes incidents",
            "Suggests remediation steps",
            "Enables automated or semi-automated resolution"
          ]
        }
      ],
      purpose: "To automate operational intelligence and accelerate incident response."
    },
    {
      number: "4",
      title: "Analytics & AI/ML Layer",
      subtitle: "Advanced Insights That Predict and Prevent Issues",
      content: "This layer applies machine learning and statistical analysis to detect anomalies, pinpoint root causes, and forecast system behavior.",
      functions: [
        {
          name: "Anomaly Detection",
          items: [
            "Identifies unusual patterns in metrics, logs, or traces",
            "Predicts potential failures before they occur"
          ]
        },
        {
          name: "Root Cause Analysis (RCA)",
          items: [
            "Uses ML models to trace failures back to their source",
            "Provides clear, data-backed explanations"
          ]
        }
      ],
      purpose: "Move from reactive troubleshooting to proactive and predictive operations."
    },
    {
      number: "5",
      title: "User Interface Layer",
      subtitle: "Human-Centric Visibility and Action Controls",
      content: "The UI layer provides dashboards and notifications that allow teams to view insights and take immediate action.",
      features: [
        {
          name: "Dashboards",
          items: [
            "Real-time performance visualizations",
            "System health summaries",
            "Workflow-specific insights"
          ]
        },
        {
          name: "Alerts & Notifications",
          items: [
            "Automated alerts for anomalies, incidents, or threshold breaches",
            "Configurable notifications for teams and systems"
          ]
        }
      ],
      purpose: "To give operations, SRE, DevOps, and AI teams intuitive interfaces to monitor, manage, and respond effectively."
    },
    {
      number: "6",
      title: "Governance, Security & Compliance (Vertical Pillars)",
      subtitle: "Operational Integrity at Every Layer",
      content: "These principles sit across all layers of AIOps to ensure consistent control, safety, and regulatory compliance.",
      includes: {
        title: "Includes:",
        items: [
          "Access control",
          "Data governance",
          "Security compliance",
          "Policy enforcement",
          "Auditability and traceability"
        ]
      },
      purpose: "Guarantee that every operational process that are automated or human-involved is secure, compliant, and accountable."
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
              AI Operations Framework: Intelligent Operations That Keep AI Systems Reliable, Scalable, and Always-On
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Operations (AIOps) Framework defines how enterprises monitor, manage, troubleshoot, and optimize their AI and IT systems using advanced analytics, automation, and machine learning. As AI workloads scale across cloud, edge, and hybrid environments, traditional operations are no longer enough. AIOps brings intelligence to operations, allowing teams to detect issues faster, resolve incidents automatically, and maintain peak system performance with minimal human intervention.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              This framework breaks AIOps into clear, structured layers right from raw data ingestion to automated insights, visualization, and governance, ensuring reliability and operational excellence across the entire AI ecosystem.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-16">
            <img 
              src={aiOperationsDiagram} 
              alt="AI Operations Framework Diagram" 
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
                    
                    {layer.keyInputs && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{layer.keyInputs.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.keyInputs.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {layer.capabilities && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{layer.capabilities.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.capabilities.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {layer.components && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Key Components:</p>
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
                    
                    {layer.functions && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Major Functions:</p>
                        <div className="space-y-4">
                          {layer.functions.map((func, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                              <h5 className="font-bold text-gray-900 mb-2">{func.name}</h5>
                              <ul className="space-y-2 ml-2">
                                {func.items.map((item, i) => (
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
                    
                    {layer.features && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">UI Features:</p>
                        <div className="space-y-4">
                          {layer.features.map((feature, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-5 shadow-sm">
                              <h5 className="font-bold text-gray-900 mb-2">{feature.name}</h5>
                              <ul className="space-y-2 ml-2">
                                {feature.items.map((item, i) => (
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
                    
                    {layer.includes && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{layer.includes.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.includes.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
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

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center max-w-5xl mx-auto">
              The AI Operations Framework delivers a comprehensive model for managing AI-driven systems at scale. By combining observability, automation, ML-based insights, and strong governance, AIOps ensures the reliability, performance, and trustworthiness of AI applications across complex enterprise environments.
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
