import React from "react";
import {
  isYouTubeUrl,
  getYouTubeEmbedUrl,
} from "../../utils/videoHelpers";

export default function VideoPlayer({ courseURL, hasPaid }) {
  // If user hasn't paid, show enrollment message
  if (!hasPaid) {
    return (
      <div className="video-player-container">
        <div className="video-locked">
          <div className="lock-icon">🔒</div>
          <h2>Enroll to Watch This Course</h2>
          <p>
            Please enroll in a membership plan to access this course content.
          </p>
        </div>
      </div>
    );
  }

  // If YouTube URL, render embedded player
  if (isYouTubeUrl(courseURL)) {
    const embedUrl = getYouTubeEmbedUrl(courseURL);
    return (
      <div className="video-player-container">
        <iframe
          src={embedUrl}
          title="Course Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="video-iframe"
        ></iframe>
      </div>
    );
  }

  // If not YouTube, show external link
  return (
    <div className="video-player-container">
      <div className="video-external">
        <div className="external-icon">🎥</div>
        <h3>External Course Video</h3>
        <p>This course is hosted on an external platform.</p>
        <a
          href={courseURL}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link-btn"
        >
          Open Course in New Tab
        </a>
      </div>
    </div>
  );
}
