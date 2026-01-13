import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/Untitled-design-27.png";
import aiStrategyDiagram from "../../assets/ai-strategy-diagram.png";

export default function AiStrategyFramework() {
  const navigate = useNavigate();

  const components = [
    {
      number: "1",
      title: "Stakeholders",
      content: "Every AI strategy begins with a clear understanding of who is involved and who is impacted. Stakeholders may include:",
      list: [
        "Executives",
        "Employees",
        "Customers",
        "Partners",
        "Regulators",
        "Society"
      ],
      footer: "Identifying stakeholders ensures the strategy reflects real needs, expectations, and desired outcomes."
    },
    {
      number: "2",
      title: "Concerns (Interests)",
      content: "Concerns represent stakeholder interests, not fears. They clarify what matters most to each group.",
      subtitle: "Common interest areas include:",
      list: [
        "Efficiency and automation",
        "Customer experience",
        "Regulatory compliance",
        "Data-driven decision-making"
      ],
      footer: "Understanding these concerns keeps the strategy relevant, human-centered, and aligned with organizational priorities."
    },
    {
      number: "3",
      title: "Vision",
      content: "Vision defines the organization's long-term direction for AI, typically over a 3–5-year horizon.",
      subtitle: "A strong AI vision answers:",
      list: [
        "What will AI enable us to do?",
        "What capabilities will we build?",
        "How will our business evolve with AI?"
      ],
      footer: "This vision becomes the north star guiding all AI initiatives."
    },
    {
      number: "4",
      title: "Value",
      content: "Before executing any roadmap, organizations must evaluate the value AI can deliver across multiple dimensions:",
      sections: [
        {
          title: "Business Value",
          description: "ROI, cost efficiencies, revenue growth, productivity gains"
        },
        {
          title: "Societal Value",
          description: "Better healthcare, safer mobility, accessible education, sustainability"
        },
        {
          title: "Technological Value",
          description: "Automation, ML capabilities, analytics, NLP, computer vision"
        },
        {
          title: "Ethical & Responsible Value",
          description: "Fairness, transparency, privacy protection, accountability"
        }
      ],
      footer: "A value assessment ensures every initiative is purposeful and beneficial."
    },
    {
      number: "5",
      title: "Assessment (Readiness & Risk)",
      content: "Assessment determines whether the organization is prepared to move forward with AI adoption.",
      subtitle: "Typical questions include:",
      list: [
        "Do we have the right data foundation?",
        "Do we have the required talent and infrastructure?",
        "Is leadership aligned?",
        "What risks exist: financial, ethical, operational, or technical?"
      ],
      footer: "This stage includes readiness scoring and comprehensive AI risk analysis."
    },
    {
      number: "6",
      title: "Enablement",
      content: "Enablement identifies the capabilities required to support AI programs at scale.",
      subtitle: "This includes:",
      list: [
        "Data platforms",
        "Cloud infrastructure",
        "MLOps ecosystems",
        "Automation frameworks",
        "Governance structures",
        "Security controls",
        "Talent development and training"
      ],
      footer: "Enablement provides the operational backbone for successful execution."
    },
    {
      number: "7",
      title: "Roadmap",
      content: "The roadmap outlines how the strategy will be executed over the next 3–5 years.",
      subtitle: "A complete roadmap includes:",
      list: [
        "Priority initiatives",
        "Milestones and timelines",
        "Dependencies",
        "Budget and investment planning",
        "Governance and accountability models"
      ],
      footer: "The roadmap ensures clarity, structure, and measurable strategic progress."
    },
    {
      number: "8",
      title: "Implementation",
      content: "Implementation brings the strategy to life.",
      subtitle: "This involves:",
      list: [
        "Running pilot projects",
        "Testing and validating models",
        "Scaling successful use cases",
        "Monitoring performance, risk, and compliance",
        "Ensuring ethical and responsible deployment"
      ],
      footer: "Implementation is where AI creates real impact: delivering business value, improving customer outcomes, and transforming operations."
    }
  ];

  const workApproach = [
    {
      title: "Stakeholder Discovery",
      description: "We identify the key people, processes, and decision areas that AI will influence, helping us understand what truly matters and where the highest-value opportunities exist."
    },
    {
      title: "Readiness & Value Assessment",
      description: "We evaluate your current data, technology, skills, and alignment to determine how prepared the organization is. This includes understanding risks, constraints, and the potential value AI can unlock across business, societal, technological, and ethical dimensions."
    },
    {
      title: "Roadmap & Prioritization",
      description: "We design a clear, structured 3–5-year plan that prioritizes high-impact AI initiatives, defines milestones, allocates responsibilities, and ensures every step ties back to measurable business outcomes."
    },
    {
      title: "Pilot & Implementation Support",
      description: "We guide you from initial proof-of-concepts to full-scale deployment; ensuring solutions are reliable, ethical, and integrated smoothly into daily operations. This includes continuous performance monitoring, optimization, and governance."
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
              AI Strategy Framework: A Comprehensive Approach to Building, Executing, and Scaling AI Strategy
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              The AI Strategy Framework provides organizations with a clear, end-to-end structure for defining, planning, and implementing AI initiatives. It brings together all the foundational and execution-focused elements required to transform AI vision into measurable business value. Below are the core components of the AI Strategy framework.
            </p>
          </div>


          {/* Main Content - Two Columns */}
          <div className="flex flex-col lg:flex-row items-center gap-0">
            <div className="w-full flex justify-center items-center mb-0">
              <img 
                src={aiStrategyDiagram} 
                alt="AI Strategy Framework Diagram" 
                className="w-full h-[95vh] object-contain opacity-95 mix-blend-multiply"
                style={{ maxWidth: '100vw', maxHeight: '95vh' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
  <section className="px-6 pt-0 pb-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Components Grid */}
          <div className="space-y-10 mb-24">
            {components.map((component, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-6 mb-4">
                  <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                    {component.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                      {component.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                      {component.content}
                    </p>
                    
                    {component.subtitle && (
                      <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">
                        {component.subtitle}
                      </p>
                    )}
                    
                    {component.list && (
                      <ul className="space-y-2.5 mb-5 ml-2">
                        {component.list.map((item, idx) => (
                          <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                            <span className="text-blue-600 mr-3 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {component.sections && (
                      <div className="space-y-4 mb-5">
                        {component.sections.map((section, idx) => (
                          <div key={idx} className="ml-2">
                            <h4 className="font-semibold text-gray-800 mb-2 text-base md:text-lg">
                              • {section.title}
                            </h4>
                            <p className="text-gray-600 ml-6 text-base leading-relaxed">
                              {section.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {component.footer && (
                      <p className="text-gray-700 italic mt-5 text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                        {component.footer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How AI Authority Works */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
              How AI Authority Works with You
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 max-w-4xl">
              We follow a fast, structured, and practical approach to ensure AI delivers measurable impact across your organization.
            </p>
            
            <div className="space-y-6">
              {workApproach.map((step, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                    <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-base font-bold shadow-md flex-shrink-0">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed ml-14">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
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
