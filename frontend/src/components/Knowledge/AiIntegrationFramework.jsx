import { useNavigate } from "react-router-dom";
import aiIntegrationDiagram from "../../assets/ai-integration.png";

export default function AiIntegrationFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "Data Layer",
      subtitle: "The foundation for integrated and production-ready AI",
      content: "AI systems depend on clean, connected, and continuously flowing data. The Data Layer ensures all AI inputs are accessible, reliable, and governed.",
      components: {
        title: "Core Components:",
        items: [
          "Data Sources – enterprise systems, cloud services, IoT, operational databases",
          "Data Ingestion – ETL/ELT pipelines, API feeds, streaming ingestion",
          "Data Lake / Warehouse – unified storage for structured and unstructured data",
          "Feature Store – reusable features for consistent model training and inference"
        ]
      },
      purpose: "Enable consistent, governed, and high-quality data flow into AI systems."
    },
    {
      number: "2",
      title: "AI / ML Layer",
      subtitle: "Where models are built, trained, tracked, and managed",
      content: "This layer contains all the tools and systems required to create and maintain AI models.",
      components: {
        title: "Core Components:",
        items: [
          "Model Development – experimentation, prototyping, and model selection",
          "Model Registry – versioning, documentation, lifecycle management",
          "Model Training – batch, online, and distributed training workflows"
        ]
      },
      purpose: "Ensure models are built correctly, reproducibly, and ready for deployment at scale."
    },
    {
      number: "3",
      title: "Integration & Orchestration Layer",
      subtitle: "Connecting AI models to the enterprise ecosystem",
      content: "This layer ensures AI models can be deployed, consumed, and orchestrated across applications.",
      detailedComponents: [
        {
          name: "API Gateway / Microservices",
          items: [
            "Deliver AI models as scalable services",
            "Provide authentication, throttling, routing"
          ]
        },
        {
          name: "Event Bus / Messaging",
          items: [
            "Enables real-time event-driven AI interactions",
            "Integrates with Kafka, Pub/Sub, SNS/SQS, etc."
          ]
        },
        {
          name: "Model Deployment",
          items: [
            "Deploy models via containers, serverless, edge endpoints",
            "Support CI/CD and automated retraining pipelines"
          ]
        }
      ],
      purpose: "Make AI interoperable, scalable, and easy to consume across all business systems."
    },
    {
      number: "4",
      title: "Application Layer",
      subtitle: "Where AI creates business impact",
      content: "AI becomes valuable when embedded directly into business applications and enterprise workflows.",
      components: {
        title: "Core Components:",
        items: [
          "Business Applications – CRM, ERP, HRM, supply chain, customer experience systems",
          "API Bus / Microservices – bridges between applications and AI capabilities",
          "Analytics Dashboards – visualizing AI insights, predictions, and decisions"
        ]
      },
      purpose: "Deliver AI features and intelligence to users, departments, and processes."
    },
    {
      number: "5",
      title: "User / Interaction Layer",
      subtitle: "Human-centered interfaces that bring AI to life",
      content: "This layer defines how end-users' access and interact with AI.",
      interactions: {
        title: "Key Modes of Interaction:",
        items: [
          "UI/UX – intuitive interfaces for humans to work with AI insights",
          "APIs / SDKs – programmatic access for developers and systems",
          "Conversational Interfaces – chatbots, LLM-based assistants, voice agents"
        ]
      },
      purpose: "Make AI accessible, usable, and intuitive across the organization."
    },
    {
      number: "6",
      title: "Governance, Security & Monitoring (Vertical Pillars)",
      subtitle: "Trust, oversight, and compliance embedded in every layer",
      content: "These principles ensure AI integrations remain safe, compliant, and reliable at scale.",
      includes: {
        title: "Includes:",
        items: [
          "AI Governance Framework – policies, rules, ethical standards",
          "Model Monitoring – drift detection, performance tracking, reliability checks",
          "Security – access control, API security, model protections",
          "Compliance – regulatory requirements such as GDPR, ISO, SOC",
          "Auditability – tracking how data and models are used"
        ]
      },
      purpose: "Maintain trust, transparency, and accountability across all AI integrations."
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
              AI Integration Framework: Connecting AI Systems Seamlessly Across Applications, Data, and Business Workflows
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Integration Framework defines how AI capabilities are embedded into enterprise systems in a reliable, scalable, and secure way. As organizations adopt AI models, LLMs, microservices, and agentic workflows, integration becomes the backbone that ensures these intelligent components work together across applications, data pipelines, and user experiences.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              This framework breaks down AI integration into five structured layers: spanning data, machine learning, orchestration, applications, and user interaction, while embedding governance, monitoring, security, and compliance across every stage.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-8">
            <img 
              src={aiIntegrationDiagram} 
              alt="AI Integration Framework Diagram" 
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
                    
                    {layer.components && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{layer.components.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.components.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {layer.detailedComponents && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Core Components:</p>
                        <div className="space-y-4">
                          {layer.detailedComponents.map((component, idx) => (
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
                    
                    {layer.interactions && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">{layer.interactions.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.interactions.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
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
              The AI Integration Framework provides a comprehensive blueprint for embedding AI across enterprise environments by connecting data, models, systems, and user experiences through a unified, secure, and scalable architecture. With strong governance and orchestration at its core, this framework enables organizations to deploy AI with confidence, speed, and long-term reliability.
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
