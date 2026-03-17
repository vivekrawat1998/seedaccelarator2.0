import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  const publicEndpoints = [
    "/auth/local",
    "/auth/forgot-password",
    "/auth/local/register",
    "/contact-uses",
  ];

  const isPublicEndpoint = publicEndpoints.some(endpoint =>
    config.url.endsWith(endpoint)
  );

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;