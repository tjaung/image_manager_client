// src/api/apiClient.ts
import axios from "axios";

// Create an Axios instance with default settings.
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || "http://127.0.0.1:8000/api/", // Adjust the base URL as needed
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ensures cookies are sent with requests
});

// You can also add interceptors to handle errors or add tokens, etc.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle errors globally
    console.error("API Client Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
