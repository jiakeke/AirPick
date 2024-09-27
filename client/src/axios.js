// src/axios.js

import axios from 'axios';

// Create Axios Instance
const api = axios.create({
  baseURL: 'http://localhost:4000', // Replace with your API base URL
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Get user authentication from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    
    // If the user authentication exists, add its token to the request header
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default api;

