const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

const getBackendBaseUrl = () => {
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
  // Extract the base URL without /api
  return apiBase.replace(/\/api\/?$/, '');
};

const buildUrl = (path) => `${API_BASE}${path}`;

// Helper to convert upload URLs to full backend URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  if (imagePath.startsWith('/uploads/')) {
    return `${getBackendBaseUrl()}${imagePath}`;
  }
  return imagePath;
};

const apiClient = async (path, options = {}) => {
  const { method = 'GET', data, headers = {}, ...rest } = options;
  const config = { method, headers: { ...headers }, ...rest };

  if (data instanceof FormData) {
    config.body = data;
  } else if (data !== undefined) {
    config.headers['Content-Type'] = 'application/json';
    config.body = JSON.stringify(data);
  }

  const response = await fetch(buildUrl(path), config);
  const contentType = response.headers.get('content-type') || '';
  const parsedBody = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message = parsedBody?.message || response.statusText;
    throw new Error(message);
  }

  return parsedBody;
};

export { API_BASE, buildUrl };
export default apiClient;
