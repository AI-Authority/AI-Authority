import React from "react";

export default function CourseHeader({ courseName, trainerName, courseType }) {
  return (
    <div className="course-header">
      <h1 className="course-title">{courseName}</h1>
      <div className="course-meta">
        <div className="meta-item">
          <span className="meta-label">👨‍🏫 Trainer:</span>
          <span className="meta-value">{trainerName}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">📚 Category:</span>
          <span className="meta-value">{courseType}</span>
        </div>
      </div>
    </div>
  );
}
