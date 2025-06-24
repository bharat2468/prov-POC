import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = "vdys6hr4a3z2eb6sh57o";
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.log('Request error:', error.request);
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.log('Response error:', error.response.data);
        } else {
            console.log('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
