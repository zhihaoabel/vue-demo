// api.js
import axios from 'axios';

// const apiUrl = 'https://sandbox-v3-acquiring.pacypay.com'; // Replace with your API endpoint

const api = axios.create({
    // baseURL: apiUrl,
    timeout: 10000,
});

// Interceptors for handling request and response globally
api.interceptors.request.use(
    (config) => {
        // You can modify the request config here (e.g., adding headers)
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        // You can handle the response globally (e.g., error checking)
        return response.data;
    },
    (error) => {
        console.log('response error: ' + error)
        return Promise.reject(error);
    }
);

export default api;
