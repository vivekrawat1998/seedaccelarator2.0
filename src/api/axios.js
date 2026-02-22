import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1337/api",
});

// ✅ FIXED: Skip auth headers for PUBLIC endpoints
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    
    // 🎯 PUBLIC ENDPOINTS - NO TOKEN REQUIRED
    const publicEndpoints = [
        '/auth/local',
        '/auth/forgot-password', 
        '/auth/local/register'
    ];
    
    // Skip token for public endpoints
    const isPublicEndpoint = publicEndpoints.some(endpoint => 
        config.url.endsWith(endpoint)
    );
    
    if (token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});

export default api;
