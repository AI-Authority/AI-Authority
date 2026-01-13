import React from "react";
import { Link } from "react-router-dom";

const StudentMembership = () => {
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
                        Student Membership
                    </h1>

                    <p className="text-gray-700 mt-6 text-lg max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        The Student Membership is designed for individuals currently enrolled in academic
                        programs who want to strengthen their AI expertise, gain real-world exposure, and
                        build meaningful industry connections.
                        It empowers students to accelerate their learning, participate in hands-on activities,
                        and engage with a global AI community.
                    </p>
                </div>
            </div>

            {/* ===== WHAT STUDENTS RECEIVE ===== */}
            <div className="max-w-5xl mx-auto px-6 md:px-0 py-20">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        What Student Members Receive
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* BENEFIT CARDS */}
                <div className="space-y-12">

                    {/* 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            1. Complimentary Access to Learning Resources
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Students get free or discounted access to courses, webinars, and training events focused on AI,
                            compliance frameworks, and emerging technologies.
                        </p>
                    </div>

                    {/* 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            2. Mentorship, Internships & Research Opportunities
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Members can connect with mentors, explore internships, and participate in research collaborations
                            offered through the AI Authority network.
                        </p>
                    </div>

                    {/* 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            3. Student-Only Challenges & Hackathons
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Exclusive access to competitions, project-based challenges, hackathons, and career development
                            sessions tailored for early-stage learners.
                        </p>
                    </div>

                    {/* 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            4. Access to a Global AI Community
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Students join a worldwide network of AI professionals, peers, and experts; fostering peer-to-peer
                            learning, knowledge exchange, and collaborative growth.
                        </p>
                    </div>

                    {/* 5 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            5. Scholarships, Grants & Project Funding
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Eligible students can apply for scholarships, research grants, or financial support for AI-driven
                            academic and innovation projects.
                        </p>
                    </div>

                    {/* 6 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            6. Student-Friendly Certification Programs
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Access to beginner-friendly and career-start certifications offered in partnership with AI Authority,
                            designed to help students build credibility early.
                        </p>
                    </div>

                    {/* 7 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            7. Connect With Like-Minded Peers
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Opportunities to network with student members, early career professionals, and AI enthusiasts
                            from around the world.
                        </p>
                    </div>

                    {/* 8 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            8. Participate in Special Interest Groups
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Students can join focused communities around research topics, ethics, responsible AI,
                            student-led innovation, and more.
                        </p>
                    </div>

                </div>

                {/* BUTTONS */}
                <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-6">

                    <Link
                        to="/register/student"
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

export default StudentMembership;
