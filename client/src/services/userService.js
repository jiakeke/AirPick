// src/services/userService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/users';
// const userId="66e939d2b5d08ae24758029d";

// 获取所有用户
 const getAllUsers = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return {status:response.status,data:response.data};
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;  
  }
};

// 创建新用户
 const createUser = async (userData) => {
  try {
    const response = await axios.post(BASE_URL, userData);
    return {status:response.status,data:response.data};
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// GET /:userId

const getUserById=async (userId)=>{
    try {
        const response=await axios.get(`${BASE_URL}/${userId}`);
        return {status:response.status,data:response.data};
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// 更新用户
 const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${userId}`, userData);
    return {status:response.status,data:response.data};
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// 删除用户
 const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`);
    return {status:response.status,data:response.data};
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export default {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
  };
