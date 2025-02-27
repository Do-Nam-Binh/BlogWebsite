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
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is 401 (Unauthorized), meaning the access token is likely expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        // Request a new access token
        const { data } = await axios.post(
          `${backendUrl}/api/account/refresh-token`,
          {},
          { withCredentials: true }
        );

        // Dispatch to Redux store with the new access token
        store.dispatch(refreshAccessToken(data));

        // Retry the original request with the new token
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Error refreshing access token:", refreshError);
        store.dispatch(logout()); // Log the user out if the refresh fails
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Propagate other errors
  }
);

export default API;
