// src/services/userService.js
import { useAuth } from '../hooks/useAuth';

const getBalance = async () => {
  try {
    const response = await api.get("/api/users/balance");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};

export default {
  getBalance,
};
