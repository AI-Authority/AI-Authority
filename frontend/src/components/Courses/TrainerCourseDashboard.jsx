import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrainerCourses, deleteTrainerCourse } from "../../services/api";
import EditCourseModal from "./EditCourseModal";

export default function TrainerCourseDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Filter State
  const [filterStatus, setFilterStatus] = useState("all");

  // Debug: Log all localStorage values on component mount
  useEffect(() => {
    console.log("📋 localStorage contents:");
    console.log("  - userToken:", localStorage.getItem("userToken"));
    console.log("  - userEmail:", localStorage.getItem("userEmail"));
    console.log("  - trainerId:", localStorage.getItem("trainerId"));
    console.log("  - isAdmin:", localStorage.getItem("isAdmin"));
  }, []);

  const fetchCourses = async () => {
    try {
      // Get trainer ID from JWT token (consistent with UploadCourse)
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Please log in to view your courses.");
        setLoading(false);
        return;
      }

      let trainerId;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        trainerId = payload._id || payload.id || payload.userId;
        console.log("🔍 TrainerCourseDashboard - trainerId from JWT token:", trainerId);
      } catch (err) {
        console.error("❌ Error decoding token:", err);
        setError("Session error. Please log out and log back in.");
        setLoading(false);
        return;
      }

      if (!trainerId) {
        setError("Trainer ID not found. Please log in again.");
        setLoading(false);
        return;
      }
      
      console.log("📡 Fetching courses for trainer:", trainerId);
      const { data } = await getTrainerCourses(trainerId);
      console.log("✅ Courses received:", data);
      setCourses(data.data || []);
    } catch (err) {
      console.error("❌ Error fetching courses:", err);
      console.error("Error response:", err.response?.data);
      setError(err.response?.data?.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }

    try {
      setDeleting(courseId);
      
      // Get trainer ID from JWT token
      const token = localStorage.getItem("userToken");
      if (!token) {
        alert("Please log in to delete courses.");
        return;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const trainerId = payload._id || payload.id || payload.userId;
      
      await deleteTrainerCourse(courseId, trainerId);
      await fetchCourses();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete course");
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading your courses...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  // 🟡 FILTER LOGIC
  const filteredCourses = courses.filter((course) =>
    filterStatus === "all" ? true : course.approvalStatus === filterStatus
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">My Uploaded Courses</h2>
        <button
          onClick={() => navigate("/trainer/assessments")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          Manage Assessments
        </button>
      </div>

      {/* FILTER DROPDOWN */}
      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* 🛑 NOTHING FOUND AFTER FILTER */}
      {filteredCourses.length === 0 ? (
        <div className="text-gray-600 text-center py-6">
          No courses found for the selected status.
        </div>
      ) : (
        <div className="space-y-6">

          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-white rounded-xl shadow p-6 border">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{course.courseName}</h3>
                  <p className="text-gray-700 mb-1">{course.courseType} | {course.mode}</p>
                  <p className="text-gray-500 text-sm mb-1">{course.organisationName}</p>
                  <p className="text-gray-500 text-sm mb-1">Start: {new Date(course.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-500 text-sm mb-1">End: {new Date(course.endDate).toLocaleDateString()}</p>
                  <a href={course.courseURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
                    View Course Link
                  </a>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.approvalStatus === "approved"
                        ? "bg-green-100 text-green-700"
                        : course.approvalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {course.approvalStatus.charAt(0).toUpperCase() + course.approvalStatus.slice(1)}
                  </span>

                  <div className="flex gap-2">
                    <button
                      className={`px-4 py-1 text-white rounded hover:opacity-90 text-xs font-semibold ${
                        course.approvalStatus === "approved"
                          ? "bg-orange-600 hover:bg-orange-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      onClick={() => setEditingCourse(course)}
                    >
                      {course.approvalStatus === "approved" ? "Edit & Re-approve" : "Edit & Resubmit"}
                    </button>

                    {course.approvalStatus === "rejected" && (
                      <button
                        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs font-semibold disabled:opacity-50"
                        onClick={() => handleDeleteCourse(course._id)}
                        disabled={deleting === course._id}
                      >
                        {deleting === course._id ? "Deleting..." : "Delete"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}

      {editingCourse && (
        <EditCourseModal
          course={editingCourse}
          onClose={() => setEditingCourse(null)}
          onSuccess={() => {
            setEditingCourse(null);
            setLoading(true);
            fetchCourses();
          }}
        />
      )}
    </div>
  );
}
