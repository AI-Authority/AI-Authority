import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/Untitled-design-27.png";

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        if (!email) {
          setError("No user email found. Please log in.");
          setLoading(false);
          return;
        }

        const { data } = await getUserProfile(email);
        setProfile(data);
              if (data.memberships?.trainer?.length > 0) {
        const trainerMembershipId = data.memberships.trainer[0]._id;
        localStorage.setItem("trainerId", trainerMembershipId);
      }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");

    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);

    try {
      const API_URL = `${import.meta.env.VITE_API_URL}/api`;
      const token = localStorage.getItem("userToken");
      
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setPasswordSuccess("Password changed successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordSuccess("");
      }, 2000);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <div
          className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="relative z-10 text-5xl md:text-6xl font-bold text-white">
            My Profile
          </h1>
        </div>
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="text-center text-gray-600">Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <div
          className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <h1 className="relative z-10 text-5xl md:text-6xl font-bold text-white">
            My Profile
          </h1>
        </div>
        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const { user, memberships } = profile;

  const hasTrainerMembership = memberships.trainer.length > 0;

  const allMemberships = [
    ...memberships.corporate.map((m) => ({ ...m, type: "Corporate" })),
    ...memberships.student.map((m) => ({ ...m, type: "Student" })),
    ...memberships.trainer.map((m) => ({ ...m, type: "Trainer" })),
    ...memberships.individual.map((m) => ({ ...m, type: "Individual" })),
    ...memberships.architect.map((m) => ({ ...m, type: "AI Architect" })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative h-[50vh] min-h-[400px] bg-cover bg-center flex items-center justify-center pt-20"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            My Profile
          </h1>
          <p className="text-white/90 text-base sm:text-lg drop-shadow-md">Manage your account and memberships</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-12">
        
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white border-4 border-white/30">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    {user.name}
                  </h2>
                  <p className="text-indigo-100 text-sm">
                    Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="self-start sm:self-auto px-6 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition border border-white/30 font-medium"
              >
                <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-base text-gray-900 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="text-base text-gray-900 font-medium">{user.phone}</p>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowPasswordModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Memberships Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    My Memberships
                  </h3>
                  <p className="text-xs text-gray-600">
                    {allMemberships.length} {allMemberships.length === 1 ? 'membership' : 'memberships'} active
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {allMemberships.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">No Memberships Yet</h4>
                <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
                  Start your journey with AI Authority by exploring our membership options tailored to your needs.
                </p>
                <button
                  onClick={() => navigate("/membership")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition font-medium shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Browse Memberships
                </button>
              </div>
            ) : (
            <div className="grid grid-cols-1 gap-6">
              {allMemberships.map((membership, index) => (
                <div
                  key={index}
                  className="group relative border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Color accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                  
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {membership.type} Membership
                          </h4>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Joined {new Date(membership.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                          Active
                        </span>
                      </div>
                    </div>

                  {/* Existing membership details logic unchanged */}
                  {membership.type === "Corporate" && (
                    <div className="space-y-2 text-gray-700">
                      <p>
                        <span className="font-semibold">Company:</span>{" "}
                        {membership.companyName}
                      </p>
                      <p>
                        <span className="font-semibold">Industry:</span>{" "}
                        {membership.industry}
                      </p>
                      <p>
                        <span className="font-semibold">Contact:</span>{" "}
                        {membership.contactPerson?.fullName}
                      </p>
                      <p>
                        <span className="font-semibold">Company Size:</span>{" "}
                        {membership.companySize}
                      </p>
                    </div>
                  )}

                  {(membership.type === "Student" ||
                    membership.type === "Trainer" ||
                    membership.type === "Individual" ||
                    membership.type === "AI Architect") &&
                    membership.personalInfo && (
                      <div className="space-y-2 text-gray-700">
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {membership.personalInfo.fullName}
                        </p>
                        <p>
                          <span className="font-semibold">Location:</span>{" "}
                          {membership.personalInfo.location}
                        </p>
                        {membership.personalInfo.linkedinURL && (
                          <p>
                            <span className="font-semibold">LinkedIn:</span>{" "}
                            <a
                              href={membership.personalInfo.linkedinURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              View Profile
                            </a>
                          </p>
                        )}
                      </div>
                    )}

                  {membership.type === "Student" &&
                    membership.academicInfo && (
                      <div className="mt-3 space-y-2 text-gray-700">
                        <p>
                          <span className="font-semibold">Institution:</span>{" "}
                          {membership.academicInfo.institution}
                        </p>
                        <p>
                          <span className="font-semibold">Degree:</span>{" "}
                          {membership.academicInfo.degreeProgram}
                        </p>
                        <p>
                          <span className="font-semibold">Graduation:</span>{" "}
                          {membership.academicInfo.expectedGraduation}
                        </p>
                      </div>
                    )}

                  {(membership.type === "Trainer" ||
                    membership.type === "Individual" ||
                    membership.type === "AI Architect") &&
                    membership.professionalBackground && (
                      <div className="mt-3 space-y-2 text-gray-700">
                        <p>
                          <span className="font-semibold">Current Role:</span>{" "}
                          {membership.professionalBackground.currentRole}
                        </p>
                        <p>
                          <span className="font-semibold">Industry:</span>{" "}
                          {membership.professionalBackground.industry}
                        </p>
                        <p>
                          <span className="font-semibold">Experience:</span>{" "}
                          {membership.professionalBackground.yearsExperience}{" "}
                          years
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mt-8">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </h3>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => navigate("/certificates")}
                className="group flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">My Certificates</p>
                  <p className="text-xs text-gray-600">View your credentials</p>
                </div>
              </button>

              <button
                onClick={() => navigate("/membership")}
                className="group flex items-center gap-3 p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Add Membership</p>
                  <p className="text-xs text-gray-600">Explore membership options</p>
                </div>
              </button>

              {hasTrainerMembership && (
                <>
                  <button
                    onClick={() => navigate("/upload-course")}
                    className="group flex items-center gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Upload Course</p>
                      <p className="text-xs text-gray-600">Share your knowledge</p>
                    </div>
                  </button>
                  <button
                    onClick={() => navigate("/trainer/courses-dashboard")}
                    className="group flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 4h4m-2-2v6" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">My Courses</p>
                      <p className="text-xs text-gray-600">View & manage uploaded courses</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Change Password</h3>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordError("");
                  setPasswordSuccess("");
                  setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {passwordError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded">
                  <p className="text-sm text-red-700">{passwordError}</p>
                </div>
              )}

              {passwordSuccess && (
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                  <p className="text-sm text-green-700">{passwordSuccess}</p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordError("");
                    setPasswordSuccess("");
                    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {passwordLoading ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
