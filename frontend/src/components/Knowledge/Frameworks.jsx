import { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Untitled-design-27.png";

export default function Frameworks() {
  const navigate = useNavigate();
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const allFrameworks = {
    governance: {
      title: "AI Governance",
      description: "Effective AI Governance is the critical overlay that ensures your AI initiatives are both innovative and responsible. This specification focuses on establishing the policies, processes, and oversight structures needed to manage AI throughout its lifecycle. We define clear frameworks for accountability, risk management, and regulatory compliance, ensuring that AI decisions are transparent, auditable, and aligned with organizational values. By implementing a strong governance model, you can mitigate legal and reputational risks while fostering a culture of trust and ethical responsibility in all AI endeavors."
    },
    security: {
      title: "AI Security",
      description: "As AI systems become central to business operations, AI Security becomes a paramount concern. This specification addresses the unique security vulnerabilities inherent in AI, such as adversarial attacks, model inversion, and data poisoning. We provide best practices for securing your entire AI ecosystem, from protecting your data and models to implementing resilient deployment and monitoring systems. Our guidance ensures that your AI initiatives are not only high-performing and ethical but also robustly defended against malicious threats, safeguarding your assets and maintaining the integrity of your AI-driven decisions."
    }
  };

  const frameworks = [
    {
      title: "AI Strategy",
      description: "A robust AI strategy is the foundational blueprint for success, transforming ambitious goals into actionable plans. We provide comprehensive frameworks to help organizations define their AI vision, align AI initiatives with core business objectives, and identify high-impact use cases. Our approach goes beyond simple technology adoption, focusing on strategic roadmaps that consider organizational readiness, data infrastructure, and resource allocation. By establishing a clear, forward-looking AI strategy, you can ensure that every AI investment drives tangible business value and builds a competitive advantage."
    },
    {
      title: "Enterprise AI Architecture",
      description: "Building a resilient and scalable AI ecosystem requires a well-defined Enterprise AI Architecture. This specification focuses on designing a holistic, organization-wide framework that supports a multitude of AI applications and data flows. We define the standards for a secure and integrated infrastructure, from data ingestion pipelines to model deployment platforms and monitoring systems. Our guidance ensures your AI architecture is not only technologically sound but also flexible enough to evolve with future innovations, enabling seamless collaboration and standardized governance across your entire enterprise."
    },
    {
      title: "AI Solution Architecture",
      description: "The success of any individual AI project hinges on a thoughtful AI Solution Architecture. This involves the detailed design of a specific AI application, from selecting the right machine learning algorithms to defining the data pipelines and integration points with existing systems. Our expertise helps you translate business requirements into a technically sound and ethical solution, with a focus on mitigating bias, ensuring data privacy, and implementing transparency by design. A well-crafted solution architecture guarantees that your AI application is not only effective but also reliable, secure, and ready for responsible deployment."
    },
    {
      title: "AI Engineering",
      description: "AI Engineering focuses on the practical implementation and deployment of AI systems at scale. This involves building robust data pipelines, implementing MLOps practices, and creating scalable infrastructure for AI applications. Our approach emphasizes reliability, performance optimization, and maintainability of AI systems in production environments."
    },
    {
      title: "AI Computing",
      description: "AI Computing encompasses the computational resources and infrastructure required to power AI applications. This includes understanding hardware requirements, cloud computing strategies, distributed computing for AI workloads, and optimization techniques to ensure efficient resource utilization and cost-effective AI operations."
    },
    {
      title: "AI Operations",
      description: "AI Operations (AIOps) focuses on the operational aspects of AI systems, including monitoring, maintenance, and continuous improvement of AI applications in production. This framework covers deployment strategies, performance monitoring, model drift detection, and automated remediation processes to ensure reliable AI system operations."
    },
    {
      title: "AI Integration",
      description: "AI Integration addresses the seamless incorporation of AI capabilities into existing business processes and systems. This framework provides guidelines for API design, data integration, workflow automation, and change management to ensure AI solutions enhance rather than disrupt existing operations while maximizing business value."
    }
  ];

  const handleFrameworkClick = (framework, type = 'center') => {
    if (framework.title === "AI Strategy") {
      navigate('/frameworks/ai-strategy');
    } else if (framework.title === "Enterprise AI Architecture") {
      navigate('/frameworks/enterprise-ai-architecture');
    } else if (framework.title === "AI Solution Architecture") {
      navigate('/frameworks/ai-solution-architecture');
    } else if (framework.title === "AI Engineering") {
      navigate('/frameworks/ai-engineering');
    } else if (framework.title === "AI Computing") {
      navigate('/frameworks/ai-computing');
    } else if (framework.title === "AI Operations") {
      navigate('/frameworks/ai-operations');
    } else if (framework.title === "AI Integration") {
      navigate('/frameworks/ai-integration');
    } else if (framework.title === "AI Governance") {
      navigate('/frameworks/ai-governance');
    } else if (framework.title === "AI Security") {
      navigate('/frameworks/ai-security');
    } else {
      setSelectedFramework(framework);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFramework(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section 
        className="bg-cover bg-center bg-no-repeat relative py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Subtle background overlay for better contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="relative z-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Frameworks
            </h1>
            <p className="text-xl md:text-2xl text-white font-semibold max-w-5xl mx-auto mb-6 drop-shadow-lg">
              A unified blueprint for designing, developing, governing, and scaling AI responsibly
            </p>
            <p className="text-base md:text-lg text-white max-w-5xl mx-auto leading-relaxed drop-shadow-md">
              The AI Authority Frameworks provide a structured, end-to-end approach to understanding, building, and governing artificial intelligence across modern enterprises. In a world where AI adoption is accelerating faster than ever, organizations need clear standards, architectural guidance, and governance models that ensure AI systems are effective, ethical, secure, and scalable. Each framework within the AI Authority ecosystem addresses a critical pillar of the AI lifecycle, from strategy and enterprise architecture to engineering, operations, integration, governance, and security. Together, these frameworks form a complete methodology that helps businesses, practitioners, and leaders develop AI capabilities with confidence, clarity, and long-term sustainability.
            </p>
          </div>
        </div>
      </section>

      {/* Main Frameworks Section */}
      <section className="px-4 md:px-6 py-8 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-5xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative min-h-[420px] flex items-center justify-center py-8">
              {/* Left Pillar - AI Governance */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <button 
                  onClick={() => handleFrameworkClick(allFrameworks.governance)}
                  className="bg-white bg-opacity-70 backdrop-blur-sm rounded-full px-5 py-2.5 transform -rotate-90 hover:bg-white hover:bg-opacity-90 hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer group border border-white border-opacity-50 hover:border-blue-300 shadow-lg"
                  style={{ width: '420px', height: '50px' }}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-700 font-medium text-sm whitespace-nowrap group-hover:text-blue-700 transition-colors duration-300">
                      AI Governance
                    </span>
                  </div>
                </button>
              </div>

              {/* Right Pillar - AI Security */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <button 
                  onClick={() => handleFrameworkClick(allFrameworks.security)}
                  className="bg-white bg-opacity-70 backdrop-blur-sm rounded-full px-5 py-2.5 transform rotate-90 hover:bg-white hover:bg-opacity-90 hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer group border border-white border-opacity-50 hover:border-blue-300 shadow-lg"
                  style={{ width: '420px', height: '50px' }}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-700 font-medium text-sm whitespace-nowrap group-hover:text-blue-700 transition-colors duration-300">
                      AI Security
                    </span>
                  </div>
                </button>
              </div>

              {/* Center Framework Capsules */}
              <div className="flex flex-col items-center space-y-2.5 px-40">
                {frameworks.map((framework, index) => (
                  <button
                    key={index}
                    onClick={() => handleFrameworkClick(framework)}
                    className="w-full px-8 py-3 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-lg bg-white bg-opacity-70 backdrop-blur-sm text-gray-800 border border-white border-opacity-50 hover:border-blue-300 hover:bg-white hover:bg-opacity-90 group shadow-md"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                      minWidth: '450px',
                      height: '50px'
                    }}
                  >
                    <span className="font-medium text-sm group-hover:text-blue-700 transition-colors duration-300">
                      {framework.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {/* All Framework Buttons - Stacked Vertically */}
            {frameworks.map((framework, index) => (
              <button
                key={index}
                onClick={() => handleFrameworkClick(framework)}
                className="w-full px-6 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 border border-white border-opacity-50 hover:border-blue-300 hover:bg-white group shadow-md"
              >
                <span className="font-medium text-base md:text-lg group-hover:text-blue-700 transition-colors duration-300">
                  {framework.title}
                </span>
              </button>
            ))}
            
            {/* AI Governance - Below main frameworks */}
            <button 
              onClick={() => handleFrameworkClick(allFrameworks.governance)}
              className="w-full px-6 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 border border-white border-opacity-50 hover:border-blue-300 hover:bg-white group shadow-md"
            >
              <span className="font-medium text-base md:text-lg group-hover:text-blue-700 transition-colors duration-300">
                AI Governance
              </span>
            </button>

            {/* AI Security - Last */}
            <button 
              onClick={() => handleFrameworkClick(allFrameworks.security)}
              className="w-full px-6 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white bg-opacity-90 backdrop-blur-sm text-gray-800 border border-white border-opacity-50 hover:border-blue-300 hover:bg-white group shadow-md"
            >
              <span className="font-medium text-base md:text-lg group-hover:text-blue-700 transition-colors duration-300">
                AI Security
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Overlay */}
      {showModal && selectedFramework && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl p-10 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl transform transition-all duration-500 animate-modalSlideIn border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-white border-b border-gray-200 rounded-t-2xl p-6 mb-8 relative">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-bold text-gray-800 pr-8 leading-tight">
                  {selectedFramework.title}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-3xl font-light hover:rotate-90 transition-all duration-300 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {selectedFramework.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-pulse-subtle {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.2);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }

        .group:hover .animate-pulse-subtle {
          animation: none;
        }
      `}</style>
    </div>
  );
}