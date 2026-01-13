import { useState } from "react";
import bgImage from "../../assets/Untitled-design-36.png";
import { Link, useNavigate } from "react-router-dom";

export default function TrainingService() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const [showBrochure, setShowBrochure] = useState(false);
  const [brochureTitle, setBrochureTitle] = useState("");
  const [pdfError, setPdfError] = useState(false);

  const openBrochure = async (title) => {
    const exists = await checkPdfExists(title);

    setBrochureTitle(title);

    if (!exists) {
      setPdfError(true);
    } else {
      setPdfError(false);
    }

    setShowBrochure(true);
  };

  const checkPdfExists = async (title) => {
    const url = `/brochure/${title}.pdf`;

    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok && res.headers.get("content-type")?.includes("pdf");
    } catch {
      return false;
    }
  };


  const pdfUrl = `/brochure/${brochureTitle}.pdf`;

  const sections = [
    {
      title: "Enterprise AI Architecture",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">
              <p><strong>Enterprise AI Architecture course</strong></p>

              <p>
                The Enterprise AI Architecture course program equips professionals with the skills and
                expertise to design, lead, and scale AI initiatives across the enterprise.
              </p>

              <p>
                Participants will learn how to architect AI systems that are strategically aligned with
                business objectives, operationally effective, and tailored to the unique needs of their
                organization.
              </p>
            </div>
          </div>

          {/* Competencies Covered Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                The course covers a comprehensive set of competencies, including:
              </h3>
            </div>

            <div className="p-5 text-black space-y-2">
              <p>• Analysing organizational context-environment, strategic drivers, goals, and objectives</p>
              <p>• Adapting AI frameworks to enterprise-specific requirements</p>
              <p>• Establishing foundational AI principles to guide design and implementation</p>
              <p>• Defining AI strategies with clear roadmaps and execution plans</p>
              <p>
                • Designing enterprise-grade AI architectures spanning business, data, application,
                and technology layers
              </p>
              <p>
                • Developing implementation and migration strategies for smooth adoption and scalability
              </p>
              <p>
                • Implementing AI governance to ensure compliance and architectural alignment
              </p>
              <p>
                • Leading change management initiatives across both business and technology domains
              </p>
            </div>
          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend
              </h3>
            </div>

            <div className="p-5 text-black">
              <p>
                <strong>Who can attend Enterprise AI Architecture course?</strong>
              </p>
              <p className="mt-2">
                Enterprise Architects, Business and Technology executives, Program/Project Managers,
                Operations executives
              </p>
            </div>
          </div>

        </div>
      ),
    },

    {
      title: "AI Strategy",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">
              <p><strong>AI Strategy Course</strong></p>

              <p>
                The AI Strategy course prepares professionals to design and lead a
                comprehensive AI strategy that drives measurable business impact.
              </p>

              <p>
                Participants will develop the skills to align AI initiatives with
                organizational goals, engage stakeholders effectively, and create
                a clear, actionable roadmap for AI adoption.
              </p>

              <p><strong>Through this program, learners will gain expertise in:</strong></p>

              <p>• Identifying key stakeholders and addressing their needs and concerns</p>
              <p>• Crafting a forward-looking AI vision aligned with strategic objectives</p>
              <p>• Conducting value assessments to prioritize high-impact AI use cases</p>
              <p>• Performing readiness assessments across technology, data, talent, and governance</p>
              <p>• Defining organizational enablers to realize the AI vision</p>
              <p>• Designing a strategic roadmap for enabling capabilities</p>
              <p>• Formulating practical, scalable AI implementation strategies</p>
            </div>

          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend
              </h3>
            </div>

            <div className="p-5 text-black space-y-2">
              <p>• Top Level Management</p>
              <p>• CXOs</p>
              <p>• Innovation Leaders and Digital Transformation Professionals</p>
              <p>• Enterprise Architects</p>
              <p>• Business and Technology Executives</p>
              <p>• Program / Project Managers</p>
              <p>• Operations Executives</p>
            </div>

          </div>

        </div>
      ),
    },

    {
      title: "AI Solution Architecture",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">
              <p><strong>AI Solution Architecture Course</strong></p>

              <p>
                This course provides a comprehensive foundation in AI Solution
                Architecture, equipping professionals with the knowledge and
                frameworks to design, integrate, and govern AI-driven solutions at scale.
              </p>

              <p>
                Participants will explore how AI fits into the broader enterprise
                architecture, develop skills in solution design, and gain practical
                knowledge of deployment, governance, and security best practices.
              </p>

              <p><strong>Through this program, learners will gain expertise in:</strong></p>

              <p>• Introduction to AI Solution Architecture</p>
              <p>• Relation between AI Solution Architecture and AI Enterprise Architecture</p>
              <p>• AI Maturity Model</p>
              <p>• AI Reference Architecture</p>
              <p>• AI Architectures (Business, Data, Application, Technology)</p>
              <p>• AI Landscape Navigation (Data Science / Engineering, Feature Engineering, Fine-tuning)</p>
              <p>• Types of AI Solutions (ML, Prompt Engineering, LLMs, Generative AI, Agentic AI, RAG, Frameworks)</p>
              <p>• Patterns of AI Solutions</p>
              <p>• Model Selection and Evaluation</p>
              <p>• Coding best practices</p>
              <p>• AI UI / UX Design Patterns</p>
              <p>• AI Orchestration and Integration Patterns</p>
              <p>• AI Security Guardrails</p>
              <p>• Tool / Infrastructure Selection</p>
              <p>• AI Standards and Regulations</p>
              <p>• AI Governance</p>
              <p>• AI Solution Deployment</p>
            </div>

          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend
              </h3>
            </div>

            <div className="p-5 text-black space-y-2">
              <p>• Solution Architects</p>
              <p>• Team Leads</p>
              <p>• Project Managers</p>
              <p>• Operations Managers</p>
            </div>

          </div>

        </div>
      )
    },

    {
      title: "AI Security",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">Course Details</h3>
            </div>

            <div className="p-5 text-black space-y-3">

              <p><strong>AI Security</strong></p>

              <p>
                The AI Security program provides professionals with an end-to-end
                understanding of how to protect AI systems throughout their lifecycle,
                from data ingestion and model development to deployment and user interaction.
              </p>

              <p>
                This comprehensive training covers AI-specific risks, adversarial threats,
                security controls, governance practices, and enterprise protection mechanisms.
              </p>

              <p>
                Participants learn how to defend AI systems against adversarial attacks,
                data poisoning, model manipulation, unauthorized access, and operational misuse.
              </p>

              <p>
                The course includes real-world examples, practical frameworks, hands-on labs,
                and guidance on building enterprise-grade AI Security Architectures that safeguard
                both technical and business environments.
              </p>

            </div>

          </div>


          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">Who Can Attend?</h3>
            </div>

            <div className="p-5 text-black">

              <ul className="list-disc ml-6 space-y-1">
                <li>Cybersecurity, Cloud Security, and IT Security professionals</li>
                <li>AI/ML Engineers</li>
                <li>Data Scientists</li>
                <li>Model Developers</li>
                <li>Solution Architects</li>
                <li>DevSecOps</li>
                <li>Platform Security teams</li>
                <li>IT Operations, Risk, and Compliance professionals</li>
                <li>Anyone involved in securing AI systems in enterprise environments</li>
              </ul>

            </div>

          </div>

        </div>
      )
    },



    {
      title: "AI Operations",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">

              <p><strong>AI Operations</strong></p>

              <p>
                The AI Operations program provides professionals with a comprehensive
                understanding of how AI enhances enterprise IT operations. This 2-day intensive
                course covers AIOps concepts, architecture, observability, automation, and
                enterprise implementation methodologies.
              </p>

              <p>
                Participants will learn how AI/ML models improve monitoring, incident management,
                anomaly detection, and root cause analysis across modern cloud and hybrid
                environments.
              </p>

              <p>
                The course is delivered by seasoned industry experts and includes practical hands-on
                labs, real AIOps tools, and enterprise-grade implementation scenarios.
              </p>

              <p>
                By the end of the program, learners gain the expertise to architect, deploy, and scale
                AIOps capabilities that improve resiliency, reduce downtime, and automate operational
                workflows.
              </p>

            </div>

          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend?
              </h3>
            </div>

            <div className="p-5 text-black">
              <ul className="list-disc ml-6 space-y-1">

                <li>IT Operations</li>

                <li>
                  Cloud, DevOps, and SRE professionals aiming to automate
                  operations using AI
                </li>

                <li>
                  Data Engineers, AI/ML Engineers, and Solution Architects working
                  with monitoring and observability systems
                </li>

                <li>
                  Anyone looking to implement or scale AIOps capabilities within
                  enterprise environments
                </li>

              </ul>
            </div>

          </div>

        </div>
      )
    },


    {
      title: "AI Integration",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">
              <p><strong>AI Integration Architecture course</strong></p>

              <p>
                The AI Integration Overview course provides professionals with a
                comprehensive understanding of how Artificial Intelligence can be
                seamlessly integrated across enterprise systems. This program focuses on
                designing, orchestrating, and governing AI-driven solutions within existing IT
                landscapes. Participants will gain the knowledge to align AI capabilities with
                business goals, streamline workflows, and ensure secure and compliant
                operations.
              </p>

              <p><strong>AI Integration Architecture:</strong></p>

              <p>
                • <strong>User Interaction Layer:</strong> Facilitates communication between users
                and AI-enabled systems through channels such as web, mobile,
                chatbot, and voice-based interfaces. It ensures intuitive user
                experiences and smooth access to AI-driven insights.
              </p>

              <p>
                • <strong>Application Layer:</strong> Hosts enterprise applications and microservices
                that consume AI outputs through APIs. This layer is responsible for
                embedding AI-driven automation and decision-making into business
                workflows.
              </p>

              <p>
                • <strong>Integration and Orchestration Layer:</strong> Acts as the backbone for
                connecting AI services with core systems. It manages data flow, event-driven
                communication, and workflow orchestration to ensure
                seamless interaction between AI, data, and application components.
              </p>

              <p>
                • <strong>AI/ML Layer:</strong> Comprises the tools and pipelines required for model
                development, deployment, and management. It includes model
                training, inference, feature stores, and MLOps pipelines for
                continuous monitoring and improvement.
              </p>

              <p>
                • <strong>Data Layer:</strong> Serves as the foundation of AI integration by managing
                structured and unstructured data from various sources. This includes
                data lakes, warehouses, and ETL processes ensuring data quality,
                consistency, and accessibility across the enterprise.
              </p>

              <p>
                • <strong>Supporting Components:</strong> To ensure operational excellence and
                responsible AI deployment, several governance and operational
                components support the architecture:
              </p>

              <p>• AI Governance Framework: Defines ethical use, compliance, and accountability policies.</p>
              <p>• Model Monitoring and Evaluation: Tracks model drift, accuracy, and performance.</p>
              <p>• Security and Compliance: Ensures protection of data, APIs, and models from unauthorized access.</p>
              <p>• Observability and Logging: Enhances transparency through monitoring and traceability.</p>
              <p>• Continuous Improvement Loop: Enables iterative learning and optimization based on data feedback.</p>
            </div>

          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend
              </h3>
            </div>

            <div className="p-5 text-black space-y-2">
              <p>
                This program is designed for professionals involved in designing, managing,
                or implementing AI within enterprise environments, including:
              </p>

              <p>• Solution Architects</p>
              <p>• AI Engineers and Data Scientists</p>
              <p>• Enterprise Architects</p>
              <p>• Project Managers and Delivery Leads</p>
              <p>• IT Directors and Innovation Officers</p>
            </div>

          </div>

        </div>
      )
    },


    {
      title: "AI Governance",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">
              <p><strong>AI Governance course</strong></p>

              <p>
                AI Governance refers to the frameworks, policies, and processes that ensure
                the ethical, transparent, and accountable use of AI within an organization.
                This course covers AI governance that helps address the risks associated
                with AI, such as bias, privacy concerns, security risks, and unintended
                consequences, while promoting responsible AI development.
              </p>

              <p><strong>The course covers a comprehensive set of competencies, including:</strong></p>

              <p>• AI Fundamentals: basic concepts of Artificial Intelligence</p>
              <p>• Enterprise AI Architecture frameworks – components of Enterprise AI Architecture</p>
              <p>• AI Skills and Teams – skills needed to execute AI and govern AI</p>
              <p>• AI Governance – framework to do AI governance</p>
              <p>• AI Strategy and Roadmap – that comes as an input into AI Governance</p>
              <p>• AI Standards – from ISO, NIST</p>
              <p>• AI Controls – controls that we need to put in place to govern the AI</p>
              <p>• Data, Programming methods and Tools – how we acquire, process and use the data and tools and techniques that we use</p>
              <p>• Technology Infrastructure and Cloud – infrastructure for AI computing</p>
              <p>• Methodology and Processes – what methodologies we use to build AI systems</p>
              <p>• Ethics and Regulations – what ethics and regulations we need to comply with</p>
              <p>• Security – what security aspects we need to follow to build AI systems</p>
              <p>• Enterprise AI Integration – how other systems are integrated with AI</p>
              <p>• Risk Management – how we manage AI Risks</p>
              <p>• AI Performance Metrics – how we measure the success of AI</p>

            </div>

          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend
              </h3>
            </div>

            <div className="p-5 text-black space-y-2">
              <p>• CXOs</p>
              <p>• Enterprise Architects</p>
              <p>• Business and Technology Executives</p>
              <p>• Program / Project Managers</p>
              <p>• Operations Executives</p>
            </div>

          </div>

        </div>
      )
    },

    {
      title: "AI for Executives",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">

              <p><strong>AI for Executives</strong></p>

              <p>
                The AI for Executives Training is a one-day intensive program designed for
                leaders who want a clear, strategic understanding of Artificial Intelligence
                and its relevance to modern enterprises. The program helps executives grasp
                essential AI concepts, the business value it can unlock, and the types of
                real-world use cases that are transforming industries today. It also provides
                clarity on governance, responsible adoption, and the leadership mindset
                required to guide AI-driven initiatives.
              </p>

              <p>
                This training equips leaders with a strong foundational understanding of what
                AI is, how it works at a high level, and how it can be applied to solve
                business challenges, improve decision-making, and accelerate digital
                transformation. Participants gain insights into industry trends, practical
                examples, and key risk considerations that influence AI adoption at an
                enterprise scale.
              </p>

              <p>
                The program also introduces organizational readiness frameworks that help
                leaders assess current capabilities, identify gaps, and plan for successful AI
                integration across teams and business units. By the end of the session,
                executives are prepared to make informed decisions, evaluate opportunities,
                and shape strategies that align AI investments with long-term organizational
                goals.
              </p>

            </div>
          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend?
              </h3>
            </div>

            <div className="p-5 text-black">

              <ul className="list-disc ml-6 space-y-1">

                <li>C-suite leaders (CEO, CIO, CTO, CDO, COO, CFO)</li>
                <li>Senior Management & Business Unit Heads</li>
                <li>Strategy, Innovation, and Digital Transformation Leaders</li>
                <li>Product, Program, and Portfolio Managers</li>

                <li>
                  HR, Operations, Finance, and Marketing Leaders exploring AI
                  adoption
                </li>

                <li>Enterprise Architects and Technology Decision Makers</li>

                <li>
                  Anyone responsible for driving AI initiatives, governance, or
                  organizational transformation
                </li>

              </ul>

            </div>
          </div>

        </div>
      )
    },

    {
      title: "AI Engineering 1",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            {/* Heading */}
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 text-black space-y-3">
              <p><strong>AI Engineering 1</strong></p>

              <p>
                The AI Engineering 1 Program is designed to build strong, industry-ready
                skills across the modern AI stack. This program is split into two levels:
              </p>

              <p>
                The AI Engineering 1 Course focuses on core AI fundamentals, including
                Machine Learning, Neural Networks, Deep Learning, Generative AI, and LLM
                basics. Learners understand how different layers of AI work together and
                how modern AI solutions are built.
              </p>
            </div>
          </div>

          {/* Who Can Attend */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            {/* Heading */}
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend?
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 text-black">
              <ul className="list-disc ml-6 space-y-1">
                <li>Freshers & beginners entering AI roles</li>
                <li>Software Developers / Test Engineers</li>
                <li>Data Analysts / BI Analysts</li>
                <li>Students preparing for AI/ML career transitions</li>
                <li>Anyone who wants strong fundamentals in modern AI</li>
              </ul>
            </div>
          </div>

        </div>
      )
    }
    ,

    {
      title: "AI Engineering 2",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            {/* Heading */}
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 text-black space-y-3">

              <p><strong>AI Engineering 2</strong></p>

              <p>
                The AI Engineering 2 Program is designed to build strong, industry-ready
                skills across the modern AI stack. This program is split into two levels:
              </p>

              <p>
                The AI Engineering 2 Course focuses on advanced capabilities: Generative
                AI design, LLM integration, Agentic AI systems, tool-use, real-time
                adaptation, autonomous workflows, and applied engineering techniques.
              </p>

            </div>
          </div>

          {/* Who Can Attend */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            {/* Heading */}
            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend?
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 text-black">
              <ul className="list-disc ml-6 space-y-1">
                <li>AI/ML Engineers</li>
                <li>Developers & Technical Leads</li>
                <li>Solution Architects</li>
                <li>Automation Engineers</li>
                <li>Professionals who completed Level 1</li>
                <li>Anyone working with GenAI, LLMs, or AI automation</li>
              </ul>
            </div>
          </div>

        </div>
      )
    }
    ,

    {
      title: "AI Computing",
      content: (
        <div className="leading-relaxed space-y-6">

          {/* Course Details Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Course Details
              </h3>
            </div>

            <div className="p-5 text-black space-y-3">
              <p><strong>AI Computing course</strong></p>

              <p>
                The AI Computing Overview course provides a foundational understanding
                of the computing technologies that enable Artificial Intelligence (AI)
                systems. Participants will explore how diƯerent computational
                architectures from CPUs and GPUs to TPUs, Cloud AI, and Quantum AI
                support AI workloads, model training, and large-scale deployments. This
                course helps learners develop insights into selecting the right
                computational approach for various AI applications, optimizing both
                performance and cost.
              </p>

              <p><strong>Through this program, learners will gain expertise in:</strong></p>

              <p>• Understanding AI computing architectures: CPU, GPU, TPU, Cloud AI, Quantum AI</p>
              <p>• Exploring roles of different hardware types in AI workflows</p>
              <p>• Evaluating performance and scalability trade-offs</p>
              <p>• Learning about future trends in AI computation and hardware innovation</p>
            </div>

          </div>

          {/* Who Can Attend Block */}
          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-[#DEDEFF] to-[#00D4FF]">

            <div className="bg-[#0A1A2F] text-white py-2 w-full text-center">
              <h3 className="font-semibold underline underline-offset-4">
                Who Can Attend
              </h3>
            </div>

            <div className="p-5 text-black space-y-2">
              <p>• Solution Architects</p>
              <p>• AI Engineers</p>
              <p>• Data Scientists</p>
              <p>• IT Infrastructure Managers</p>
              <p>• Anyone involved in AI systems design, deployment, or optimization</p>
            </div>

          </div>

        </div>
      )
    },

  ];

  const toggleSection = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div
        className="relative h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})`, backgroundAttachment: "scroll" }}
      >
        <div className="absolute inset-0 bg-white/30" />
        <h1 className="relative text-5xl font-bold text-gray-900 z-10 text-center px-4">
          AI Authority Training Programs
        </h1>
      </div>

      <div className="max-w-4xl mx-auto py-16 px-6">
        <p className="text-lg text-gray-600 mb-8 text-center">
          Unlock the full potential of your team with expert-led training on AI Authority’s unique proprietary resources. Our training programs empower your workforce to develop responsible, ethical, and scalable AI capabilities.
        </p>

        {/* Accordion */}
        <div className="border rounded-md overflow-hidden">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border-b last:border-none bg-white hover:bg-gray-50"
            >
              <button
                onClick={() => toggleSection(index)}
                className="flex items-center w-full p-4 text-left text-lg font-medium text-gray-900"
              >
                <span className="text-2xl font-bold w-6 text-center">
                  {openIndex === index ? "−" : "+"}
                </span>
                <span className="ml-2">{section.title}</span>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden border-t bg-gray-50 text-gray-700 ${openIndex === index ? "max-h-[3000px] p-4" : "max-h-0 p-0"
                  }`}
              >
                {section.content}

                {openIndex === index && (
                  <div className="mt-6 pt-4 border-t border-gray-300 flex gap-4 flex-wrap">
                    {/* Enroll */}
                    <button
                      onClick={() =>
                        navigate("/view-services", {
                          state: { filterBy: section.title },
                        })
                      }
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md"
                    >
                      Enroll {section.title} Courses →
                    </button>

                    {/* View Brochure */}
                    <button
                      onClick={() => openBrochure(section.title)}
                      className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 shadow-md"
                    >
                      View Brochure 📄
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Brochure Modal */}
        {showBrochure && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
            <div className="bg-white w-full max-w-5xl h-[85vh] rounded-lg shadow-lg flex flex-col overflow-hidden">

              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">
                  {brochureTitle} – Brochure
                </h2>

                <div className="flex gap-3">
                  {/* Download Button */}
                  <a
                    href={pdfUrl}
                    download
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Download ⬇
                  </a>

                  {/* Close */}
                  <button
                    onClick={() => setShowBrochure(false)}
                    className="text-xl font-bold text-gray-600 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* PDF / Fallback */}
              <div className="flex-1 bg-gray-100">
                {!pdfError ? (
                  <object
                    data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                    type="application/pdf"
                    className="w-full h-full"
                    onError={() => setPdfError(true)}
                  >
                    {/* Fallback if object fails */}
                    <div className="flex items-center justify-center h-full text-gray-600">
                      PDF preview not supported.
                    </div>
                  </object>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <p className="text-lg font-medium mb-2">
                      Brochure not available
                    </p>
                    <p>Please contact support or try again later.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
      <div className="text-center mb-10">
        <Link
          to="/view-services"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-all"
        >
          View Services →
        </Link>
      </div>
    </div>
  );
}