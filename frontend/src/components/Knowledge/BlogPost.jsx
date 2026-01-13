import { useState } from "react";
import { Calendar, User, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogPost() {
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    website: '',
    saveInfo: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Comment submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Back to Blogs */}
      <div className="bg-gray-50 py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
        </div>
      </div>

      {/* Blog Post Content */}
      <article className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Artificial Intelligence Design
            </h1>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center gap-1">
                <span className="text-blue-600">Uncategorized</span>
              </div>
              <span>/</span>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>August 11, 2025</span>
              </div>
              <span>/</span>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <a href="#comments" className="text-blue-600 hover:text-blue-700">Leave a Comment</a>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Revolutionizing Digital Transformation: A Deep Dive into Strategic AI Design
            </h2>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              In today's competitive digital economy, <strong>Artificial Intelligence (AI)</strong> has emerged as the ultimate game-changer. From automating repetitive tasks to delivering deep strategic insights, AI empowers businesses to innovate, adapt, and lead. However, the true value of AI is unlocked through <strong>meticulous design and deployment</strong>—an art and science we've mastered at SNA Technologies.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">The Pillars of Strategic AI Design</h3>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Tailored Business Analysis</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Data Diagnostics:</strong> Auditing data quality, relevance, and structure for accurate AI outputs.</li>
              <li><strong>Operational Mapping:</strong> Pinpointing inefficiencies and automation opportunities.</li>
              <li><strong>Strategic Alignment:</strong> Aligning AI goals with long-term business visions.</li>
              <li><strong>Case in Point:</strong> A retail client boosted sales by 15% through a custom AI-driven recommendation engine.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Advanced Technological Frameworks</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Deep Learning Frameworks:</strong> Utilizing TensorFlow and PyTorch for cutting-edge model development.</li>
              <li><strong>Cloud Platforms:</strong> Leveraging AWS SageMaker, Azure AI, and Google Vertex AI for scalability.</li>
              <li><strong>Edge Computing:</strong> Enabling real-time analytics for IoT and autonomous systems.</li>
              <li><strong>Case in Point:</strong> A logistics provider reduced delivery times by 30% with AI-powered route optimization.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. AI Design Techniques</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Generative Design:</strong> Leveraging AI to generate innovative solutions and designs.</li>
              <li><strong>AI-Powered Tools:</strong> Streamlining workflows with intelligent automation.</li>
              <li><strong>Color Palettes:</strong> Enhancing aesthetic coherence through AI-driven palette selection.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Data Gathering Considerations</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Ethics:</strong> Upholding data privacy and integrity.</li>
              <li><strong>Validity:</strong> Ensuring data represents the intended phenomenon.</li>
              <li><strong>Reliability:</strong> Guaranteeing consistent data results.</li>
              <li><strong>Sampling:</strong> Acquiring representative datasets.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Examples of Data Gathering</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Market Research:</strong> Understanding consumer behavior.</li>
              <li><strong>Scientific Research:</strong> Gathering experimental evidence.</li>
              <li><strong>Social Science Research:</strong> Exploring societal trends.</li>
              <li><strong>Business Analytics:</strong> Driving data-backed decision-making.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6. Key Aspects of Model Development</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Iterative Process:</strong> Refining models through repeated testing and improvement.</li>
              <li><strong>Data as the Core:</strong> Ensuring data quality and relevance.</li>
              <li><strong>Algorithm Selection:</strong> Choosing models aligned with objectives.</li>
              <li><strong>Training Phase:</strong> Building accurate, robust models.</li>
              <li><strong>Evaluation and Refinement:</strong> Stress-testing and improving performance.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7. Typical Steps in Model Development</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Problem definition, data collection, preprocessing, exploratory analysis, feature engineering, model building, model evaluation, deployment, and maintenance—all executed iteratively for optimal performance.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8. Key Points of Evaluation</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Purpose:</strong> Defining the goals AI is designed to achieve.</li>
              <li><strong>Process:</strong> Outlining the workflow for seamless AI integration.</li>
              <li><strong>Application:</strong> Assessing how AI adds value across different use cases.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Transitioning from Development to Production</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Integration with Existing Systems:</strong> Ensuring AI works harmoniously with current infrastructure.</li>
              <li><strong>Containerization:</strong> Employing Docker and Kubernetes for secure, rapid deployment.</li>
              <li><strong>Monitoring and Scaling:</strong> Using AIOps for real-time performance insights and scalability.</li>
              <li><strong>Case in Point:</strong> A manufacturing firm reduced operational downtime by 40% through predictive maintenance AI.</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Building a Business Case for AI</h3>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. AI Roadmap and Implementation Strategy</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Crafting actionable steps to integrate AI across organizational functions.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Data Strategy and Management</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Establishing robust frameworks for data collection, storage, and utilization.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Harnessing AI in the Workplace</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Enhancing productivity, employee engagement, and innovation.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Program Reflection and Future Prospects</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Evaluating success metrics and adapting for long-term AI sustainability.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Fundamentals of AI Design and Machine Learning</h3>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Introduction to AI Design Processes</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              From defining objectives to deployment, focusing on seamless implementation.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">2. AI Technology Fundamentals</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Machine Learning:</strong> Algorithms learning from data.</li>
              <li><strong>Deep Learning:</strong> Neural networks driving advanced capabilities.</li>
            </ul>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Designing Intelligent Systems</h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              Building AI solutions for human-computer interaction and organizational synergy.
            </p>

            <h4 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4. AI in Action</h4>
            <p className="text-gray-700 leading-relaxed mb-8">
              From predictive maintenance to dynamic customer insights, AI is redefining operational excellence.
            </p>
          </div>

          {/* Comments Section */}
          <section id="comments" className="mt-16 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Leave a Comment</h3>
            
            <p className="text-gray-600 mb-6">
              Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Comment Textarea */}
              <div>
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Type here.."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                  required
                />
              </div>

              {/* Name, Email, Website Fields */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email*"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Save Info Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="saveInfo" className="text-gray-700">
                  Save my name, email, and website in this browser for the next time I comment.
                </label>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Post Comment »
                </button>
              </div>
            </form>
          </section>
        </div>
      </article>
    </div>
  );
}