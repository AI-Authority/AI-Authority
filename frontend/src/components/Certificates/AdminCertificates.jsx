import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Search, Edit2, X } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function AdminCertificates() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [editingCert, setEditingCert] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    certificationType: "",
    company: "",
    issuedDate: ""
  });
  const [newCertificateFile, setNewCertificateFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);

  // ✅ Base API URL (works locally and on Vercel)
  const API_BASE = `${import.meta.env.VITE_API_URL}/api`;
  
  console.log("AdminCertificates - VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("AdminCertificates - API_BASE:", API_BASE);

  const fetchUserCertificates = async () => {
    if (!email && !name) {
      setError("Please enter an email address or name");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("");

    try {
      const params = new URLSearchParams();
      if (email) params.append('email', email);
      if (name) params.append('name', name);
      
      const url = `${API_BASE}/certificates?${params.toString()}`;
      console.log('Fetching certificates from:', url);
      
      const res = await fetch(url);
      console.log('Response status:', res.status);
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('API error:', errorData);
        throw new Error(errorData.error || "No certificates found");
      }
      
      const certs = await res.json();
      console.log('Certificates received:', certs);
      setCertificates(certs);
    } catch (err) {
      console.error('Error fetching certificates:', err);
      setError(err.message);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (certificateId, certificateEmail) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      const encodedEmail = encodeURIComponent(certificateEmail);
      const url = `${API_BASE}/certificates/${encodedEmail}/${certificateId}`;

      console.log("Deleting certificate:", { email: certificateEmail, certificateId, url });

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Delete response status:", res.status);
      console.log("Delete response headers:", res.headers);
      
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      console.log("Response content-type:", contentType);
      
      if (!contentType || !contentType.includes("application/json")) {
        const textResponse = await res.text();
        console.log("Non-JSON response:", textResponse);
        throw new Error(`Server returned ${res.status}: ${textResponse.substring(0, 100)}...`);
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.message || "Failed to delete certificate");
      }

      setMessage("Certificate deleted successfully!");
      setCertificates(certificates.filter((cert) => cert._id !== certificateId));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const openEditModal = (cert) => {
    setEditingCert(cert);
    setEditForm({
      name: cert.name || "",
      email: cert.email || "",
      certificationType: cert.course || cert.certificationType || "",
      company: cert.company || "",
      issuedDate: cert.issuedDate ? new Date(cert.issuedDate).toISOString().split('T')[0] : ""
    });
    setNewCertificateFile(null);
    setFilePreviewUrl(null);
  };

  const closeEditModal = () => {
    setEditingCert(null);
    setEditForm({
      name: "",
      email: "",
      certificationType: "",
      company: "",
      issuedDate: ""
    });
    setNewCertificateFile(null);
    setFilePreviewUrl(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCertificateFile(file);

      // Preview image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviewUrl(null);
      }
    }
  };

  const updateCertificate = async () => {
    if (!editForm.name || !editForm.email || !editForm.certificationType) {
      setError("Name, email, and certificate type are required");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      const url = `${API_BASE}/certificates/${editingCert._id}`;
      console.log("Updating certificate:", url, editForm);

      let res;
      
      // If there's a new file, use FormData
      if (newCertificateFile) {
        const formData = new FormData();
        formData.append("certificateFile", newCertificateFile);
        formData.append("name", editForm.name);
        formData.append("email", editForm.email);
        formData.append("certificationType", editForm.certificationType);
        formData.append("company", editForm.company || "");
        if (editForm.issuedDate) {
          formData.append("issuedDate", editForm.issuedDate);
        }

        res = await fetch(url, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Otherwise, use JSON
        res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        });
      }

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.message || "Failed to update certificate");
      }

      setMessage(newCertificateFile 
        ? "Certificate and file updated successfully!" 
        : "Certificate updated successfully!");
      
      // Update the certificate in the list with the returned data
      setCertificates(certificates.map(cert => 
        cert._id === editingCert._id 
          ? { 
              ...cert, 
              name: result.certificate.name,
              email: result.certificate.email,
              course: result.certificate.course || result.certificate.certificationType,
              certificationType: result.certificate.certificationType,
              company: result.certificate.company,
              imageUrl: result.certificate.imageUrl ? `${result.certificate.imageUrl}?t=${Date.now()}` : cert.imageUrl,
              cloudinaryPublicId: result.certificate.cloudinaryPublicId
            }
          : cert
      ));
      
      closeEditModal();
      
      // Refetch certificates to ensure we have the latest data
      if (email || name) {
        setTimeout(() => {
          fetchUserCertificates();
        }, 500);
      }
      
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Certificate Management</h1>
              <p className="text-sm text-gray-600">Search, view, and manage user certificates</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/admin/certificates"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload Certificate
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Certificates</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  onKeyPress={(e) => e.key === "Enter" && fetchUserCertificates()}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                  onKeyPress={(e) => e.key === "Enter" && fetchUserCertificates()}
                />
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <p className="text-sm text-gray-500">
                Enter email, name, or both to search for certificates
              </p>
              <button
                onClick={fetchUserCertificates}
                disabled={loading}
                className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{message}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Certificates List */}
        {certificates.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Search Results
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} found
                  {email && ` • Email: ${email}`}
                  {name && ` • Name: ${name}`}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow relative group">
                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <button
                      onClick={() => openEditModal(cert)}
                      className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                      title="Edit certificate"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteCertificate(cert._id, cert.email)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                      title="Delete certificate"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Certificate Preview */}
                  <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden border-b border-gray-200">
                  {cert.imageUrl?.endsWith(".pdf") ? (
                    <div className="flex items-center justify-center h-full w-full bg-white">
                      {/* Show PDF preview using Cloudinary transformation */}
                      <img 
                        src={cert.imageUrl.replace('/upload/', '/upload/f_jpg,pg_1,w_400/')}
                        alt={cert.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to icon if preview fails
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `
                            <div class="text-center p-4">
                              <div class="text-6xl mb-2">📄</div>
                              <p class="text-sm text-gray-600 font-semibold">PDF Certificate</p>
                              <a href="${cert.imageUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 text-xs hover:underline mt-2 inline-block">
                                View/Download
                              </a>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  ) : (
                    <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover" />
                  )}
                </div>

                  {/* Certificate Details */}
                  <div className="p-4">
                    <h4 className="text-base font-semibold text-gray-900 mb-3">{cert.name}</h4>
                    <div className="space-y-2">
                      {cert.email && (
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium text-gray-500 min-w-[60px]">Email:</span>
                          <span className="text-xs text-gray-700">{cert.email}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium text-gray-500 min-w-[60px]">Type:</span>
                        <span className="text-xs text-gray-700">{cert.course}</span>
                      </div>
                      {cert.company && cert.company !== '-' && (
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium text-gray-500 min-w-[60px]">Company:</span>
                          <span className="text-xs text-gray-700">{cert.company}</span>
                        </div>
                      )}
                      {cert.details && (
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-medium text-gray-500 min-w-[60px]">Details:</span>
                          <span className="text-xs text-gray-700 line-clamp-2">{cert.details}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Issued: {new Date(cert.issuedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                        <a
                          href={cert.imageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Full
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && certificates.length === 0 && (email || name) && !error && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-base font-medium text-gray-900">No certificates found</h3>
              <p className="mt-2 text-sm text-gray-500">
                No certificates match your search criteria. Try adjusting your search terms.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingCert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Edit Certificate</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="user@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={editForm.certificationType}
                  onChange={(e) => setEditForm({ ...editForm, certificationType: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select certificate type</option>
                  <option value="Certified Enterprise AI Architect">Certified Enterprise AI Architect</option>
                  <option value="Certified AI Strategist">Certified AI Strategist</option>
                  <option value="Certified AI Solution Architect">Certified AI Solution Architect</option>
                  <option value="Certified AI Developer">Certified AI Developer</option>
                  <option value="Certified AI Governance Officer">Certified AI Governance Officer</option>
                  <option value="Certified AI Security Architect">Certified AI Security Architect</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={editForm.company}
                  onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issued Date (Optional)
                </label>
                <input
                  type="date"
                  value={editForm.issuedDate}
                  onChange={(e) => setEditForm({ ...editForm, issuedDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Select the date when this certificate was issued
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Replace Certificate File (Optional)
                </label>
                <input
                  id="editCertificateFileInput"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Upload a new certificate file to replace the existing one (PDF, JPG, PNG - Max 10MB)
                </p>
                
                {/* Current file info */}
                {editingCert?.imageUrl && !newCertificateFile && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Current file: </span>
                      <a 
                        href={editingCert.imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 hover:underline"
                      >
                        View current certificate
                      </a>
                    </p>
                  </div>
                )}
                
                {/* File preview */}
                {filePreviewUrl && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">New file preview:</p>
                    <img 
                      src={filePreviewUrl} 
                      alt="Certificate preview" 
                      className="max-w-full h-auto rounded border border-gray-300"
                      style={{ maxHeight: "300px" }}
                    />
                  </div>
                )}
                
                {newCertificateFile && !filePreviewUrl && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-700">
                      ✓ New file selected: <span className="font-medium">{newCertificateFile.name}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex items-center justify-end gap-3 border-t border-gray-200">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateCertificate}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCertificates;
