// src/axios.js

import axios from 'axios';
import { useAuth } from './hooks/useAuth';

const useAxios = () => {
  // Create Axios Instance
  const {logout} = useAuth();
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
  
  api.interceptors.response.use(
    (response) => response, // Return successful response directly.
    async (error) => {
      if (error.response && error.response.status === 401) {
        // Token is invalid or unauthenticated, when status code 401 is returned.
        console.error('Token expired or invalid');
        logout();
  
      }
  
      return Promise.reject(error);
    }
  );

  return api;
}

export default useAxios;

