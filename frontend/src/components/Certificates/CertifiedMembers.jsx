import { useState, useEffect } from "react";
import heroBg from "../../assets/Untitled-design-36.png";
import downloadIcon from "../../assets/Untitled-design.png";

// Import PDF certificates
import ahmedCert from "../../assets/Ahmed-Abd-Al-Aziz_20250908_152858_0000.pdf";
import ayyappanCert from "../../assets/Ayyappan-Paramesh_20250908_152955_0000.pdf";
import satyanarayanaCert from "../../assets/Satyanarayana-Komaravolu_20250908_153041_0000.pdf";
import sudhakarCert from "../../assets/Sudhakar-Krovi_20250908_153104_0000.pdf";
import yogeshCert from "../../assets/Yogesh-V-Shetty-_20250908_153130_0000.pdf";
import tharanathCert from "../../assets/Tharanath-Umesh.pdf";
import vijayababuCert from "../../assets/Vijayababu-Boopathy.pdf";
import rizviCert from "../../assets/Rizvi-Athram.pdf";
import kishoreCert from "../../assets/Kishore-N-V-S-S-Tummalapalli.pdf";
import sahayaCert from "../../assets/Sahaya-Thivearaj.pdf";
import mubinCert from "../../assets/Mubin-Shaik.pdf";
import benCert from "../../assets/Ben-Teunissen.pdf";

