import axios from "axios";

// Base url
const API_BASE_URL =
  import.meta.VITE_APP_API_URL || "http://localhost:8080/api/v1";

// create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// response interceptor - handle auto-refresh errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("cloudbalance_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
