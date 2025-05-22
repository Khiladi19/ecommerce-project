// src/api/axios.js
import axios from "axios";

// Create axios instance
const axiosInstance = axios.create({
  // baseURL: "http://localhost:2000/api", 
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:2000/api" , // Set your base API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: Handle 401 unauthorized
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirect to login...");
      // Optionally clear token or redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
