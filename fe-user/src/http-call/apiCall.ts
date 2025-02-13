import axios, { InternalAxiosRequestConfig } from "axios";
import { store } from "../state/store"; // Import Redux store
import { refreshAccessToken, logout } from "../state/auth/authSlice"; // Import auth actions

const backendUrl = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // Allows sending cookies (for refresh token)
});

// Add access token to every request
API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const state = store.getState();
    const accessToken = state.auth.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Handle expired access token and refresh it
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        const { data } = await axios.post(
          `${backendUrl}/api/account/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Update Redux with new access token
        store.dispatch(refreshAccessToken(data.accessToken));

        // Retry original request with new access token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return API(originalRequest);
      } catch (error) {
        console.error(error);
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export default API;
