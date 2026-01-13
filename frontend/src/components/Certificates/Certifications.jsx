import { useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../../assets/Untitled-design-36.png";

export default function Certifications() {
  const [openAccordion, setOpenAccordion] = useState("validate");
  const [selectedIndividualCert, setSelectedIndividualCert] = useState("Certified AI Strategist");
  const [selectedOrgCert, setSelectedOrgCert] = useState("AI Maturity Assessment");

  const toggleAccordion = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const whyAICertification = [
    {
      id: "validate",
      title: "Validate Expertise",
      content: "Officially confirm your practical skills and knowledge in designing, developing, and deploying AI systems, proving your mastery to employers and peers."
    },
    {
      id: "career",
      title: "Accelerate Your Career",
      content: "Stand out in the competitive AI job market with recognized credentials that demonstrate your expertise and commitment to excellence."
    },
    {
      id: "trust",
      title: "Build Trust in AI",
      content: "Showcase your commitment to ethical and responsible AI practices, building confidence among stakeholders."
    },
    {
      id: "compliance",
      title: "Ensure Regulatory Compliance",
      content: "Stay ahead of evolving AI regulations and industry standards with up-to-date knowledge and practices."
    },
    {
      id: "risks",
      title: "Mitigate AI Risks",
      content: "Learn to identify and address potential risks in AI systems, ensuring safe and reliable deployments."
    },
    {
      id: "quality",
      title: "Drive Quality & Best Practices",
      content: "Implement industry-leading methodologies and frameworks to deliver high-quality AI solutions."
    },
    {
      id: "innovation",
      title: "Foster Responsible Innovation",
      content: "Promote ethical AI development while driving innovation and competitive advantage."
    },
    {
      id: "recognition",
      title: "Industry Recognition",
      content: "Join a global community of certified AI professionals and gain recognition across industries."
    }
  ];

  const individualCertifications = [
    "Certified AI Strategist",
    "Certified Enterprise AI Architect",
    "Certified AI Solution Architect",
    "Certified AI Developer",
    "Certified AI Governance Officer",
    "Certified AI Security Architect"
  ];

  const certificationContent = {
    "Certified AI Strategist": {
      description: "This certification assesses an individual's ability to design and lead a comprehensive AI strategy for an organization. Candidates are evaluated on their capability to:",
      bullets: [
        "Identify key stakeholders and understand their needs and concerns",
        "Develop a clear and forward-looking AI vision aligned with organizational goals",
        "Conduct value assessments to prioritize impactful AI use cases",
        "Perform readiness assessments across technology, data, talent, and governance",
        "Define the enablers necessary to realize the AI vision",
        "Develop a strategic roadmap to implement these enablers effectively",
        "Formulate a practical and scalable implementation strategy."
      ],
      idealFor: "This certification is ideal for professionals responsible for Enterprise Architects, Business and Technology executives, Program/Project Managers, Operations executives"
    },
    "Certified Enterprise AI Architect": {
      description: "The Enterprise AI Architecture Certification validates a professional's ability to design and lead AI initiatives at an organizational scale. It assesses the candidate's capability to architect AI systems that are strategically aligned, operationally effective, and tailored to the unique needs of the enterprise. Certified professionals are evaluated across the following competencies:",
      bullets: [
        "Analyzing organizational context, including environment, strategic drivers, goals, and objectives",
        "Tailoring AI frameworks to align with enterprise-specific requirements",
        "Establishing foundational AI principles to guide design and implementation",
        "Defining a comprehensive AI strategy, including strategic roadmaps and implementation approaches",
        "Designing enterprise-grade AI architectures across business, data, application, and technology layers",
        "Developing implementation and migration plans to ensure smooth adoption and scalability",
        "Executing AI governance to ensure alignment with defined architectures and compliance standards",
        "Leading change management initiatives across both business and technology domains."
      ],
      idealFor: "This certification is ideal for professionals responsible for aligning AI initiatives with business objectives and driving enterprise-wide AI transformation, ensuring measurable value delivery through AI investments."
    },
    "Certified AI Solution Architect": {
      description: "The AI Solution Architect Certification validates an individual's ability to design, implement, and scale end-to-end AI solutions that drive business value. This certification assesses both technical and strategic competencies across data architecture, machine learning, MLOps, and cloud platforms. Candidates are evaluated on their expertise in:",
      bullets: [
        "Architecting scalable, secure, and compliant AI systems",
        "Applying advanced machine learning and deep learning techniques",
        "Designing robust data pipelines and deploying models using MLOps best practices",
        "Aligning AI initiatives with business goals and stakeholder requirements",
        "Utilizing cloud-native AI services (AWS, Azure, GCP)",
        "Ensuring ethical, explainable, and responsible AI deployment"
      ],
      idealFor: "This certification is ideal for professionals responsible for translating business needs into AI-driven architectures and leading enterprise AI transformations."
    },
    "Certified AI Developer": {
      description: "This certification program equips aspiring AI developers with the essential skills to build, deploy, and manage AI applications end to end. Spanning core theory, hands-on development, and production deployment, the curriculum is structured to ensure practical readiness for real-world AI roles. Candidates are evaluated on their expertise in:",
      sections: [
        {
          title: "Foundations",
          items: [
            "Mathematics for AI (Linear Algebra, Calculus, Probability)",
            "Python programming, data manipulation (NumPy, Pandas), and version control (Git)"
          ]
        },
        {
          title: "Core AI Concepts",
          items: [
            "Machine Learning (supervised, unsupervised, reinforcement learning)",
            "Key algorithms (e.g., SVM, Decision Trees, Random Forests, KNN)",
            "Deep Learning (neural networks, CNNs, RNNs, transfer learning using TensorFlow, PyTorch)"
          ]
        },
        {
          title: "AI Application Development",
          items: [
            "NLP (BERT, sentiment analysis, summarization)",
            "Computer Vision (image classification, object detection with OpenCV, YOLO, ResNet)",
            "Reinforcement Learning (Q-learning, policy gradients)"
          ]
        },
        {
          title: "Deployment, MLOps & Ethics",
          items: [
            "Model deployment using Flask, FastAPI, Docker, and cloud platforms (AWS/GCP/Azure)",
            "MLOps (CI/CD, MLflow, monitoring, model versioning)",
            "Responsible AI (bias mitigation, explainability with SHAP & LIME)"
          ]
        },
        {
          title: "Advanced Topics",
          items: [
            "Generative AI (GANs, diffusion models), LLMs & Prompt Engineering, Autonomous Agents, and Edge AI."
          ]
        }
      ]
    },
    "Certified AI Governance Officer": {
      description: "The AI Governance Officer Certification validates a professional's ability to establish and oversee responsible AI practices within an organization. This certification assesses knowledge and skills in AI Authority governance frameworks, managing AI-related risks, ensuring ethical and compliant AI deployment, and aligning AI initiatives with organizational policies and regulatory requirements. Candidates are evaluated in the following key competencies:",
      bullets: [
        "AI policy and governance framework development",
        "Ethical and responsible AI principles (fairness, transparency, accountability)",
        "Regulatory compliance (e.g., GDPR, AI Act, NIST, ISO)",
        "Risk and impact assessments for AI systems",
        "Model lifecycle oversight, including documentation, monitoring, and audits",
        "Cross-functional governance and stakeholder management"
      ],
      idealFor: "This certification is ideal for professionals responsible for AI risk, ethics, compliance, or governance across public or private sector organizations."
    },
    "Certified AI Security Architect": {
      description: "The AI Security Architect Certification validates a professional's expertise in designing and securing AI systems across the model lifecycle. This certification assesses the knowledge of the individual on AI Authority's AI Security Architecture framework and the ability to protect AI infrastructure, data, and models against evolving threats while ensuring compliance with industry regulations and ethical standards. Candidates are evaluated in the following key competencies:",
      bullets: [
        "Threat modeling and risk assessment for AI/ML systems",
        "Secure architecture design for data pipelines, models, and deployment environments",
        "Model protection against adversarial attacks and data leakage",
        "Privacy-preserving AI and regulatory compliance (e.g., GDPR, NIST, ISO)",
        "MLOps security integration (DevSecOps for AI)",
        "Incident response planning and forensic readiness for AI platforms"
      ],
      idealFor: "Ideal for cybersecurity professionals, AI architects, and technical leaders responsible for securing enterprise AI deployments."
    }
  };

  const organizationCertifications = [
    "AI Maturity Assessment",
    "AI Readiness Assessment",
    "AI Value Assessment",
    "AI Regulation Compliance Assessment",
    "Bias Impact Assessment",
    "Fairness Assessment"
  ];

  const organizationContent = {
    "AI Maturity Assessment": {
      description: "The AI Maturity Assessment provides a comprehensive, evidence-based evaluation of an organization's AI development and deployment capabilities. This certification will utilize AI Authority's proprietary Maturity Model to assess the AI maturity of the organization. It examines how well AI initiatives are integrated across people, processes, data, technology, and governance domains. The assessment measures your current state and benchmarks it against industry standards, delivering a maturity score and a customized roadmap for sustainable and responsible AI advancement.",
      idealFor: "Organizations seeking to understand their AI strengths, address gaps, and strategically prioritize improvements."
    },
    "AI Readiness Assessment": {
      description: "Our AI Readiness Assessment certifies how well-prepared your organization is for adopting and scaling AI. This certification will utilize the AI Readiness Assessment Toolkit developed by AI Authority to conduct the assessments. It evaluates readiness across leadership vision, organizational culture, talent capability, data infrastructure, and risk management practices. The outcome is a clear readiness index, actionable recommendations, and the confidence to embark on complex AI projects with minimized risks and maximum potential.",
      idealFor: "Enterprises at the early stage of their AI journey or undergoing digital transformation."
    },
    "AI Value Assessment": {
      description: "The AI Value Assessment certification quantifies the tangible—and responsible—business value derived from your organization's AI projects. It measures alignment between AI initiatives and strategic business objectives, assessing ROI, efficiency gains, and ethical outcomes. Organizations receive a value impact report, identifying top-performing projects and areas for further investment.",
      idealFor: "Leaders focused on maximizing returns from AI while upholding transparency, compliance, and stakeholder trust."
    },
    "AI Regulation Compliance Assessment": {
      description: "This certification provides a rigorous audit of your AI systems, ensuring they comply with applicable local and international regulations—such as the EU AI Act, GDPR, NIST, ISO 42001, PIPL, and PDPA. The process involves a detailed compliance gap analysis, comprehensive documentation review, and actionable guidance to support legal defensibility and regulatory reporting.",
      idealFor: "Any organization deploying or operating AI systems in regulated environments or cross-border markets."
    },
    "Bias Impact Assessment": {
      description: "The Bias Impact Assessment evaluates your AI models and data pipelines for risk of embedded or emergent bias. Using technical and statistical tools, plus social and ethical review, this certification provides a bias risk score and specific remediation strategies to ensure equitable, non-discriminatory AI outcomes for all stakeholders.",
      idealFor: "Teams building or auditing AI systems exposed to sensitive decisions affecting individuals, customers, or communities."
    },
    "Fairness Assessment": {
      description: "With the Fairness Assessment certification, organizations certify that their AI solutions are designed and evaluated for fairness across demographic groups, use-cases, and deployment regions. This involves rigorous multi-dimensional fairness testing, scenario analysis, and continuous monitoring frameworks to proactively detect and address disparities.",
      idealFor: "Organizations seeking public trust, regulatory compliance, and social responsibility in all AI deployments."
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-6 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            Certification Programs: Validate Your Expertise
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            with AI Authority
          </p>
        </div>
      </section>

      {/* Why AI Certification Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why AI Certification?
          </h2>

          <div className="space-y-3">
            {whyAICertification.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 flex items-center">
                    <span className="text-blue-600 mr-3">+</span>
                    {item.title}
                  </span>
                </button>
                {openAccordion === item.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification For Individuals Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Certification For Individuals
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-4xl mx-auto">
            AI Authority's individual certifications empower professionals to excel in every dimension of AI—spanning strategic leadership, enterprise architecture, solution design, development, governance, and security. Each program validates both technical expertise and strategic acumen, equipping you to design, implement, and manage AI with impact and integrity. Built on proprietary frameworks and aligned with global best practices, our credentials are anchored in international standards such as ISO 42001, NIST AI RMF, and the EU AI Act—ensuring that your skills are recognized, relevant, and future-ready in a rapidly evolving AI landscape.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Certification Buttons */}
            <div className="lg:col-span-1 space-y-2">
              {individualCertifications.map((cert, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndividualCert(cert)}
                  className={`w-full px-4 py-4 text-center font-semibold rounded-md transition-all duration-200 shadow-md
                            ${selectedIndividualCert === cert 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                >
                  {cert}
                </button>
              ))}
            </div>

            {/* Right Content - Certification Details */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedIndividualCert}
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {certificationContent[selectedIndividualCert].description}
                  </p>
                  
                  {/* Render bullets if available */}
                  {certificationContent[selectedIndividualCert].bullets && (
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {certificationContent[selectedIndividualCert].bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Render sections if available (for AI Developer) */}
                  {certificationContent[selectedIndividualCert].sections && (
                    <div className="space-y-4">
                      {certificationContent[selectedIndividualCert].sections.map((section, index) => (
                        <div key={index}>
                          <h4 className="font-bold text-gray-900 mb-2">{section.title}</h4>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            {section.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Render "Ideal for" if available */}
                  {certificationContent[selectedIndividualCert].idealFor && (
                    <p className="mt-6">
                      {certificationContent[selectedIndividualCert].idealFor}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/certified-members"
                  className="inline-block px-10 py-4 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors shadow-lg text-lg"
                >
                  Certified Members
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications for Organizations Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Certifications for Organizations
          </h2>
          <p className="text-center text-gray-700 mb-12 max-w-4xl mx-auto">
            Our organizational certification suite enables enterprises to lead in responsible, scalable, and compliant AI adoption. Covering maturity, readiness, value realization, regulatory compliance, bias detection, and fairness, these certifications offer rigorous, evidence-based assessments rooted in global benchmarks and AI Authority's proprietary methodologies. They provide not only a trusted credential but also actionable, data-driven roadmaps for improvement—helping organizations meet evolving regulations, enhance public trust, and achieve sustainable AI excellence. All programs are anchored in globally recognized standards, including ISO 42001, NIST, the EU AI Act, and key regional frameworks, ensuring global credibility and ongoing relevance.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Certification Buttons */}
            <div className="lg:col-span-1 space-y-2">
              {organizationCertifications.map((cert, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOrgCert(cert)}
                  className={`w-full px-4 py-4 text-center font-semibold rounded-md transition-all duration-200 shadow-md
                            ${selectedOrgCert === cert 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                >
                  {cert}
                </button>
              ))}
            </div>

            {/* Right Content - Certification Details */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedOrgCert}
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    {organizationContent[selectedOrgCert].description}
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Ideal for</h4>
                  <p className="text-gray-700">
                    {organizationContent[selectedOrgCert].idealFor}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-gray-600 max-w-4xl mx-auto">
            <p>
              All certifications leverage AI Authority's proprietary frameworks and are rooted in global standards such as ISO 42001, NIST AI RMF, EU AI Act, and more. Certified organizations earn not just a credential but a practical, data-driven roadmap to Responsible AI leadership.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
