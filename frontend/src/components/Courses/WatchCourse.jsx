import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApprovedCourses, validateCourseAccess } from "../../services/api";
import VideoPlayer from "./VideoPlayer";
import CourseHeader from "./CourseHeader";
import CourseTabs from "./CourseTabs";
import CourseSidebar from "./CourseSidebar";
import "./WatchCourse.css";

export default function WatchCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentVideoURL, setCurrentVideoURL] = useState(null);
  const [expandedModuleId, setExpandedModuleId] = useState(null);

  useEffect(() => {
    loadCourse();
    checkEnrollmentStatus();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const res = await getApprovedCourses();
      const allCourses = res.data.data || [];
      const foundCourse = allCourses.find((c) => c._id === courseId);

      if (!foundCourse) {
        alert("Course not found");
        navigate("/services");
        return;
      }

      setCourse(foundCourse);
      
  console.log("Loaded course:", foundCourse);
  console.log("Course modules:", foundCourse.modules);
  setCurrentVideoURL(null);
    } catch (err) {
      console.error("Error loading course:", err);
      navigate("/services");
    } finally {
      setLoading(false);
    }
  };

  const checkEnrollmentStatus = async () => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);

    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      setIsEnrolled(true);
      return;
    }

    try {
      const res = await validateCourseAccess(courseId);
      setIsEnrolled(res.data.allowed === true);
    } catch {
      setIsEnrolled(false);
    }
  };

  const handleEnroll = () => {
    if (!isLoggedIn) {
      alert("Please login to enroll");
      navigate("/login");
      return;
    }
    navigate("/membership");
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentVideoURL(lesson.videoURL);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="watch-loading">
        <div className="spinner"></div>
        <p>Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="watch-error">
        <h2>Course not found</h2>
        <button onClick={() => navigate("/services")}>Back to Courses</button>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="watch-error">
        <h2 style={{ color: "#dc2626" }}>Access Denied</h2>
        <p>You must enroll in this course to watch it.</p>
        <button onClick={() => navigate("/services")}>Back to Courses</button>
      </div>
    );
  }

  return (
    <div className="watch-course-container">
      <div className="watch-course-main">
        {/* Video Player Section */}
        <div className={`video-section ${!currentVideoURL ? 'no-video-selected' : ''}`}>
          {currentVideoURL ? (
            <VideoPlayer courseURL={currentVideoURL} hasPaid={isEnrolled} />
          ) : (
            <div className="video-placeholder">
              <div className="placeholder-content">
                <svg
                  className="placeholder-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  width="64"
                  height="64"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <h3>Select a Lesson to Start</h3>
                <p>Choose a lesson from the curriculum below to begin watching</p>
              </div>
            </div>
          )}
        </div>


        {/* Course Modules & Lessons Section */}
        {course?.modules && course.modules.length > 0 ? (
          <div className="curriculum-section">
            <div className="curriculum-header">
              <h2>📚 Course Curriculum</h2>
              <span className="lesson-count">
                {course.modules.length} {course.modules.length === 1 ? 'Module' : 'Modules'}
              </span>
            </div>
            <div className="modules-list">
              {course.modules
                .sort((a, b) => a.order - b.order)
                .map((module) => {
                  const isOpen = expandedModuleId === module.moduleId;
                  return (
                    <div key={module.moduleId} className="module-item border-b py-3">
                      <button
                        type="button"
                        onClick={() => setExpandedModuleId(isOpen ? null : module.moduleId)}
                        className="w-full flex items-center justify-between text-left p-3 hover:bg-gray-50 rounded"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-4">
                          <div className="module-title font-semibold text-lg">{module.title}</div>
                          <div className="text-sm text-gray-500">{module.lessons?.length || 0} {module.lessons?.length === 1 ? 'lesson' : 'lessons'}</div>
                        </div>
                        <div className="chev">
                          {isOpen ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 15l6-6 6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="lessons-list mt-3 px-3">
                          {module.lessons
                            .sort((a, b) => a.order - b.order)
                            .map((lesson) => (
                              <div
                                key={lesson.lessonId}
                                className={`lesson-item ${selectedLesson?.lessonId === lesson.lessonId ? 'active' : ''} flex items-center justify-between p-3 rounded hover:bg-gray-50`}
                                onClick={() => handleLessonClick(lesson)}
                              >
                                <div className="flex items-center gap-4">
                                  <div className="lesson-number">
                                    {selectedLesson?.lessonId === lesson.lessonId ? (
                                      <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20" width="20" height="20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                                    ) : (
                                      <svg className="video-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/></svg>
                                    )}
                                    <span className="lesson-order ml-1">Lesson {lesson.order}</span>
                                  </div>
                                  <div className="lesson-info">
                                    <h3 className="lesson-title">{lesson.title}</h3>
                                  </div>
                                </div>
                                <div className="lesson-arrow">
                                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="curriculum-section">
            <div className="empty-lessons-state">
              <svg
                className="empty-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                width="64"
                height="64"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3>No Modules Available</h3>
              <p>This course doesn't have any modules yet. Please contact the trainer or admin.</p>
            </div>
          </div>
        )}

        {/* Assessment Button for Selected Lesson */}
        {selectedLesson && selectedLesson.assessmentId && (
          <div className="assessment-section">
            <div className="assessment-card">
              <div className="assessment-icon">📝</div>
              <div className="assessment-content">
                <h3>Assessment Available</h3>
                <p>Test your knowledge of: {selectedLesson.title}</p>
              </div>
              <button
                onClick={() => navigate(`/assessment/${selectedLesson.assessmentId}`)}
                className="take-assessment-btn"
              >
                Take Assessment
              </button>
            </div>
          </div>
        )}

        <CourseHeader
          courseName={course.courseName}
          trainerName={course.trainerName}
          courseType={course.courseType}
        />

        <CourseTabs
          description={course.description}
          resources={course.resources}
        />
      </div>

      <CourseSidebar
        course={course}
        hasPaid={isEnrolled}
        isLoggedIn={isLoggedIn}
        onEnroll={handleEnroll}
      />
    </div>
  );
}
