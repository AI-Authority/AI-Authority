import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../../assets/WhatsApp_Image_2025-08-02_at_4.55.24_PM-removebg-preview (1).png";
import heroImage from "../../assets/Untitled-design-37.png";
import service1 from "../../assets/Gemini_Generated_Image_aa3cc8aa3cc8aa3c (1).png";
import service2 from "../../assets/Gemini_Generated_Image_km0lc1km0lc1km0l (1).png";
import service3 from "../../assets/Gemini_Generated_Image_waa573waa573waa5 (1).png";
import visionMissionBg from "../../assets/rr-comp.jpg";

export default function Home() {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        id="hero" 
        data-animate 
        className={`relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 transition-all duration-1000 ${
          isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Implementing Responsible AI: The Path to Practicality
              </h1>
              <p className="text-xl text-blue-100">
                Empowering developers, leaders, and organizations to build, deploy, and govern AI with integrity, intelligence, and impact.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/membership"
                  className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  Explore our service
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className={`hidden md:block transition-all duration-1000 delay-500 ${
              isVisible.hero ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <img
                src={heroImage}
                alt="AI Technology"
                className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section 
        id="about" 
        data-animate 
        className={`py-16 px-6 bg-white transition-all duration-1000 ${
          isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              About Us
            </h2>
            <h3 className="text-2xl font-semibold text-blue-600 mb-6">
              Navigating the AI Frontier: From Ambition to Ethical Excellence
            </h3>
          </div>

          <div className={`max-w-4xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p>
              The promise of Artificial Intelligence is immense, yet its rapid evolution brings significant challenges: a lack of clear ethical guidelines, inconsistent development standards, and the absence of a unified approach to responsible deployment. This often leads to AI solutions that are opaque, biased, or simply fail to meet their intended potential.
            </p>
            
            <p>
              At <span className="font-bold text-blue-700">Ai Authority</span>, we believe that groundbreaking AI must also be good AI. We're building the definitive platform to bridge this gap, transforming abstract policies into actionable practices. We provide:
            </p>

            <div className="bg-blue-50 rounded-lg p-8 space-y-4 hover:shadow-lg transition-all duration-300">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <h4 className="font-bold text-blue-800 text-xl mb-2">Clarity & Direction:</h4>
                <p>Curated best practices and frameworks to guide your AI initiatives.</p>
              </div>
              
              <div className="transform hover:scale-105 transition-transform duration-300">
                <h4 className="font-bold text-blue-800 text-xl mb-2">Quality & Trust:</h4>
                <p>Content rigorously vetted for accuracy, relevance, and real-world applicability.</p>
              </div>
              
              <div className="transform hover:scale-105 transition-transform duration-300">
                <h4 className="font-bold text-blue-800 text-xl mb-2">Validation & Expertise:</h4>
                <p>A robust certification program to validate skills in responsible AI development and governance.</p>
              </div>
            </div>

            <p className="text-center text-xl font-semibold text-gray-800 pt-6">
              Join us in fostering an AI ecosystem where innovation thrives responsibly, and trust is built into every algorithm.
            </p>

            <div className="text-center pt-4">
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105"
              >
                Join our mission
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section 
        id="vision-mission"
        data-animate
        className={`py-16 px-6 relative bg-fixed bg-cover bg-center bg-no-repeat transition-all duration-1000 ${
          isVisible['vision-mission'] ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${visionMissionBg})`,
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision */}
            <div className={`bg-white bg-opacity-95 p-8 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-2xl transition-all duration-1000 ${
              isVisible['vision-mission'] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <h3 className="text-3xl font-bold text-blue-700 mb-6">Vision</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We envision a world where AI empowers progress without compromise, guided by the highest ethical standards. This vision is realized through our commitment to providing <span className="font-semibold">Comprehensive Education</span>, which offers accessible and rigorously vetted knowledge and frameworks.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We deliver <span className="font-semibold">Actionable Guidance</span>, translating complex ethical principles into practical, implementable strategies.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Finally, we establish a global standard for professionals and organizations through <span className="font-semibold">Robust Certification</span>, which validates expertise in operationalizing responsible AI.
              </p>
            </div>

            {/* Mission */}
            <div className={`bg-white bg-opacity-95 p-8 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-2xl transition-all duration-1000 delay-300 ${
              isVisible['vision-mission'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <h3 className="text-3xl font-bold text-blue-700 mb-6">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the definitive, authoritative resource for Responsible AI Best Practices, driving the responsible development and deployment of AI. We are dedicated to leading a future where artificial intelligence is synonymous with trust, fairness, and positive societal impact, with our standards and certifications being globally recognized.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Services
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service1} 
                  alt="Responsible AI Best Practices"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Responsible AI Best Practices
                </h3>
                <p className="text-gray-600 mb-6">
                  Dive into our comprehensive guides, frameworks, and tools for ethical AI design, development, and deployment. Learn how to mitigate bias, ensure transparency, and build robust, human-centric AI systems.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service2} 
                  alt="AI Best Practices Certification"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  AI Best Practices Certification
                </h3>
                <p className="text-gray-600 mb-6">
                  Validate your expertise. Our certification framework provides a rigorous, industry-recognized pathway to demonstrate your proficiency in operationalizing responsible AI, from policy to practice.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-xl transition-all duration-500 hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img 
                  src={service3} 
                  alt="AI Governance & Compliance"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  AI Governance & Compliance
                </h3>
                <p className="text-gray-600 mb-6">
                  Understand the evolving landscape of AI regulations and ethical standards. Access resources on establishing robust governance models, ensuring accountability, and achieving regulatory compliance for your AI initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
