import backgroundImage from "../../assets/Untitled-design-27.png";

export default function Toolkits() {
  const toolkits = [
    {
      title: "AI Maturity Assessment Toolkit",
      description: "Our AI Maturity Assessment Toolkit provides a structured framework for organizations to objectively evaluate their current position on the AI journey. This comprehensive tool helps you measure your capabilities across key dimensions, including strategy, data infrastructure, talent, and governance. By generating a clear maturity score and a detailed report, this toolkit offers a strategic roadmap for growth, identifying strengths to leverage and pinpointing specific areas that require investment and development to advance your AI competence and unlock your full potential."
    },
    {
      title: "AI Readiness Assessment Toolkit",
      description: "The AI Readiness Assessment Toolkit is designed to prepare your organization for successful AI adoption from the ground up. This practical resource helps you evaluate your internal preparedness by analyzing your data availability and quality, technological infrastructure, and the skills and culture of your team. By identifying critical gaps and potential roadblocks before a project begins, this toolkit allows you to make informed decisions, allocate resources effectively, and build a solid foundation that minimizes risk and maximizes the likelihood of a seamless and impactful AI implementation."
    },
    {
      title: "AI Value Assessment Toolkit",
      description: "Our AI Value Assessment Toolkit provides a rigorous methodology for evaluating the business case and return on investment (ROI) of potential AI initiatives. This tool enables you to systematically prioritize projects based on their potential to drive tangible value, from enhancing operational efficiency to creating new revenue streams. By providing a clear framework for defining key performance indicators (KPIs) and measuring expected outcomes, this toolkit ensures that your AI investments are strategically aligned with business goals and focused on delivering the greatest possible impact."
    },
    {
      title: "AI Regulation Compliance Assessment Toolkit",
      description: "Navigating the complex and evolving landscape of AI regulations is a critical challenge. The AI Regulation Compliance Assessment Toolkit provides a comprehensive resource to help you evaluate your AI systems against key global standards and emerging legislation, such as the EU AI Act. This tool simplifies the process of identifying compliance gaps, managing risk, and documenting adherence to regulatory requirements. By leveraging this toolkit, you can ensure that your AI initiatives are not only innovative and effective but also legally defensible and built on a foundation of responsible governance."
    },
    {
      title: "Bias Impact Assessment Toolkit",
      description: "Our Bias Impact Assessment Toolkit is a powerful resource for identifying and understanding the presence of unintended bias in your AI systems. This tool provides a structured approach to analyzing how algorithmic decisions may disproportionately affect individuals or groups, covering every stage from data collection to model deployment. By guiding you through the process of detecting potential biases and documenting their impact, this toolkit equips you to proactively address ethical risks and ensures that your AI applications are built for fairness and inclusivity."
    },
    {
      title: "Fairness Assessment Toolkit",
      description: "The Fairness Assessment Toolkit provides the practical tools and metrics needed to build equitable and impartial AI solutions. This toolkit moves beyond simply identifying bias to offering a hands-on methodology for evaluating and improving the fairness of your models. It helps you define fairness goals; measure outcomes using a variety of industry-standard metrics and apply targeted mitigation strategies to achieve equitable results. By integrating this toolkit into your development process, you can build trust in your AI and demonstrate a clear commitment to producing fair and just outcomes for all users."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section with Background Image */}
      <section 
        className="bg-cover bg-center bg-no-repeat relative py-20"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        {/* Background overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-90"></div>
        
        <div className="relative z-10 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Toolkits
            </h1>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive toolkits provide professionals and organizations with the practical resources needed to move from theoretical concepts to actionable results. Each toolkit is a specialized, hands-on solution designed to systematically assess and guide a specific aspect of your AI journey—from evaluating your organizational maturity to ensuring ethical compliance. By leveraging these powerful tools, you can gain objective insights, identify critical gaps, and implement best practices with confidence, transforming the complex challenges of responsible AI into structured, manageable processes that drive measurable progress.
            </p>
          </div>
        </div>
      </section>

      {/* Toolkits Grid Section - Clean White Background */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Toolkits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolkits.map((toolkit, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  {toolkit.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 leading-relaxed text-sm">
                  {toolkit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}