export default function CertifiedMembers() {
  const [selectedCategory, setSelectedCategory] = useState("Certified Enterprise AI Architect");
  const [uploadedCertificates, setUploadedCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = `${import.meta.env.VITE_API_URL}/api` || "http://localhost:5000/api";

  const categories = [
    "Certified Enterprise AI Architect",
    "Certified AI Strategist",
    "Certified AI Solution Architect",
    "Certified AI Developer",
    "Certified AI Governance Officer",
    "Certified AI Security Architect"
  ];

  const certifiedMembers = {
    "Certified Enterprise AI Architect": [
      {
        name: "Ahmed Abd Al Aziz",
        company: "-",
        dateCertified: "August 2025",
        certificate: ahmedCert
      },
      {
        name: "Ayyappan Paramesh",
        company: "-",
        dateCertified: "June 2025",
        certificate: ayyappanCert
      },
      {
        name: "Satyanarayana Komaravolu",
        company: "-",
        dateCertified: "August 2025",
        certificate: satyanarayanaCert
      },
      {
        name: "Sudhakar Krovi",
        company: "-",
        dateCertified: "August 2025",
        certificate: sudhakarCert
      },
      {
        name: "Yogesh V Shetty",
        company: "-",
        dateCertified: "June 2025",
        certificate: yogeshCert
      },
      {
        name: "Tharanath Umesh",
        company: "-",
        dateCertified: "September 2025",
        certificate: tharanathCert
      },
      {
        name: "Vijayababu Boopathy",
        company: "-",
        dateCertified: "September 2025",
        certificate: vijayababuCert
      },
      {
        name: "Rizvi Athram",
        company: "-",
        dateCertified: "August 2025",
        certificate: rizviCert
      },
      {
        name: "Kishore N V S S Tummalapalli",
        company: "-",
        dateCertified: "August 2025",
        certificate: kishoreCert
      },
      {
        name: "Sahaya Thivearaj",
        company: "-",
        dateCertified: "September 2025",
        certificate: sahayaCert
      },
      {
        name: "Mubin Shaikh",
        company: "-",
        dateCertified: "August 2025",
        certificate: mubinCert
      },
      {
        name: "Ben Teunissen",
        company: "-",
        dateCertified: "September 2025",
        certificate: benCert
      }
    ],
    "Certified AI Strategist": [],
    "Certified AI Solution Architect": [],
    "Certified AI Developer": [],
    "Certified AI Governance Officer": [],
    "Certified AI Security Architect": []
  };

  // Fetch uploaded certificates from backend
  useEffect(() => {
    const fetchUploadedCertificates = async () => {
      try {
        console.log('Fetching certificates from:', `${API_BASE}/certificates/all`);
        const response = await fetch(`${API_BASE}/certificates/all`);
        console.log('Response status:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched certificates:', data);
          setUploadedCertificates(data);
        } else {
          console.error('Failed to fetch certificates, status:', response.status);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadedCertificates();
  }, []);

  // Sort members by date (most recent first)
  const sortByDate = (members) => {
    return [...members].sort((a, b) => {
      const monthOrder = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4,
        'May': 5, 'June': 6, 'July': 7, 'August': 8,
        'September': 9, 'October': 10, 'November': 11, 'December': 12
      };
      
      const parseDate = (dateStr) => {
        // Handle Date objects or ISO strings from backend
        if (dateStr instanceof Date) {
          return dateStr.getTime();
        }
        if (typeof dateStr === 'string' && (dateStr.includes('-') || dateStr.includes('T'))) {
          // ISO format from backend (e.g., "2025-12-10T...")
          return new Date(dateStr).getTime();
        }
        // Handle "Month Year" format (static data)
        if (typeof dateStr === 'string' && dateStr.includes(' ')) {
          const parts = dateStr.split(' ');
          const month = monthOrder[parts[0]] || 0;
          const year = parseInt(parts[1]) || 0;
          return new Date(year, month - 1).getTime();
        }
        return 0;
      };
      
      // Sort descending (most recent first)
      return parseDate(b.dateCertified) - parseDate(a.dateCertified);
    });
  };

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    
    // If already formatted as "Month Year", return as is
    if (typeof dateStr === 'string' && dateStr.includes(' ') && !dateStr.includes('-') && !dateStr.includes('T')) {
      return dateStr;
    }
    
    // Convert Date object or ISO string to "Month Year"
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return "N/A";
      
      const month = date.toLocaleString('en-US', { month: 'long' });
      const year = date.getFullYear();
      return `${month} ${year}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return "N/A";
    }
  };

  // Combine static and uploaded certificates
  const staticMembers = certifiedMembers[selectedCategory] || [];
  const dynamicMembers = uploadedCertificates
    .filter(cert => cert.certificationType === selectedCategory)
    .map(cert => ({
      name: cert.name,
      company: cert.company || "-",
      dateCertified: cert.issuedDate || new Date(),
      certificate: cert.imageUrl // imageUrl is already the full Cloudinary URL
    }));

  console.log('Selected category:', selectedCategory);
  console.log('Static members:', staticMembers.length);
  console.log('Dynamic members:', dynamicMembers.length);
  console.log('Total uploaded certificates:', uploadedCertificates.length);

  const currentMembers = sortByDate([...staticMembers, ...dynamicMembers]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative py-20 px-6 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Certified Members
          </h1>
        </div>
      </section>

      {/* Category Buttons */}
      <section className="py-8 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Sidebar - Category Buttons */}
            <div className="lg:col-span-1 space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full px-4 py-4 text-center font-semibold rounded-md transition-all duration-200 shadow-md text-sm
                            ${selectedCategory === category 
                              ? 'bg-gray-700 text-white' 
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Right Content - Members Table */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                List Of {selectedCategory}s
              </h2>

              {currentMembers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-100 border-b-2 border-gray-300">
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Company Name</th>
                        <th className="px-6 py-4 text-left font-semibold text-gray-700">Date Certified</th>
                        <th className="px-6 py-4 text-center font-semibold text-gray-700">Certificate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentMembers.map((member, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-gray-800">{member.name}</td>
                          <td className="px-6 py-4 text-gray-600">{member.company}</td>
                          <td className="px-6 py-4 text-gray-600">{formatDate(member.dateCertified)}</td>
                          <td className="px-6 py-4 text-center">
                            {member.certificate ? (
                              <a
                                href={member.certificate}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center hover:scale-110 transition-transform"
                                title={`View certificate for ${member.name}`}
                              >
                                <img 
                                  src={downloadIcon} 
                                  alt="View Certificate" 
                                  className="w-10 h-10 hover:opacity-80 transition-opacity"
                                />
                              </a>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No certified members in this category yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
