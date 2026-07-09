import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const STORAGE_URL =
  import.meta.env.VITE_API_STORAGE_URL || `${API_BASE_URL}/storage`;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with error
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error:", error.request);
    } else {
      // Something else happened
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default api;

export const getImageUrl = (path: string): string => {
  if (!path) return "";

  // Hapus prefix "storage\\" atau "storage/" dan ganti dengan URL storage
  let cleanPath = path.replace(/^storage[\\/]/, "");
  // Ganti backslash dengan forward slash untuk URL
  cleanPath = cleanPath.replace(/\\/g, "/");

  return `${STORAGE_URL}/${cleanPath}`;
};

// Atau jika backend menggunakan public folder
export const getPublicImageUrl = (path: string): string => {
  if (!path) return "";

  let cleanPath = path.replace(/^storage[\\/]/, "");
  cleanPath = cleanPath.replace(/\\/g, "/");

  return `${API_BASE_URL}/${cleanPath}`;
};
