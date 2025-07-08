import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://stomaton-gateway-production.up.railway.app/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let authToken: string | null = null;

export const setAuthToken = (token: string) => {
  authToken = token;
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  authToken = null;
  delete apiClient.defaults.headers.Authorization;
};

export const getAuthToken = () => authToken;

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      clearAuthToken();
      // Redirect to login would be handled by the app
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;