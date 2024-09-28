// src/services/userService.js
import api from '../axios';
import { useAuth } from '../hooks/useAuth';

// User Login

const userLogin = async ({ email, password }) => {
  const  login  = useAuth();
  try {
    const res = await api.post("/api/users/login", { email, password });
    const { user } = res.data;
    login(user);
    console.log("Login successful");
    return { status: res.status, data: res.data.message };
  } catch (error) {
    return { status: error.response.status, data: error.response.data.message };
  }
};

// User Regist

const userRegist = async ({
  first_name,
  last_name,
  email,
  password,
  category,
}) => {
  try {
    const res = await api.post("/api/users/regist", {
      first_name,
      last_name,
      email,
      password,
      category,
    });
    return { status: res.status, data: res.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data.message };
    //throw error;
  }
};


// user/deposit

const deposit = async (balance) => {
  try {
    const response = await api.put("/api/users/deposit", { balance });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
}


// user/withDrawal
const withDrawal = async (balance) => {
  try {
    const response = await api.put("/api/users/withDrawal", { balance });
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
}

// Get the currently logged in user information

const getUser = async () => {
  try {
    const response = await api.get("/api/users");
    return { status: response.status, data: response.data };
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Update the currently logged in user information
const updateUser = async (userData) => {
  try {
    const response = await api.put("/api/users", userData);
    return { status: response.status, data: response.data };
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

const getBalance = async () => {
  try {
    const response = await api.get("/api/users/balance");
    return { status: response.status, data: response.data };
  } catch (error) {
    return { status: error.response.status, data: error.response.data };
  }
};

export default {
  updateUser,
  getUser,
  userLogin,
  userRegist,
  deposit,
  withDrawal,
  getBalance,
};
