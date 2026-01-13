import { useNavigate } from "react-router-dom";
import aiSolutionsDiagram from "../../assets/ai-solutions.png";

export default function AiSolutionArchitectureFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "Perception Layer",
      subtitle: "Turning Raw Inputs into Usable Intelligence",
      content: "The Perception Layer captures data from multiple sources and transforms it into structured inputs that the AI system can understand.",
      keyComponents: [
        {
          name: "Sensors (Input Sources)",
          description: "AI systems detect and capture real-world signals through:",
          items: [
            "Cameras",
            "IoT sensors",
            "System logs",
            "Human-created content",
            "External knowledge sources"
          ],
          note: "These inputs form the raw data stream that feeds the AI system."
        },
        {
          name: "Input Formatter",
          description: "Converts raw data into structured formats: images, text, signals, embeddings that are ready for processing."
        },
        {
          name: "Input Processing",
          description: "Includes cleaning, normalization, tokenization, and vectorization. This step prepares inputs for deeper reasoning and knowledge storage."
        }
      ],
      purpose: "To enable the AI system to see, hear, and interpret its environment accurately."
    },
    {
      number: "2",
      title: "Brain Layer",
      subtitle: "The Core Intelligence Engine",
      content: "The Brain Layer is where reasoning, decision-making, and knowledge integration occur. It consists of four major elements:",
      sections: [
        {
          letter: "A",
          name: "Knowledge Base",
          description: "The repository of all stored information the AI system relies on, including:",
          items: [
            "Databases",
            "Knowledge graphs",
            "Vector databases",
            "Document stores",
            "Data lakes"
          ],
          note: "Supported by LLMs, Elasticsearch, and other retrieval systems, the Knowledge Base acts as long-term memory.",
          purpose: "Give the AI system context, facts, and historical understanding."
        },
        {
          letter: "B",
          name: "Reasoning Engine",
          description: "This is the cognitive layer: the system's ability to think, plan, and derive insights.",
          capabilities: {
            title: "Capabilities Include:",
            items: [
              "Plan: Multi-step reasoning and chain-of-thought workflows",
              "Retrieve: Pulling relevant context from the Knowledge Base",
              "Inference: Statistical & logical reasoning",
              "Generate: Producing answers, actions, and next steps"
            ]
          },
          methods: {
            title: "Methods Used:",
            items: [
              "Forward chaining",
              "Backward chaining",
              "Bayesian inference",
              "LLM-based inference"
            ]
          },
          purpose: "To emulate human-like thinking: analyzing, connecting, and synthesizing information."
        },
        {
          letter: "C",
          name: "Goals & Utility Function",
          description: "AI systems make decisions based on predefined goals and measurable utility.",
          goals: {
            title: "Goals:",
            items: [
              "Binary goals (Yes/No outcomes)",
              "Rule-based goals",
              "Adaptive multi-step objectives"
            ]
          },
          utility: {
            title: "Utility Function (U(x))",
            description: "The mathematical function that evaluates how 'good' a decision is. It may consider:",
            items: [
              "Rewards",
              "Constraints",
              "Trade-offs",
              "Multi-objective optimization"
            ]
          },
          purpose: "To guide the AI system toward optimal decisions based on measurable outcomes."
        }
      ]
    },
    {
      number: "3",
      title: "Learning Element",
      subtitle: "How the AI System Improves Over Time",
      content: "The Learning Element enables continuous optimization and adaptation through feedback loops.",
      keyComponents: [
        {
          name: "Data Acquisition",
          description: "Gathering new data from users, agents, or environment."
        },
        {
          name: "Feature Extraction",
          description: "Identifying meaningful patterns from raw inputs."
        },
        {
          name: "Model Training",
          description: "Building or refining machine learning models."
        },
        {
          name: "Feedback Mechanisms",
          description: "The AI system compares predicted vs. actual outcomes to improve."
        },
        {
          name: "Adapt, Update & Retrain",
          description: "Ongoing improvement through:",
          items: [
            "Online learning",
            "Meta learning",
            "Reinforcement learning",
            "Periodic retraining"
          ]
        }
      ],
      purpose: "To create AI systems that learn, adapt, and enhance performance autonomously."
    },
    {
      number: "4",
      title: "Supporting Elements",
      subtitle: "Essential Foundations Under the Architecture",
      content: "The system interacts with four enabling environments:",
      items: [
        "External Knowledge Sources – APIs, open datasets, enterprise repositories",
        "AI Agents – Specialized modules that perform tasks",
        "Memory Systems – Short-term and long-term memory structures",
        "Environment – Physical or digital world the AI operates in"
      ],
      note: "These ensure the AI solution behaves like a fully capable intelligent agent."
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
              AI Solution Architecture Framework: The Structural Blueprint Behind Intelligent, Self-Improving AI Systems
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Solution Architecture Framework defines how intelligent systems perceive information, reason through insights, make decisions, and continuously improve through learning. This architecture represents the functional anatomy of an AI system, mirroring how intelligent agents sense, think, act, and evolve over time.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Built across three primary layers: Perception, Brain, and Learning. The framework ensures that AI solutions are structured, scalable, explainable, and aligned with enterprise goals. It brings together sensors, knowledge stores, reasoning engines, utility functions, and learning mechanisms into a single cohesive system.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-16">
            <img 
              src={aiSolutionsDiagram} 
              alt="AI Solution Architecture Framework Diagram" 
              className="w-full object-contain opacity-95"
            />
          </div>
        </div>
      </section>

      {/* Main Content - Layers */}
      <section className="px-6 py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">

          {/* Layers */}
          <div className="space-y-10 mb-24">
            {/* Perception Layer */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="flex items-start gap-6 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                  {layers[0].number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                    {layers[0].title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                    {layers[0].subtitle}
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                    {layers[0].content}
                  </p>
                  
                  <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Key Components:</p>
                  
                  {layers[0].keyComponents.map((component, idx) => (
                    <div key={idx} className="mb-5 ml-2">
                      <h5 className="font-bold text-gray-800 mb-2 text-base md:text-lg">{component.name}</h5>
                      <p className="text-gray-700 mb-2">{component.description}</p>
                      {component.items && (
                        <ul className="space-y-1.5 ml-4">
                          {component.items.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {component.note && (
                        <p className="text-gray-600 italic mt-2 ml-4">{component.note}</p>
                      )}
                    </div>
                  ))}
                  
                  <p className="text-gray-700 italic mt-5 text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                    <span className="font-semibold">Purpose:</span> {layers[0].purpose}
                  </p>
                </div>
              </div>
            </div>

            {/* Brain Layer */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="flex items-start gap-6 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                  {layers[1].number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                    {layers[1].title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                    {layers[1].subtitle}
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                    {layers[1].content}
                  </p>
                  
                  {layers[1].sections.map((section, idx) => (
                    <div key={idx} className="mb-6 bg-white rounded-xl p-6 shadow-sm">
                      <h5 className="text-xl font-bold text-gray-900 mb-3">
                        ({section.letter}) {section.name}
                      </h5>
                      <p className="text-gray-700 mb-3">{section.description}</p>
                      
                      {section.items && (
                        <ul className="space-y-2 ml-4 mb-3">
                          {section.items.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {section.note && (
                        <p className="text-gray-600 italic mb-3">{section.note}</p>
                      )}
                      
                      {section.capabilities && (
                        <div className="mb-3">
                          <p className="font-semibold text-gray-800 mb-2">{section.capabilities.title}</p>
                          <ul className="space-y-2 ml-4">
                            {section.capabilities.items.map((item, i) => (
                              <li key={i} className="text-gray-700 flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.methods && (
                        <div className="mb-3">
                          <p className="font-semibold text-gray-800 mb-2">{section.methods.title}</p>
                          <ul className="space-y-2 ml-4">
                            {section.methods.items.map((item, i) => (
                              <li key={i} className="text-gray-700 flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.goals && (
                        <div className="mb-3">
                          <p className="font-semibold text-gray-800 mb-2">{section.goals.title}</p>
                          <ul className="space-y-2 ml-4">
                            {section.goals.items.map((item, i) => (
                              <li key={i} className="text-gray-700 flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.utility && (
                        <div className="mb-3">
                          <p className="font-semibold text-gray-800 mb-2">{section.utility.title}</p>
                          <p className="text-gray-700 mb-2">{section.utility.description}</p>
                          <ul className="space-y-2 ml-4">
                            {section.utility.items.map((item, i) => (
                              <li key={i} className="text-gray-700 flex items-start">
                                <span className="text-blue-600 mr-2">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <p className="text-blue-700 font-semibold mt-3">
                        Purpose: {section.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Element */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="flex items-start gap-6 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                  {layers[2].number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                    {layers[2].title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                    {layers[2].subtitle}
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                    {layers[2].content}
                  </p>
                  
                  <p className="text-gray-700 font-semibold mb-3 text-base md:text-lg">Key Components:</p>
                  
                  {layers[2].keyComponents.map((component, idx) => (
                    <div key={idx} className="mb-4 ml-2">
                      <h5 className="font-bold text-gray-800 mb-2 text-base md:text-lg">{component.name}</h5>
                      <p className="text-gray-700 mb-2">{component.description}</p>
                      {component.items && (
                        <ul className="space-y-1.5 ml-4">
                          {component.items.map((item, i) => (
                            <li key={i} className="text-gray-700 flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  
                  <p className="text-gray-700 italic mt-5 text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                    <span className="font-semibold">Purpose:</span> {layers[2].purpose}
                  </p>
                </div>
              </div>
            </div>

            {/* Supporting Elements */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-200">
              <div className="flex items-start gap-6 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                  {layers[3].number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                    {layers[3].title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold text-blue-700 mb-4">
                    {layers[3].subtitle}
                  </h4>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                    {layers[3].content}
                  </p>
                  
                  <ul className="space-y-2.5 ml-2 mb-5">
                    {layers[3].items.map((item, idx) => (
                      <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                        <span className="text-blue-600 mr-3 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-gray-600 italic">{layers[3].note}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center max-w-5xl mx-auto">
              The AI Solution Architecture Framework provides a complete blueprint for designing robust, intelligent, scalable AI systems. By combining perception, reasoning, knowledge, utility-driven decision-making, and continuous learning, this framework ensures AI solutions behave intelligently, responsibly, and effectively within real-world environments.
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
