import axios from "axios";
import { config } from "process";

const api = axios.create({
    baseURL: 'http://localhost:6006/',
    timeout: 10000
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;