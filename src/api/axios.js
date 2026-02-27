import axios from "axios";

const api = axios.create({
    baseURL: "http://13.205.121.242/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const publicEndpoints = [
        '/auth/local',
        '/auth/forgot-password', 
        '/auth/local/register'
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
