import React from "react";

export default function CourseSidebar({ course, hasPaid, isLoggedIn, onEnroll }) {
  return (
    <div className="course-sidebar">
      {/* Enrollment Status Card */}
      <div className="sidebar-card">
        {hasPaid ? (
          <div className="enrollment-status enrolled">
            <div className="status-icon">✅</div>
            <h3>You're Enrolled</h3>
            <p>You have full access to this course</p>
          </div>
        ) : (
          <div className="enrollment-status not-enrolled">
            <div className="status-icon">🎓</div>
            <h3>Not Enrolled</h3>
            <p>Get membership to access this course</p>
            <button className="enroll-btn" onClick={onEnroll}>
              {isLoggedIn ? "Get Membership" : "Login to Enroll"}
            </button>
          </div>
        )}
      </div>

      {/* Course Info Card */}
      <div className="sidebar-card">
        <h4>Course Information</h4>
        <div className="info-item">
          <span className="info-label">Type:</span>
          <span className="info-value">{course.courseType}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Trainer:</span>
          <span className="info-value">{course.trainerName}</span>
        </div>
        {course.trainerEmail && (
          <div className="info-item">
            <span className="info-label">Contact:</span>
            <span className="info-value">{course.trainerEmail}</span>
          </div>
        )}
      </div>

      {/* Benefits Card */}
      {!hasPaid && (
        <div className="sidebar-card benefits-card">
          <h4>What You'll Get</h4>
          <ul className="benefits-list">
            <li>✓ Full course access</li>
            <li>✓ Expert trainer guidance</li>
            <li>✓ Course resources</li>
            <li>✓ Certificate upon completion</li>
          </ul>
        </div>
      )}
    </div>
  );
}
