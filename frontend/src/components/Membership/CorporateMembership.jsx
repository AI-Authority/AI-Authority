import React from "react";
import { Link } from "react-router-dom";

const CorporateMembership = () => {
    return (
        <div className="w-full bg-gray-50">

            {/* ===== TOP SECTION WITH LIGHT GRADIENT ===== */}
            <div
                className="w-full py-24 px-6 md:px-16 shadow-inner"
                style={{
                    background: "linear-gradient(135deg, #a1bff7ff 0%, #f6faff 40%, #b1d6f7ff 100%)",
                }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
                        Corporate Membership
                    </h1>

                    <p className="text-gray-700 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">
                        AI Authority's Corporate Membership is designed for companies that need expert
                        support, trusted guidance, and access to the right capabilities as they adopt and
                        expand AI within their organisation.
                    </p>
                </div>
            </div>

            {/* ===== BENEFITS SECTION ===== */}
            <div className="max-w-5xl mx-auto px-6 md:px-0 py-20">

                {/* Benefits Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">Membership Benefits</h2>
                    <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 text-lg">
                        Explore the value and advantages your organisation receives
                    </p>
                </div>

                {/* Benefit Cards */}
                <div className="space-y-12">
                    {[
                        {
                            title: "Optimal AI Solution Development",
                            desc:
                                "Corporate members gain access to expert support that ensures their AI solutions are designed, built, and improved in the most optimal way.",
                            extra: "This includes:",
                            list: [
                                "End-to-end guidance on AI system design",
                                "Help identifying the right models, data strategies, and architectures",
                                "Ensuring efficiency, scalability, and alignment with business goals",
                                "Ongoing optimisation to maintain performance and competitiveness Your organisation doesn't just adopt AI, you adopt the best version of it.",
                            ],
                            footer:
                                "Your organisation doesn't just adopt AI, you adopt the best version of it.",
                        },
                        {
                            title: "Industry Best Practices & Standards",
                            desc:
                                "Members gain access to proven frameworks, implementation standards, and regulatory best practices to ensure all AI initiatives are compliant, responsible, and future-ready.",
                        },
                        {
                            title: "Knowledge Across AI Technologies",
                            desc:
                                "Support and clarity on modern AI technologies, tools, and methods; helping teams understand what's possible and what is suitable for their use-cases.",
                        },
                        {
                            title: "Access to AI Talent",
                            desc:
                                "Assistance in identifying and connecting with AI professionals, whether for advisory support, project-specific needs, or scaling internal teams.",
                        },
                        {
                            title: "Full-Lifecycle AI Governance Across the SDLC",
                            desc:
                                "Members receive a structured governance framework that covers the entire software development lifecycle, ensuring AI systems remain compliant, trustworthy, and responsible from start to finish.",
                            extra: "This includes governance across:",
                            list: [
                                "Problem definition & data collection",
                                "Model development & evaluation",
                                "Deployment & monitoring",
                                "Risk assessment & mitigation",
                                "Compliance with emerging AI regulations",
                                "Documentation, traceability & audit readiness",
                            ],
                            footer:
                                "Your AI projects stay responsible, well-managed, and future-proof at every stage.",
                        },
                        {
                            title: "Peer & Expert Network",
                            desc:
                                "Direct access to a network of industry experts, practitioners, and peers within AI Authority; enabling members to learn from real-world experiences, discuss challenges, and explore new opportunities.",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 
              hover:shadow-lg transition-all relative"
                        >
                            {/* Left Highlight Bar */}
                            <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                            <h3 className="text-2xl font-semibold text-gray-900">
                                {index + 1}. {item.title}
                            </h3>

                            <p className="text-gray-600 mt-3 whitespace-pre-line">{item.desc}</p>

                            {item.extra && (
                                <p className="text-gray-700 mt-4 font-medium">{item.extra}</p>
                            )}

                            {item.list && (
                                <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-1">
                                    {item.list.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            )}

                            {item.footer && (
                                <p className="text-gray-800 font-medium mt-4 whitespace-pre-line">
                                    {item.footer}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* ===== BUTTONS AT BOTTOM (NEW STYLE) ===== */}
                <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-6">

                    {/* Register Button (solid gradient) */}
                    <Link
                        to="/register/corporate"
                        className="
              px-12 py-3.5 rounded-full 
              text-white text-lg font-semibold shadow-md
              bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-700 hover:to-blue-800
              transition-all transform hover:-translate-y-0.5
            "
                    >
                        Register
                    </Link>

                    {/* Login Button (soft outline + hover fill) */}
                    <Link
                        to="/login"
                        className="
              px-12 py-3.5 rounded-full
              border border-blue-600 text-blue-600 text-lg font-semibold
              bg-white shadow-sm
              hover:bg-blue-600 hover:text-white
              transition-all transform hover:-translate-y-0.5
            "
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CorporateMembership;
