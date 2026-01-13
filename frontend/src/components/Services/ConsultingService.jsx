import { useState } from "react";
import bgImage from "../../assets/Untitled-design-36.png";

export default function ConsultingService() {
  const [openIndex, setOpenIndex] = useState(null);

  const sections = [
    {
      title: "Strategic Advisory",
      content:
        "Our Strategic Advisory services provide expert guidance on aligning AI adoption with your organization’s mission, vision, and long-term strategy. We help you identify key opportunities for automation and innovation.",
    },
    {
      title: "Audit & Assessment",
      content:
        "We conduct comprehensive AI audits to evaluate your current systems, data pipelines, governance structures, and compliance readiness—ensuring your AI ecosystem operates ethically and efficiently.",
    },
    {
      title: "Framework Deployment",
      content:
        "Our team assists in deploying AI frameworks customized for your enterprise. From governance to automation workflows, we ensure seamless integration with your existing infrastructure.",
    },
    {
      title: "AI Governance",
      content:
        "Our AI Governance service empowers your organization to establish and maintain robust governance structures for all AI initiatives. We help you design and implement oversight frameworks that ensure compliance, risk management, and ethical standards across the AI lifecycle.",
    },
  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Background Section */}
      <div
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute inset-0 bg-white/30" />
        <h1 className="relative text-5xl font-bold text-gray-900 z-10 text-center px-4">
          AI Authority Consulting Services
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto py-16 px-6">
        <p className="text-lg text-gray-600 mb-8 text-center">
          Navigating responsible AI implementation requires expertise, foresight, and
          customized guidance. AI Authority’s consulting offerings support organizations
          in applying our proprietary toolkits and specifications directly within your
          business context.
        </p>

        {/* Accordion Container — Attached Style */}
        <div className="border rounded-md overflow-hidden">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-b last:border-none bg-white hover:bg-gray-50 transition-all"
            >
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center w-full p-4 text-left text-lg font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
              >
                <span className="text-2xl font-bold w-6 text-center">
                  {openIndex === index ? "−" : "+"}
                </span>
                <span className="ml-2">{section.title}</span>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 text-gray-700 ${
                  openIndex === index ? "max-h-[180px] p-4" : "max-h-0 p-0"
                }`}
              >
                <p className="m-0 leading-relaxed">{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-gray-700 font-semibold mt-8 text-center max-w-3xl mx-auto">
          Our consulting engagements are tailored in scope and scale — from targeted
          workshops and assessments to full end-to-end AI transformation programs.
        </p>
      </div>
    </div>
  );
}
