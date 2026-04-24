import API from '../apiConfig';

/**
 * Ensures media URLs are correctly formatted.
 * If the URL is absolute (starts with http), it returns it as is.
 * If the URL is relative (starts with /uploads), it prepends the API base URL.
 * 
 * @param {string} url - The URL from the database
 * @returns {string} - The formatted URL for display
 */
export const getMediaUrl = (url) => {
  if (!url) return '/images/placeholder.jpg';

  // If it's already an absolute URL (legacy or external), return as is
  if (url.startsWith('http')) {
    return url;
  }

  // If it's a local frontend public asset, return as is
  if (url.startsWith('/images/') || url.startsWith('/assets/')) {
    return url;
  }

  // Prepend API base URL for relative paths that are uploaded media
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const baseUrl = API.endsWith('/') ? API.slice(0, -1) : API;
    const relativePath = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${relativePath}`;
  }

  return url;
};
