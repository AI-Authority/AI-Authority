import { useState, useEffect } from "react";
import { Calendar, User, Tag } from "lucide-react";
import backgroundImage from "../../assets/Untitled-design-27.png";

export default function Blogs() {
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

  const blogPosts = [
    {
      title: "Artificial Intelligence Design",
      author: "ai_authority",
      date: "August 11, 2025",
      category: "Uncategorized",
      excerpt: "Revolutionizing Digital Transformation: A Deep Dive into Strategic AI Design In today's competitive digital economy, Artificial Intelligence (AI) has emerged as the ultimate game-changer...",
      readMoreLink: "/blog/artificial-intelligence-design"
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
              <span className="text-gray-800">Section Title </span>
              <span className="text-blue-600">•</span>
            </h1>
            <p className={`text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible.header ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Stay informed with the latest insights, trends, and best practices in AI development, governance, and responsible implementation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section 
        id="blog-posts"
        data-animate
        className={`px-6 py-16 bg-white transition-all duration-1000 ${
          isVisible['blog-posts'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div 
                key={index}
                className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 ${
                  isVisible['blog-posts'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${200 + index * 150}ms` }}
              >
                {/* Blog Post Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>By {post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                  
                  {/* Excerpt */}
                  <p className="text-gray-700 leading-relaxed text-sm mb-6">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More Button */}
                  <a 
                    href={post.readMoreLink}
                    className="inline-block px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm font-medium"
                  >
                    Read More
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