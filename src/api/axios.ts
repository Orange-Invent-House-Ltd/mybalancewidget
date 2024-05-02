import axios from "axios";
//create an Axios instance with a config to prevent us from repeating these options in every request

// const BASE_URL = "https://staging-api.mybalanceapp.com/v1";
const BASE_URL = import.meta.env.VITE_BASE_URL

export const publicApi = axios.create({
  baseURL: BASE_URL,
});
export const privateApi = axios.create({
  baseURL: BASE_URL,
});

privateApi.interceptors.request.use(
  (config) => {
    const sessionToken = localStorage.getItem("session_token");
    if (!sessionToken) {
      return config;
    }
    if (sessionToken) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${sessionToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("session_token");
      // Handle error refreshing refresh token
      // Log the user out and redirect to login page
      // Example:
      const pathname = window.location.pathname;
      if (pathname === "/share-escrow-link") {
        return;
      }
      if (window.location) window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
// publicApi.defaults.headers.common["Content-Type"] = "application/json";
