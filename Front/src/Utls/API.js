import axios from 'axios';

export const API_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

API_INSTANCE.interceptors.request.use((config) => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});