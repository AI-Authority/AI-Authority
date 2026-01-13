import React, { useEffect, useState } from "react";
import {
  getApprovedCourses,
  getUserProfile,
  deleteCourse,
  getMyEnrolledCourses,
} from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewServices() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [userMembership, setUserMembership] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const courseTypes = [
    "All",
    "Enterprise AI Architecture",
    "AI Strategy",
    "AI Solution Architecture",
    "AI Security",
    "AI Operations",
    "AI Integration",
    "AI Governance",
    "AI Executive",
    "AI Developer Foundation",
    "AI Developer Advanced",
    "AI Computing",
  ];

  // LOAD ENROLLED COURSES FROM DB
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setEnrolledCourses([]);
      return;
    }

    const loadEnrolledCourses = async () => {
      try {
        const res = await getMyEnrolledCourses();
        setEnrolledCourses(Array.isArray(res.data?.data) ? res.data.data : []);
      } catch {
        setEnrolledCourses([]);
      }
    };

    loadEnrolledCourses();
  }, []);

  // LOAD MAIN DATA
  useEffect(() => {
    loadCourses();
    loadUserMembership();
    checkAdminStatus();

    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!email);

    if (location.state?.filterBy) {
      setSelectedFilter(location.state.filterBy);
    }
  }, [location]);

  const checkAdminStatus = () => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  };

  const loadCourses = async () => {
    try {
      const res = await getApprovedCourses();
      setCourses(res.data.data || []);
      setFilteredCourses(res.data.data || []);
    } catch (err) {
      console.error("Error loading approved courses:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadUserMembership = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) return;

      const { data } = await getUserProfile(email);

      if (data.memberships?.student?.length > 0) setUserMembership("student");
      else if (data.memberships?.individual?.length > 0)
        setUserMembership("individual");
      else if (data.memberships?.corporate?.length > 0)
        setUserMembership("corporate");
      else if (data.memberships?.trainer?.length > 0)
        setUserMembership("trainer");
      else if (data.memberships?.architect?.length > 0)
        setUserMembership("architect");
    } catch (err) {
      console.error("Error loading user membership:", err);
    }
  };

  // FILTER HANDLER
  useEffect(() => {
    if (selectedFilter === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter((c) => c.courseType === selectedFilter)
      );
    }
  }, [selectedFilter, courses]);

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
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-xl">
        Loading available courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-10">
          Available Training Courses
        </h1>

        {/* FILTER BAR */}
        <div className="mb-8 bg-white rounded-xl shadow-md p-6">
          <label className="block text-gray-700 font-semibold mb-3">
            Filter by Course Type:
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {courseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {selectedFilter !== "All" && (
            <button
              onClick={() => setSelectedFilter("All")}
              className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* CARD GRID */}
        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            {selectedFilter === "All"
              ? "No approved courses available yet."
              : `No courses found for "${selectedFilter}".`}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((c) => {
              const originalPrice = c.price || 0;

              const userEmail = localStorage.getItem("userEmail");
              const isTrainerOfThisCourse =
                userEmail && c.trainerEmail && userEmail === c.trainerEmail;

              const isEnrolled =
                Array.isArray(enrolledCourses) &&
                enrolledCourses.includes(c._id);

              const showWatch =
                isEnrolled || isAdmin || isTrainerOfThisCourse;

              const showEnroll =
                !isEnrolled && !isAdmin && !isTrainerOfThisCourse;

              return (
                <div
                  key={c._id}
                  className="bg-white shadow-md border rounded-xl p-6 hover:shadow-lg transition"
                >
                  <h2 className="text-2xl font-bold text-indigo-700 mb-3">
                    {c.courseName}
                  </h2>

                  <div className="space-y-2 text-gray-700">
                    <p>
                      <strong>Trainer:</strong> {c.trainerName}
                    </p>
                    <p>
                      <strong>Organisation:</strong> {c.organisationName}
                    </p>
                    <p>
                      <strong>Mode:</strong> {c.mode}
                    </p>
                    <p>
                      <strong>Training Type:</strong> {c.courseType}
                    </p>
                    <p>
                      <strong>Start:</strong>{" "}
                      {new Date(c.startDate).toDateString()}
                    </p>
                    <p>
                      <strong>End:</strong>{" "}
                      {new Date(c.endDate).toDateString()}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">
                          Price:
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ${originalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* WATCH BUTTON — Only After Enrollment */}
                  {showWatch && (
                    <button
                      onClick={() => navigate(`/watch/${c._id}`)}
                      className="mt-4 w-full px-4 py-2 rounded-lg transition font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Watch Course
                    </button>
                  )}

                  {/* ENROLL BUTTON — Before Enrollment */}
                  {showEnroll && (
                    <button
                      type="button"
                      onClick={() => {
                        const token = localStorage.getItem("userToken");
                        if (!token) {
                          alert("Please log in to enroll in this course");
                          navigate("/login");
                          return;
                        }

                        navigate("/payment", {
                          state: {
                            courseId: c._id,
                            courseName: c.courseName,
                            courseType: c.courseType,
                            originalPrice,
                          },
                        });
                      }}
                      className="mt-4 w-full px-4 py-2 rounded-lg transition bg-emerald-600 text-white hover:bg-emerald-700"
                    >
                      Enroll Now
                    </button>
                  )}

                  {/* ADMIN DELETE */}
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete Course
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
