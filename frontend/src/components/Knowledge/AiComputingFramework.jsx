import { useNavigate } from "react-router-dom";
import aiComputingDiagram from "../../assets/ai-computing.png";

export default function AiComputingFramework() {
  const navigate = useNavigate();

  const layers = [
    {
      number: "1",
      title: "Edge Devices (IoT, Mobile)",
      subtitle: "AI at the point of action: fast, local, and responsive",
      content: "Edge devices bring AI directly to the hardware that interacts with the physical world. Examples include:",
      examples: [
        "Smartphones",
        "IoT devices",
        "Wearables",
        "Autonomous sensors",
        "Embedded systems"
      ],
      purpose: "Enable low-latency inference for real-time decisions (e.g., anomaly detection, computer vision on devices)."
    },
    {
      number: "2",
      title: "CPU / FPGA (Control & Edge)",
      subtitle: "Traditional compute with flexible hardware acceleration",
      sections: [
        {
          name: "CPU Computing",
          description: "General-purpose processors that handle:",
          items: [
            "Data preprocessing",
            "Feature extraction",
            "System control",
            "Orchestration tasks"
          ],
          note: "Ideal for small-scale AI tasks and hybrid workflows."
        },
        {
          name: "FPGA Computing",
          description: "Reconfigurable hardware optimized for:",
          items: [
            "Ultra-low latency",
            "Real-time inference",
            "On-device AI"
          ],
          note: "Used in robotics, manufacturing, edge deployments, embedded intelligence."
        }
      ],
      purpose: "Provide speed, flexibility, and real-time responsiveness for AI running at the edge or in controlled environments."
    },
    {
      number: "3",
      title: "GPU / TPU AI (Deep Learning)",
      subtitle: "High-performance compute for heavy AI workloads",
      sections: [
        {
          name: "GPU Computing",
          description: "Graphics Processing Units enable massive parallel processing for:",
          items: [
            "Deep learning training",
            "LLM fine-tuning",
            "High-dimensional matrix operations"
          ],
          note: "Standard for machine learning engineers and data scientists."
        },
        {
          name: "TPU & AI Accelerators",
          description: "Tensor Processing Units and AI-specific ASICs designed by companies like Google. Used for:",
          items: [
            "Large-scale AI training",
            "High-throughput inference",
            "Enterprise and cloud AI workloads"
          ]
        }
      ],
      purpose: "Accelerate deep learning and handle large model computations at speed and scale."
    },
    {
      number: "4",
      title: "Cloud AI (Training & Scale)",
      subtitle: "Elastic, scalable infrastructure for enterprise AI development",
      content: "Cloud platforms (AWS, Azure, GCP, etc.) provide distributed environments for:",
      capabilities: [
        "Large-scale model training",
        "Federated learning",
        "Multi-node compute",
        "Model hosting & APIs",
        "MLOps workflows"
      ],
      offers: {
        title: "Cloud AI offers:",
        items: [
          "Auto-scaling",
          "Pay-as-you-go compute",
          "Access to GPUs, TPUs, and custom accelerators",
          "Global deployment environments"
        ]
      },
      purpose: "Enable teams to build, deploy, and scale AI without maintaining physical infrastructure."
    },
    {
      number: "5",
      title: "Quantum AI (Future)",
      subtitle: "Next-generation computing for complex optimization & simulation",
      content: "Quantum AI leverages:",
      leverages: [
        "Quantum circuits",
        "Qubits",
        "Quantum annealing",
        "Hybrid quantum-classical systems"
      ],
      useCases: {
        title: "Potential use cases:",
        items: [
          "Drug discovery",
          "High-dimensional optimization",
          "Combinatorial problem solving",
          "Quantum machine learning"
        ]
      },
      note: "Still in early stages, but represents the future of high-complexity AI workloads.",
      purpose: "Unlock computational power beyond classical limits."
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
              AI Computing Framework: The Infrastructure Backbone That Powers Modern Artificial Intelligence
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              The AI Computing Framework outlines the full spectrum of compute technologies required to build, train, deploy, and scale AI systems from lightweight edge inference all the way to emerging quantum intelligence. Each layer represents a different level of computational capability, optimized for specific AI workloads such as deep learning, LLM training, autonomous decision-making, and high-performance inference.
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              This layered model helps organizations understand which computing environments best support their AI objectives, and how compute requirements evolve as AI capabilities mature.
            </p>
          </div>


          {/* Main Content - Diagram */}
          <div className="flex justify-center mb-8">
            <img 
              src={aiComputingDiagram} 
              alt="AI Computing Framework Diagram" 
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
                    {layer.content && (
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-5">
                        {layer.content}
                      </p>
                    )}
                    
                    {layer.examples && (
                      <ul className="space-y-2.5 ml-2 mb-5">
                        {layer.examples.map((example, idx) => (
                          <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                            <span className="text-blue-600 mr-3 font-bold">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {layer.sections && (
                      <div className="space-y-5 mb-5">
                        {layer.sections.map((section, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                            <h5 className="text-xl font-bold text-gray-900 mb-3">{section.name}</h5>
                            <p className="text-gray-700 mb-3">{section.description}</p>
                            <ul className="space-y-2 ml-4 mb-3">
                              {section.items.map((item, i) => (
                                <li key={i} className="text-gray-700 flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            {section.note && (
                              <p className="text-gray-600 italic">{section.note}</p>
                            )}
                          </div>
                        ))}
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
                    
                    {layer.offers && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3">{layer.offers.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.offers.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {layer.leverages && (
                      <ul className="space-y-2.5 ml-2 mb-5">
                        {layer.leverages.map((item, idx) => (
                          <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                            <span className="text-blue-600 mr-3 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {layer.useCases && (
                      <div className="mb-5">
                        <p className="text-gray-700 font-semibold mb-3">{layer.useCases.title}</p>
                        <ul className="space-y-2.5 ml-2">
                          {layer.useCases.items.map((item, idx) => (
                            <li key={idx} className="text-gray-700 text-base md:text-lg flex items-start leading-relaxed">
                              <span className="text-blue-600 mr-3 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {layer.note && !layer.sections && (
                      <p className="text-gray-600 italic mb-4">{layer.note}</p>
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
              The AI Computing Framework provides a complete, structured view of how compute environments evolve across the AI lifecycle. From real-time intelligence at the edge to advanced deep learning in the cloud and eventually quantum breakthroughs the framework ensures organizations select the right compute strategy for their AI ambitions.
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
