import React from "react";
import { Link } from "react-router-dom";

const TrainerMembership = () => {
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
                        Trainer Membership
                    </h1>

                    <p className="text-gray-700 mt-6 text-lg max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
                        The Trainer Membership is designed for educators, facilitators, consultants, and
                        learning professionals who are passionate about advancing AI literacy and
                        professional development.
                        This membership empowers trainers to deliver high-quality AI education using AI
                        Authority's trusted, standardized content and training ecosystem.
                    </p>
                </div>
            </div>

            {/* ===== WHAT TRAINER MEMBERS DO ===== */}
            <div className="max-w-5xl mx-auto px-6 md:px-0 py-20">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        What Trainer Members Do
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                {/* BENEFIT CARDS */}
                <div className="space-y-12">

                    {/* 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            1. Deliver AI Training Across the Network
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Trainers lead learning sessions,
                            professional upskilling programs, and AI education initiatives within the AI
                            Authority network.
                        </p>
                    </div>

                    {/* 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            2. Teach Standardized, High-Quality Material
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Members receive complete
                            access to all standardized course content, ensuring consistency, accuracy,
                            and industry alignment.
                        </p>
                    </div>

                    {/* 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            3. Learn Proprietary Courses
                        </h3>

                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Trainers are eligible to be trained on additional
                            proprietary programs developed by AI Authority, expanding their skill set and
                            teaching capabilities.
                        </p>
                    </div>
                </div>

                {/* ===== BENEFITS FOR TRAINER MEMBERS ===== */}
                <div className="text-center mt-24 mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Benefits for Trainer Members
                    </h2>
                    <div className="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-12">

                    {/* Benefit 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            1. Training Opportunities Within the Network
                        </h3>
                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Exclusive access to deliver AI
                            programs across organizations, institutions, and corporate teams within the AI
                            Authority ecosystem.
                        </p>
                    </div>

                    {/* Benefit 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            2. Complete Access to Standardized Materials
                        </h3>
                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Ready-to-use, high-quality
                            decks, guides, exercises, assessments, and learning assets for various AI
                            courses.
                        </p>
                    </div>

                    {/* Benefit 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            3. Expand Training Portfolio
                        </h3>
                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Opportunities to broaden subject expertise and
                            add new programs to their professional portfolio.
                        </p>
                    </div>

                    {/* Benefit 4 */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative">
                        <div className="absolute left-0 top-0 h-full w-2 bg-blue-600 rounded-l-2xl"></div>

                        <h3 className="text-2xl font-semibold text-gray-900">
                            4. Continuous Professional Growth
                        </h3>
                        <p className="text-gray-700 mt-3 whitespace-pre-line">
                            Trainers get exposure to updated
                            content, new methodologies, and evolving AI trends.
                        </p>
                    </div>

                </div>

                {/* BUTTONS */}
                <div className="mt-20 flex flex-col md:flex-row justify-center items-center gap-6">

                    <Link
                        to="/register/trainer"
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

export default TrainerMembership;
