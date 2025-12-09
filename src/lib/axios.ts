import axios from 'axios'
import { STRAPI_CONFIG } from '../config/strapi'

// Get API token from environment variables
const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN

// Debug logging
console.log('Strapi Config:', {
  apiUrl: STRAPI_CONFIG.apiUrl,
  hasToken: !!apiToken,
  tokenLength: apiToken?.length,
})

// Create axios instance for Strapi API
const strapiApi = axios.create({
  baseURL: STRAPI_CONFIG.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    // Add Authorization header if API token is provided
    ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
  },
})

// Add response interceptor for debugging
strapiApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Strapi API Error:', {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
    })
    return Promise.reject(error)
  }
)

export default strapiApi
