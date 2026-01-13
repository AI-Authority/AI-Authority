import { useState, useEffect } from "react";
import { getCertificates } from "../../services/api";

function UserCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) throw new Error("User email not found. Please login again.");

        // ✅ API CALL USING api.js
        const { data } = await getCertificates(userEmail);

        // Convert relative paths → absolute URL
        const baseURL = import.meta.env.VITE_API_URL;

        const certsWithFullUrl = data.map((cert) => ({
          ...cert,
          imageUrl: cert.imageUrl?.startsWith("http")
            ? cert.imageUrl
            : `${baseURL}${cert.imageUrl}`,
        }));

        setCertificates(certsWithFullUrl);
      } catch (err) {
        setError(err.message || "Failed to fetch certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <div className="p-6">Loading certificates...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!certificates.length) return <div className="p-6">No certificates found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Certificates</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, i) => (
          <a
            key={i}
            href={cert.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer block group"
          >
            
            {/* Preview */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
              {cert.imageUrl.endsWith(".pdf") ? (
                <div className="flex items-center justify-center h-full w-full bg-white">
                  <img
                    src={cert.imageUrl.replace("/upload/", "/upload/f_jpg,pg_1,w_400/")}
                    alt={cert.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="text-center p-4">
                          <div class="text-7xl mb-2">📄</div>
                          <p class="text-sm text-gray-600 font-semibold">PDF Certificate</p>
                        </div>
                      `;
                    }}
                  />
                </div>
              ) : (
                <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              )}
              
              {/* Badge */}
              <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                Certificate
              </div>
            </div>

            {/* Details */}
            <div className="p-5 bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{cert.name}</h3>
              <div className="space-y-2">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold text-gray-800">Course:</span> <span className="text-gray-600">{cert.course}</span>
                </p>
                {cert.details && (
                  <p className="text-gray-600 text-xs line-clamp-2">{cert.details}</p>
                )}
              </div>
              
              {/* Hover hint */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-center text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click to open →
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default UserCertificates;
