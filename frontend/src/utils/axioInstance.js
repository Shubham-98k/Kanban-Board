import axios from "axios"

const BASE_URL = "http://localhost:5175/api"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// 2. RESPONSE INTERCEPTOR: Handle global response failures
axiosInstance.interceptors.response.use(
  (response) => response, // Pass successful responses straight through
  (error) => {
    // Case A: Network / Connection Failure (Server down or user offline)
    if (!error.response) {
      return Promise.reject(new Error("Network error. Please check your connection."));
    }

    // Case B: Expired or Invalid Cookie Session
    if (error.response.status === 401) {
      // Optional: Redirect unauthenticated users to the login screen
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error); // Pass remaining errors to component catch blocks
  }
);

export default axiosInstance
