import { useNavigate } from "react-router-dom";
import aiEngineeringDiagram from "../../assets/ai-engineering.png";

export default function AiEngineeringFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "Artificial Intelligence (AI)",
      subtitle: "The Broadest Domain of Intelligent Systems",
      content: "AI represents all technologies that enable machines to perform tasks requiring human-like intelligence: reasoning, problem solving, perception, decision-making, and learning. This layer encompasses the entire universe of intelligent capabilities."
    },
    {
      number: "2",
      title: "Machine Learning (ML)",
      subtitle: "Systems That Learn from Data",
      content: "Machine Learning is a subset of AI where algorithms train on data to recognize patterns and make predictions. This includes:",
      items: [
        "Supervised learning",
        "Unsupervised learning",
        "Reinforcement learning",
        "Probabilistic models"
      ],
      note: "ML forms the foundation of most modern AI applications."
    },
    {
      number: "3",
      title: "Neural Networks",
      subtitle: "Inspired by the Human Brain",
      content: "Neural Networks introduce layered structures that mimic how the human brain processes information. They learn through interconnected nodes (neurons) that adjust weights dynamically.",
      note: "This layer is essential for handling unstructured data like images, text, and audio."
    },
    {
      number: "4",
      title: "Deep Learning",
      subtitle: "Large, Multi-layered Neural Architectures",
      content: "Deep Learning represents advanced neural networks with many layers, enabling AI systems to:",
      items: [
        "Recognize complex patterns",
        "Understand context",
        "Perform high-dimensional reasoning"
      ],
      note: "Key technologies: CNNs, RNNs, transformers."
    },
    {
      number: "5",
      title: "Generative AI",
      subtitle: "Models That Create New Content",
      content: "Generative AI enables systems to produce new outputs such as text, images, code, audio and synthetic data; rather than just analyzing existing data.",
      examples: [
        "Diffusion models",
        "Autoregressive models",
        "Generative adversarial networks (GANs)"
      ],
      note: "Generative AI powers creativity, automation, and new forms of problem-solving."
    },
    {
      number: "6",
      title: "Large Language Models (LLMs)",
      subtitle: "Advanced Intelligence Built on Deep Learning",
      content: "LLMs represent a breakthrough in understanding and generating human language. Trained on massive corpora, they support:",
      capabilities: [
        "Contextual reasoning",
        "Natural conversation",
        "Multi-step problem solving",
        "Retrieval-augmented generation (RAG)",
        "Code generation",
        "Semantic search"
      ],
      note: "LLMs are now the core of enterprise AI adoption."
    },
    {
      number: "7",
      title: "Agentic AI (AI Agents)",
      subtitle: "Autonomous Systems That Act, Decide, and Self-Improve",
      content: "Agentic AI is the deepest, most advanced layer systems capable of:",
      capabilities: [
        "Taking actions autonomously",
        "Managing workflows",
        "Planning multi-step tasks",
        "Using tools",
        "Interacting with environments",
        "Evaluating results through feedback loops"
      ],
      note: "This is where AI shifts from being a passive assistant to an active decision-maker capable of driving business operations."
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
              AI Engineering Framework: Building Intelligent Systems Through a Structured, Layered Approach
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Engineering Framework provides a clear and scalable structure for understanding how modern AI systems are designed, developed, and deployed. Each layer in the framework represents a deeper level of intelligence: starting from broad AI concepts and narrowing down to highly advanced agentic systems.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              This layered model helps enterprises, practitioners, and learners visualize how the AI ecosystem fits together, how technologies evolve, and how engineering practices must adapt as systems become more autonomous.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-8">
            <img 
              src={aiEngineeringDiagram} 
              alt="AI Engineering Framework Diagram" 
              className="w-full h-[95vh] object-contain opacity-95"
              style={{ maxWidth: '100vw', maxHeight: '95vh' }}
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
                    
                    {layer.items && (
                      <ul className="space-y-2.5 ml-2 mb-5">
                        {layer.items.map((item, idx) => (
                          <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                            <span className="text-blue-600 mr-3 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {layer.examples && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3">Examples include:</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.examples.map((example, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {layer.capabilities && (
                      <ul className="space-y-2.5 ml-2 mb-5">
                        {layer.capabilities.map((capability, idx) => (
                          <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                            <span className="text-blue-600 mr-3 font-bold">•</span>
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {layer.note && (
                      <p className="text-gray-700 italic text-base md:text-lg leading-relaxed border-l-4 border-blue-500 pl-4">
                        {layer.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 shadow-xl border border-gray-200">
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed text-center max-w-5xl mx-auto">
              The AI Engineering Framework clarifies the evolution of modern AI from foundational concepts to sophisticated autonomous agents. This progression helps organizations design robust AI roadmaps, align engineering teams, and adopt technologies in a structured, future-ready manner.
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
