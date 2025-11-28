// Strapi API configuration
export const STRAPI_CONFIG = {
  apiUrl: import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337/api',
}

// Helper function to get full API URL
export const getStrapiUrl = (endpoint: string): string => {
  const baseUrl = STRAPI_CONFIG.apiUrl.replace('/api', '')
  return `${baseUrl}${endpoint}`
}
