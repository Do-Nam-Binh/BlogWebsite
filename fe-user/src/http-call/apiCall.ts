import axios, { InternalAxiosRequestConfig } from "axios";

// const backendUrl = import.meta.env.VITE_API_BASE_URL; Production

const backendUrl = "http://localhost:8080"; // Dev

const API = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

API.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (!config.baseURL) {
      config.baseURL = backendUrl;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default API;
