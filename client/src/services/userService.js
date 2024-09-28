// src/services/userService.js
import { useAuth } from '../hooks/useAuth';


// user/withDrawal
const withDrawal = async (balance) => {
  try {
    const response = await api.put("/api/users/withDrawal", { balance });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
}


export default {
  withDrawal,
};
