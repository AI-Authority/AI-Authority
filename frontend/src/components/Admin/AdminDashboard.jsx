import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api` || "http://localhost:5000/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    pendingCount: 0,
    pendingCourses: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("userToken");

      // Fetch pending memberships
      const membershipsRes = await axios.get(
        `${API_URL}/membership/admin/pending`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { corporate, student, trainer, individual, architect } =
        membershipsRes.data.pendingApplications;

      const totalMemberships =
        corporate.length +
        student.length +
        trainer.length +
        individual.length +
        architect.length;

      // Fetch pending courses
      const coursesRes = await axios.get(`${API_URL}/admin/courses/pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pendingCourses = coursesRes.data.data.length;

      setStats({
        pendingCount: totalMemberships,
        pendingCourses,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({ pendingCount: 0, pendingCourses: 0, loading: false });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isAdmin");

    // notify header
    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center bg-white border-b-4 border-blue-600 p-4 shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Pending Memberships */}
          <div className="bg-white border-l-4 border-blue-600 p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                  Memberships
                </p>
                <p className="text-3xl font-semibold text-blue-700 mt-1">
                  {stats.loading ? "..." : stats.pendingCount}
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">Pending approval</p>
          </div>

          {/* Pending Course Approvals */}
          <div className="bg-white border-l-4 border-indigo-600 p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                  Courses
                </p>
                <p className="text-3xl font-semibold text-indigo-700 mt-1">
                  {stats.loading ? "..." : stats.pendingCourses}
                </p>
              </div>
              <div className="bg-indigo-50 p-2 rounded">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">Awaiting review</p>
          </div>

          {/* System Status */}
          <div className="bg-white border-l-4 border-green-600 p-5 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-600 text-xs font-medium uppercase tracking-wide">
                  Status
                </p>
                <p className="text-3xl font-semibold text-green-700 mt-1">
                  Active
                </p>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="text-xs text-gray-500">All systems operational</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Membership Applications */}
            <Link
              to="/admin/membership-applications"
              className="bg-white border-2 border-gray-200 p-4 hover:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-blue-50 p-2 rounded group-hover:bg-blue-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>

                {stats.pendingCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                    {stats.pendingCount}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-700 transition-colors mb-1">
                Memberships
              </h3>
              <p className="text-xs text-gray-500">Review applications</p>
            </Link>

            {/* Course Approvals */}
            <Link
              to="/admin/courses"
              className="bg-white border-2 border-gray-200 p-4 hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="bg-indigo-50 p-2 rounded group-hover:bg-indigo-100 transition-colors">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>

                {stats.pendingCourses > 0 && (
                  <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                    {stats.pendingCourses}
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors mb-1">
                Courses
              </h3>
              <p className="text-xs text-gray-500">Approve submissions</p>
            </Link>

            {/* Upload Certificates */}
            <Link
              to="/admin/certificates"
              className="bg-white border-2 border-gray-200 p-4 hover:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="bg-purple-50 p-2 mb-3 w-fit rounded group-hover:bg-purple-100 transition-colors">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>

              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors mb-1">
                Upload
              </h3>
              <p className="text-xs text-gray-500">Add new certificates</p>
            </Link>

            {/* Manage Certificates */}
            <Link
              to="/admin/manage"
              className="bg-white border-2 border-gray-200 p-4 hover:border-teal-500 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="bg-teal-50 p-2 mb-3 w-fit rounded group-hover:bg-teal-100 transition-colors">
                <svg
                  className="w-5 h-5 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-teal-700 transition-colors mb-1">
                Certificates
              </h3>
              <p className="text-xs text-gray-500">View and manage</p>
            </Link>

            {/* Coupon Management */}
            <Link
              to="/admin/coupons"
              className="bg-white border-2 border-gray-200 p-4 hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-lg group"
            >
              <div className="bg-orange-50 p-2 mb-3 w-fit rounded group-hover:bg-orange-100 transition-colors">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
              </div>

              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-700 transition-colors mb-1">
                Coupons
              </h3>
              <p className="text-xs text-gray-500">Manage discounts</p>
            </Link>
          </div>
        </div>

        {/* System Status & Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* System Status */}
          <div className="bg-white border border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">System Status</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Database</span>
                <span className="flex items-center text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Email Service</span>
                <span className="flex items-center text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">API Server</span>
                <span className="flex items-center text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Storage</span>
                <span className="flex items-center text-gray-700 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-white border border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">Quick Info</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Platform Version</p>
                  <p className="text-gray-500 text-xs">v2.0.1</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Last Updated</p>
                  <p className="text-gray-500 text-xs">December 1, 2025</p>
                </div>
              </div>

              <div className="flex items-start">
                <svg className="w-4 h-4 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Security Status</p>
                  <p className="text-gray-500 text-xs">All systems secured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
