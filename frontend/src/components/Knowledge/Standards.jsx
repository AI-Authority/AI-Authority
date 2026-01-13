import { useState, useEffect } from "react";
import backgroundImage from "../../assets/Untitled-design-27.png";

export default function Standards() {
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

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const standards = [
    {
      title: "ISO 42001: Artificial Intelligence Management Systems",
      description: "ISO/IEC 42001 is the world's first standard dedicated to the management systems of AI. It lays down requirements and best practices for organizations to design, implement, and continually improve AI systems responsibly. The standard ensures ethical performance, risk management, and compliance with legal and societal expectations.",
      link: "https://www.iso.org/standard/42001",
      linkText: "ISO 42001 official page",
      prefix: "Learn more:"
    },
    {
      title: "NIST Guidelines",
      description: "The U.S. National Institute of Standards and Technology (NIST) provides foundational frameworks that guide trustworthy AI development and deployment. Their AI Risk Management Framework helps organizations identify and mitigate risks related to reliability, bias, security, and fairness, fostering safer AI ecosystems.",
      link: "https://www.nist.gov/itl/ai-risk-management-framework",
      linkText: "NIST AI Risk Management Framework",
      prefix: "Learn more:"
    },
    {
      title: "NISTIR Reports",
      description: "NIST publishes insightful reports such as NISTIR 8312 and NISTIR 8367 focused on explainability and interpretability in AI systems. These documents highlight principles and psychological foundations essential for making AI decisions transparent and understandable for diverse stakeholders.",
      link: "https://www.nist.gov/system/files/documents/2020/08/17/NIST%20Explainable%20AI%20Draft%20NISTIR8312%20%281%29.pdf",
      linkText: "NISTIR 8312, NISTIR 8367 summary",
      prefix: "Learn More:"
    }
  ];

  const regulations = [
    {
      title: "European Union AI Act",
      description: "As the most comprehensive AI regulatory framework, the EU AI Act classifies AI applications by risk level and mandates strict requirements on risk management, transparency, and accountability to protect fundamental rights across member states.",
      link: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      linkText: "EU AI Act Guide",
      prefix: "More info:"
    },
    {
      title: "United States Executive Orders on AI",
      description: "The U.S. government has issued executive orders promoting safe, reliable, and secure AI development, emphasizing transparency and civil rights protections. The orders empower agencies to adopt risk management frameworks and enhance federal AI leadership.",
      link: "https://bidenwhitehouse.archives.gov/briefing-room/presidential-actions/2023/10/30/executive-order-on-the-safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence/",
      linkText: "Executive Order 14110, White House AI Policy",
      prefix: "More Info:"
    },
    {
      title: "China's AI Regulations",
      description: "China operates one of the strictest AI regulatory ecosystems, including the Personal Information Protection Law (PIPL), Algorithmic Regulation, and rules governing generative AI and synthetic media. These ensure security, ethical alignment, and ideological conformity.",
      link: "https://law.asia/china-ai-regulations-legislation-compliance-future-prospects/",
      linkText: "China AI Regulations, Asia Business Law Journal",
      prefix: "More Info:"
    },
    {
      title: "Singapore's AI Governance Framework",
      description: "Singapore's Model AI Governance Framework promotes transparency, fairness, and accountability while encouraging innovation. It includes the world-first AI governance testing tool, A.I. Verify, as a self-assessment mechanism for businesses.",
      link: "https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/ai/sgmodelaigovframework2.pdf",
      linkText: "Singapore PDPC Model AI Governance (PDF)",
      prefix: "Explore:"
    },
    {
      title: "Personal Information Protection Law (PIPL) – China",
      description: "PIPL is China's landmark data privacy law, regulating personal data collection, transfer, and algorithmic use, ensuring data security and privacy in the AI age.",
      link: "https://digital.nemko.com/regulations/china-ai-regulations",
      linkText: "PIPL Summary",
      prefix: "More Details:"
    },
    {
      title: "Personal Data Protection Act (PDPA) – Singapore",
      description: "PDPA governs data protection and privacy in Singapore, prescribing rules for collecting, using, and disclosing personal data, with specific guidance on AI and automated systems.",
      link: "https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/resource-for-organisation/data-protection-obligations-under-the-pdpa.pdf",
      linkText: "Singapore PDPA Overview",
      prefix: "More info:"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section 
        id="header"
        data-animate
        className={`bg-cover bg-center bg-no-repeat relative py-20 transition-all duration-1000 ${
          isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-90"></div>
        
        <div className="relative z-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-8 transition-all duration-1000 delay-300 ${
              isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Standards
            </h1>
            <p className={`text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              AI Authority's frameworks and certifications are built on internationally recognized standards that ensure consistent, trustworthy, and ethical AI deployment worldwide:
            </p>
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section 
        id="standards-content"
        data-animate
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          isVisible['standards-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {standards.map((standard, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 ${
                  isVisible['standards-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 200}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {standard.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  {standard.description}
                </p>
                <div className="text-sm">
                  <span className="text-black font-medium">{standard.prefix} </span>
                  <a 
                    href={standard.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
                  >
                    {standard.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations Header */}
      <section 
        id="regulations-header"
        data-animate
        className={`px-6 py-12 bg-gray-50 transition-all duration-1000 ${
          isVisible['regulations-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-8 transition-all duration-1000 delay-300 ${
            isVisible['regulations-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Regulations
          </h2>
          <p className={`text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible['regulations-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            AI Authority aligns its offerings and guidance with critical global AI regulations that set the baseline for ethical, transparent, and legal AI operations:
          </p>
        </div>
      </section>

      {/* Regulations Section */}
      <section 
        id="regulations-content"
        data-animate
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          isVisible['regulations-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regulations.map((regulation, index) => (
              <div 
                key={index}
                className={`bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-500 ${
                  isVisible['regulations-content'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {regulation.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  {regulation.description}
                </p>
                <div className="text-sm">
                  <span className="text-black font-medium">{regulation.prefix} </span>
                  <a 
                    href={regulation.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
                  >
                    {regulation.linkText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}