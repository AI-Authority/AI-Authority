import React from "react";
import { Link } from "react-router-dom";

const IndividualMembership = () => {
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
                        Individual Membership
                    </h1>

                    <p className="text-gray-700 mt-6 text-lg max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        The Individual Membership is ideal for anyone looking to grow their expertise,
                        expand their network, and actively contribute to the advancement of the AI industry.
                        It supports professionals at all levels: whether you're deepening your knowledge,
                        exploring new opportunities, or shaping the future of responsible AI.
                    </p>
                </div>
            </div>

            {/* ===== WHAT MEMBERS RECEIVE ===== */}
            <div className="max-w-5xl mx-auto px-6 md:px-0 py-20">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        What Individual Members Receive
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* ALL BENEFIT CARDS */}
                <div className="space-y-12">

                    {/* 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            1. Member-Only Knowledge Resources
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Full access to AI Authority's exclusive content library, including articles, toolkits, insights,
                            best practices, and curated learning materials.
                        </p>
                    </div>

                    {/* 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            2. Discounts on Certifications & Training
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Members receive special pricing on selected certification programs, training sessions, and
                            consultation services.
                        </p>
                    </div>

                    {/* 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            3. Access to AI Authority Events
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Exclusive or discounted participation in webinars, conferences, roundtables, and learning
                            events.
                        </p>
                    </div>

                    {/* 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            4. Opportunities for Thought Leadership
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Members can contribute articles, guest blog posts, panels, and speaking slots; gaining
                            visibility as contributors to the AI community.
                        </p>
                    </div>

                    {/* 5 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            5. Networking & Community Engagement
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Direct connection with peers, experts, board members, trainers, and corporate partners
                            across the AI Authority network.
                        </p>
                    </div>

                    {/* 6 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            6. Join Special Interest Groups
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Access to focused groups exploring themes like AI ethics, research applications,
                            governance, innovation, and emerging technologies.
                        </p>
                    </div>

                    {/* 7 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            7. Visibility & Professional Opportunities
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Individual members can be discovered by corporates, trainers, and teams seeking
                            consultants, freelancers, mentors, or project partners.
                        </p>
                    </div>

                    {/* 8 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            8. Project Board & Collaboration Opportunities
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Access to a community-driven space featuring research collaborations, client projects,
                            co-creation initiatives, and innovation challenges.
                        </p>
                    </div>

                    {/* 9 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            9. Mentorship Opportunities
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Members can participate as mentees or peer mentors, helping develop the next generation
                            of AI talent while advancing their own expertise.
                        </p>
                    </div>

                </div>

                {/* Buttons (Optional — Remove if not needed) */}
                <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-6">

                    <Link
                        to="/register/individual"
                        className="px-12 py-3.5 rounded-full text-white text-lg font-semibold 
                        shadow-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 
                        hover:to-blue-800 transition-all transform hover:-translate-y-0.5"
                    >
                        Register
                    </Link>

                    <Link
                        to="/login"
                        className="px-12 py-3.5 rounded-full border border-blue-600 text-blue-600 
                        text-lg font-semibold bg-white shadow-sm hover:bg-blue-600 hover:text-white 
                        transition-all transform hover:-translate-y-0.5"
                    >
                        Login
                    </Link>

                </div>

            </div>
        </div>
    );
};

export default IndividualMembership;
