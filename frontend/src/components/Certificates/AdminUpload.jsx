import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminUpload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    details: "",
    certificationType: "Certified Enterprise AI Architect",
  });
  const [certificateFile, setCertificateFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // ✅ Base API URL — works locally and on Vercel automatically
  const API_BASE = `${import.meta.env.VITE_API_URL}/api`;

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCertificateFile(file);

      // Preview image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!certificateFile) {
      alert("Please select a certificate file to upload");
      return;
    }

    setUploading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("certificateFile", certificateFile);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("details", formData.details);
      formDataToSend.append("certificationType", formData.certificationType);

      console.log("Uploading certificate for:", formData.email);
      console.log("File:", certificateFile.name);

      // ✅ Use environment variable for backend URL
      const res = await fetch(`${API_BASE}/certificates/upload`, {
        method: "POST",
        body: formDataToSend,
      });

      console.log("Response status:", res.status);
      const responseText = await res.text();

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        throw new Error("Server returned invalid response: " + responseText.substring(0, 100));
      }

      if (res.ok) {
        alert(result.message || "Certificate uploaded successfully!");
        setFormData({ 
          email: "", 
          name: "", 
          company: "",
          details: "",
          certificationType: "Certified Enterprise AI Architect"
        });
        setCertificateFile(null);
        setPreviewUrl(null);
        document.getElementById("certificateFileInput").value = "";
      } else {
        alert(result.error || result.details || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading certificate: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Upload Certificate</h2>
        <div className="flex gap-3">
          <Link
            to="/admin/manage"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            Manage Certificates
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block font-medium mb-2 text-gray-700">User Email</label>
          <input
            type="email"
            name="email"
            placeholder="user@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Recipient Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Company Name</label>
          <input
            type="text"
            name="company"
            placeholder="Company Name (optional)"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Certificate Type</label>
          <select
            name="certificationType"
            value={formData.certificationType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="Certified Enterprise AI Architect">Certified Enterprise AI Architect</option>
            <option value="Certified AI Strategist">Certified AI Strategist</option>
            <option value="Certified AI Solution Architect">Certified AI Solution Architect</option>
            <option value="Certified AI Developer">Certified AI Developer</option>
            <option value="Certified AI Governance Officer">Certified AI Governance Officer</option>
            <option value="Certified AI Security Architect">Certified AI Security Architect</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Certificate Details</label>
          <textarea
            name="details"
            placeholder="Additional information about the certificate..."
            value={formData.details}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">
            Upload Certificate File (PDF, JPG, PNG)
          </label>
          <input
            id="certificateFileInput"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />
          {certificateFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {certificateFile.name} (
              {(certificateFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {previewUrl && (
          <div className="border rounded p-4 bg-gray-50">
            <label className="block font-medium mb-2 text-gray-700">Preview:</label>
            <img
              src={previewUrl}
              alt="Certificate preview"
              className="max-w-full h-auto max-h-64 mx-auto rounded shadow"
            />
          </div>
        )}

        <button
          className={`w-full py-3 rounded font-semibold transition-colors ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Certificate"}
        </button>
      </form>
    </div>
  );
}

export default AdminUpload;
