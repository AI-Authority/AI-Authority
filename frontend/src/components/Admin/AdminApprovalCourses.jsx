import React, { useEffect, useState } from "react";
import {
  getAllCoursesAdmin,
  approveCourse,
  rejectCourse,
  deleteCourse,
} from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminCourseApprovals() {
  const navigate = useNavigate();

  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    applyFilter(filter);
  }, [filter, allCourses]);

  const loadCourses = async () => {
    try {
      const res = await getAllCoursesAdmin(); // ✅ correct API
      const data = res.data.data || [];
      setAllCourses(data);
      setFilteredCourses(data.filter(c => c.approvalStatus === "pending"));
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilter = (type) => {
    setFilter(type);
    if (type === "all") {
      setFilteredCourses(allCourses);
    } else {
      setFilteredCourses(
        allCourses.filter(c => c.approvalStatus === type)
      );
    }
  };

  const handleApprove = async (id) => {
    await approveCourse(id);
    loadCourses();
  };

  const handleReject = async (id) => {
    await rejectCourse(id);
    loadCourses();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course permanently?")) {
      return;
    }
    try {
      await deleteCourse(id);
      alert("Course deleted successfully");
      loadCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-10 text-center text-gray-600 text-xl">
        Loading courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Course Management</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {["pending", "approved", "rejected", "all"].map((type) => (
          <button
            key={type}
            onClick={() => applyFilter(type)}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              filter === type
                ? "bg-indigo-600 text-white"
                : "bg-white border hover:bg-gray-100"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Courses */}
      {filteredCourses.length === 0 ? (
        <p className="text-gray-600 text-lg">No courses found.</p>
      ) : (
        <div className="space-y-6">
          {filteredCourses.map((c) => (
            <div
              key={c._id}
              className={`p-6 rounded-xl shadow border hover:shadow-md transition ${
                c.approvalStatus === "rejected"
                  ? "bg-red-50 border-red-200"
                  : c.approvalStatus === "approved"
                  ? "bg-green-50 border-green-200"
                  : c.isResubmitted
                  ? "bg-orange-50 border-orange-200"
                  : "bg-white"
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-indigo-700">
                  {c.courseName}
                </h2>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    c.approvalStatus === "approved"
                      ? "bg-green-600 text-white"
                      : c.approvalStatus === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {c.approvalStatus.toUpperCase()}
                </span>

                {c.isResubmitted && (
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                    RESUBMITTED
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <p><strong>Trainer:</strong> {c.trainerName}</p>
                <p><strong>Organisation:</strong> {c.organisationName}</p>
                <p><strong>Mode:</strong> {c.mode}</p>
                <p><strong>Type:</strong> {c.courseType}</p>
                <p><strong>Start:</strong> {new Date(c.startDate).toDateString()}</p>
                <p><strong>End:</strong> {new Date(c.endDate).toDateString()}</p>
              </div>

              <a
                href={c.courseURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mb-4 inline-block"
              >
                View Course Link
              </a>

              {/* Actions */}
              <div className="flex gap-4 flex-wrap">
                {c.approvalStatus !== "approved" && (
                  <button
                    onClick={() => handleApprove(c._id)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}

                {c.approvalStatus !== "rejected" && (
                  <button
                    onClick={() => handleReject(c._id)}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                )}

                <button
                  onClick={() => handleDelete(c._id)}
                  className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Back
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
