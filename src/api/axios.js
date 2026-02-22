import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1337/api", // change if needed
});

/* ⭐ AUTO ATTACH TOKEN TO EVERY REQUEST */
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
