/**
 * YouTube Video Helper Functions
 * Converts various YouTube URL formats to embeddable URLs
 */

/**
 * Check if a URL is a YouTube URL
 * @param {string} url - The URL to check
 * @returns {boolean} - True if YouTube URL
 */
export function isYouTubeUrl(url) {
  if (!url) return false;
  const youtubePatterns = [
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=/,
    /^(https?:\/\/)?(www\.)?youtu\.be\//,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\//,
  ];
  return youtubePatterns.some((pattern) => pattern.test(url));
}

/**
 * Extract YouTube video ID from URL
 * @param {string} url - The YouTube URL
 * @returns {string|null} - The video ID or null
 */
export function getYouTubeVideoId(url) {
  if (!url) return null;

  // Handle different YouTube URL formats
  let videoId = null;

  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) {
    videoId = watchMatch[1];
  }

  // Format: https://youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch) {
    videoId = shortMatch[1];
  }

  // Format: https://www.youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embedMatch) {
    videoId = embedMatch[1];
  }

  return videoId;
}

/**
 * Convert YouTube URL to embed format
 * @param {string} url - The YouTube URL
 * @returns {string} - The embed URL
 */
export function getYouTubeEmbedUrl(url) {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return url;

  // Return clean embed URL
  return `https://www.youtube.com/embed/${videoId}`;
}
