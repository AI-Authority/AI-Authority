import React, { useState } from "react";

export default function CourseTabs({ description, resources }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="course-tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === "resources" ? "active" : ""}`}
          onClick={() => setActiveTab("resources")}
        >
          Resources
        </button>
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {activeTab === "overview" && (
          <div className="tab-pane">
            <h3>Course Description</h3>
            <p className="course-description">
              {description || "No description available."}
            </p>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="tab-pane">
            <h3>Course Resources</h3>
            {resources && resources.length > 0 ? (
              <ul className="resources-list">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      📎 {resource}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-resources">No resources available for this course.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
