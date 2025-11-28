import axios from 'axios'
import { STRAPI_CONFIG } from '../config/strapi'

// Create axios instance for Strapi API
const strapiApi = axios.create({
  baseURL: STRAPI_CONFIG.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default strapiApi
