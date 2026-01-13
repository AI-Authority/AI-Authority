import { useState } from "react";
import snaLogo from "../../assets/SNA-Logo-1.jpg";
import heroBg from "../../assets/Untitled-design-36.png";

export default function AccreditedTrainers() {
  const [activeCategory, setActiveCategory] = useState("Certified Enterprise AI Architect");

  const certifications = [
    "Certified Enterprise AI Architect",
    "Certified AI Strategist",
    "Certified AI Solution Architect",
    "Certified AI Developer",
    "Certified AI Governance Officer",
    "Certified AI Security Architect"
  ];

  const trainers = [
    {
      id: 1,
      name: "SNA Technologies",
      logo: snaLogo,
      website: "www.snatechnologies.com",
      category: "Certified Enterprise AI Architect"
    }
  ];

  const filteredTrainers = trainers.filter(trainer => trainer.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background Image */}
      <section 
        className="relative py-32 px-6 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Accredited Trainers
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Certification Buttons */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(cert)}
                    className={`w-full px-4 py-3 text-left text-sm font-medium rounded-md transition-all duration-200
                              ${activeCategory === cert 
                                ? 'bg-gray-800 text-white shadow-md' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content - Trainers Display */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4">
                {activeCategory}s
              </h2>

              <div className="space-y-6">
                {filteredTrainers.length > 0 ? (
                  filteredTrainers.map((trainer) => (
                    <div
                      key={trainer.id}
                      className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:border-blue-400 
                               transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        {/* Trainer Name */}
                        <div className="flex-shrink-0">
                          <h3 className="text-2xl font-bold text-gray-900">
                            {trainer.name}
                          </h3>
                        </div>

                        {/* Logo */}
                        <div className="flex-shrink-0">
                          <img
                            src={trainer.logo}
                            alt={`${trainer.name} logo`}
                            className="h-16 object-contain"
                          />
                        </div>

                        {/* Website Link */}
                        <div className="flex-shrink-0">
                          <a
                            href={`https://${trainer.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                          >
                            {trainer.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg">No accredited trainers in this category yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
