import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api` || "http://localhost:5000/api";

function AdminMembershipApplications() {
  const navigate = useNavigate();
  const [pendingApplications, setPendingApplications] = useState({
    corporate: [],
    student: [],
    trainer: [],
    individual: [],
    architect: [],
  });
  const [allApplications, setAllApplications] = useState({
    corporate: [],
    student: [],
    trainer: [],
    individual: [],
    architect: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedType, setSelectedType] = useState("all");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Verify admin status before fetching
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const token = localStorage.getItem("userToken");
    
    if (!token || !isAdmin) {
      setError("Unauthorized access. Admin privileges required.");
      setLoading(false);
      return;
    }
    
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("userToken");
      
      // Fetch pending applications
      const pendingRes = await axios.get(`${API_URL}/membership/admin/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingApplications(pendingRes.data.pendingApplications);

      // Fetch all applications
      const allRes = await axios.get(`${API_URL}/membership/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllApplications(allRes.data.applications);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (membershipId, membershipType) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `${API_URL}/membership/admin/update-status`,
        {
          membershipId,
          membershipType,
          action: "approve",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage(`${membershipType} membership approved successfully! Email sent to applicant.`);
      setTimeout(() => setSuccessMessage(""), 5000);
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to approve application");
      setTimeout(() => setError(""), 5000);
    }
  };

  const openRejectModal = (membershipId, membershipType) => {
    setSelectedApplication({ membershipId, membershipType });
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!selectedApplication) return;

    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `${API_URL}/membership/admin/update-status`,
        {
          membershipId: selectedApplication.membershipId,
          membershipType: selectedApplication.membershipType,
          action: "reject",
          rejectionReason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccessMessage(`${selectedApplication.membershipType} membership rejected. Email sent to applicant.`);
      setShowRejectModal(false);
      setRejectionReason("");
      setSelectedApplication(null);
      setTimeout(() => setSuccessMessage(""), 5000);
      fetchApplications();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to reject application");
      setTimeout(() => setError(""), 5000);
    }
  };

  const getApplicantInfo = (application, type) => {
    switch (type) {
      case "corporate":
        return {
          name: application.contactPerson?.fullName || "N/A",
          email: application.contactPerson?.email || "N/A",
          company: application.companyName || "N/A",
        };
      case "student":
        return {
          name: application.studentInfo?.fullName || "N/A",
          email: application.studentInfo?.email || "N/A",
          institution: application.academicDetails?.institution || "N/A",
        };
      case "trainer":
        return {
          name: application.personalInfo?.fullName || "N/A",
          email: application.personalInfo?.email || "N/A",
          expertise: application.trainerProfile?.expertiseAreas?.[0] || "N/A",
        };
      case "individual":
        return {
          name: application.personalInfo?.fullName || "N/A",
          email: application.personalInfo?.email || "N/A",
          role: application.professionalBackground?.currentRole || "N/A",
        };
      case "architect":
        return {
          name: application.personalDetails?.fullName || "N/A",
          email: application.personalDetails?.email || "N/A",
          position: application.personalDetails?.currentPosition || "N/A",
        };
      default:
        return { name: "N/A", email: "N/A" };
    }
  };

  const renderApplicationCard = (application, type) => {
    const info = getApplicantInfo(application, type);
    const isPending = application.approvalStatus === "pending";

    return (
      <div
        key={application._id}
        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{info.name}</h3>
            <p className="text-gray-600">{info.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              {type === "corporate" && `Company: ${info.company}`}
              {type === "student" && `Institution: ${info.institution}`}
              {type === "trainer" && `Expertise: ${info.expertise}`}
              {type === "individual" && `Role: ${info.role}`}
              {type === "architect" && `Position: ${info.position}`}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              application.approvalStatus === "approved"
                ? "bg-green-100 text-green-800"
                : application.approvalStatus === "rejected"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {application.approvalStatus.charAt(0).toUpperCase() + application.approvalStatus.slice(1)}
          </span>
        </div>

        <div className="text-sm text-gray-500 mb-4">
          <p>Type: <span className="font-semibold capitalize">{type}</span></p>
          <p>Submitted: {new Date(application.createdAt).toLocaleDateString()}</p>
        </div>

        {isPending && (
          <div className="flex gap-3">
            <button
              onClick={() => handleApprove(application._id, type)}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              ✓ Approve
            </button>
            <button
              onClick={() => openRejectModal(application._id, type)}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              ✗ Reject
            </button>
          </div>
        )}
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");
    
    // Dispatch storage event to notify header of changes
    window.dispatchEvent(new Event("storage"));
    
    navigate("/login");
  };

  const getApplicationsToDisplay = () => {
    const apps = activeTab === "pending" ? pendingApplications : allApplications;
    
    if (selectedType === "all") {
      return Object.entries(apps).flatMap(([type, items]) =>
        items.map((item) => ({ ...item, type }))
      );
    }
    
    return apps[selectedType]?.map((item) => ({ ...item, type: selectedType })) || [];
  };

  const applicationsToDisplay = getApplicationsToDisplay();
  const totalPending = Object.values(pendingApplications).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Membership Applications</h1>
              <p className="text-gray-600">Review and manage membership applications</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
          {totalPending > 0 && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 font-semibold">
                ⚠️ You have {totalPending} pending application{totalPending !== 1 ? "s" : ""} awaiting review
              </p>
            </div>
          )}
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">✓ {successMessage}</p>
          </div>
        )}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">✗ {error}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "pending"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Pending ({totalPending})
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 px-4 font-semibold transition-colors ${
              activeTab === "all"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            All Applications
          </button>
        </div>

        {/* Filter by Type */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="corporate">Corporate</option>
            <option value="student">Student</option>
            <option value="trainer">Trainer</option>
            <option value="individual">Individual</option>
            <option value="architect">AI Architect</option>
          </select>
        </div>

        {/* Applications Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        ) : applicationsToDisplay.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600 text-lg">No applications found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationsToDisplay.map((app) => renderApplicationCard(app, app.type))}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reject Application</h2>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejection (optional):
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent mb-4"
              rows="4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleReject}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Confirm Reject
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason("");
                  setSelectedApplication(null);
                }}
                className="flex-1 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMembershipApplications;
