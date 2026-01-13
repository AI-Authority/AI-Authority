import { useState } from "react";
import bgImage from "../../assets/Untitled-design-27.png";
import aiImage from "../../assets/Untitled-design-26.png";

export default function Services() {
    const [openIndex, setOpenIndex] = useState(null);

    const trainingItems = [
        {
            title: "Master Proprietary Toolkits",
            content:
                "Gain hands-on expertise with AI Authority's proprietary frameworks and tools to accelerate responsible and scalable AI development.",
        },
        {
            title: "Understand AI Authority Specifications",
            content:
                "Deep-dive into ethical and technical AI design specifications, learning how to align your systems with global AI standards.",
        },
        {
            title: "Real-World Application",
            content:
                "Apply your learning through case studies, scenario-driven sessions, and expert guidance to solve real AI challenges.",
        },
        {
            title: "Certification Preparation",
            content:
                "Prepare for globally recognized certifications in AI ethics, governance, and deployment with our guided training modules.",
        },
    ];

    const consultingItems = [
        {
            title: "Strategic Advisory",
            content:
                "Design and implement robust AI strategies aligned with your organization’s goals and responsible innovation principles.",
        },
        {
            title: "Audit & Assessment",
            content:
                "Evaluate your current AI systems for compliance, ethics, and operational efficiency using proprietary AI Authority frameworks.",
        },
        {
            title: "Framework Deployment",
            content:
                "Deploy AI governance frameworks customized to your business operations and industry-specific needs.",
        },
        {
            title: "AI Governance",
            content:
                "Establish governance models ensuring fairness, transparency, accountability, and trust in all AI processes.",
        },
    ];

    const toggleSection = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <div
                className="relative h-screen bg-cover bg-center flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundAttachment: "scroll",
                }}
            >
                <div className="absolute inset-0 bg-white/30" />
                <h1 className="relative text-5xl font-bold text-gray-900 z-10 text-center px-4">
                    Our Services
                </h1>
            </div>

            {/* What We Do Section */}
            <div className="max-w-7xl mx-auto py-20 px-6 md:grid md:grid-cols-2 md:gap-16 items-center">
                {/* Text Content */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">What We Do</h2>
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                        Empowering Responsible AI Adoption
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        At AI Authority, we partner with organizations and professionals globally
                        to accelerate responsible and trustworthy artificial intelligence
                        implementation. Our Training and Consulting services are designed around
                        proprietary toolkits and frameworks that transform ethical AI principles
                        into practical, scalable business strategies. We help teams adopt
                        technology responsibly and align AI solutions with compliance, fairness,
                        and transparency goals.
                    </p>
                </div>

                {/* Image */}
                <div className="flex justify-center md:justify-end items-center mt-10 md:mt-0">
                    <img
                        src={aiImage}
                        alt="AI Hand"
                        className="rounded-lg shadow-lg w-[85%] max-w-sm md:max-w-[400px] lg:max-w-[420px] object-cover"
                    />
                </div>
            </div>


            {/* Training Services Section */}
            <div className="max-w-5xl mx-auto py-16 px-6">
                <h2 className="text-4xl font-bold text-center mb-12">Training Services</h2>
                <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                    Unlock the full potential of your team with expert-led training on AI Authority’s
                    unique proprietary resources. Our training programs empower your workforce to:
                </p>

                {/* Accordion Box (attached layout) */}
                <div className="border rounded-md overflow-hidden">
                    {trainingItems.map((item, index) => (
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
                                <span className="ml-2">{item.title}</span>
                            </button>

                            <div
                                className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 text-gray-700 ${openIndex === index ? "max-h-[180px] p-4" : "max-h-0 p-0"
                                    }`}
                            >
                                <p className="m-0 leading-relaxed">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-gray-700 font-semibold mt-8 text-center">
                    Our flexible delivery formats include virtual classrooms, on-site workshops,
                    and company-tailored sessions to suit diverse learner needs.
                </p>
            </div>

            {/* Consulting Services Section */}
            <div className="py-16 px-6 bg-[#f7f8fa]">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Consulting Services</h2>
                    <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
                        Navigating responsible AI implementation requires expertise, foresight, and
                        customized guidance. AI Authority’s consulting offerings support organizations
                        in applying our proprietary frameworks and specifications within their business
                        context.
                    </p>

                    {/* Accordion Box (attached layout) */}
                    <div className="border rounded-md overflow-hidden">
                        {consultingItems.map((item, index) => (
                            <div
                                key={index + trainingItems.length}
                                className="border-b last:border-none bg-white hover:bg-gray-50 transition-all"
                            >
                                <button
                                    onClick={() => toggleSection(index + trainingItems.length)}
                                    className="flex items-center w-full p-4 text-left text-lg font-medium text-gray-900 cursor-pointer hover:bg-gray-100"
                                >
                                    <span className="text-2xl font-bold w-6 text-center">
                                        {openIndex === index + trainingItems.length ? "−" : "+"}
                                    </span>
                                    <span className="ml-2">{item.title}</span>
                                </button>

                                <div
                                    className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 text-gray-700 ${openIndex === index + trainingItems.length
                                        ? "max-h-[180px] p-4"
                                        : "max-h-0 p-0"
                                        }`}
                                >
                                    <p className="m-0 leading-relaxed">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-gray-700 font-semibold mt-8 text-center max-w-3xl mx-auto">
                        Our consulting engagements are tailored in scope and scale — from targeted
                        workshops and gap analyses to full end-to-end AI program transformations.
                    </p>
                </div>
            </div>
        </div>
    );
}
