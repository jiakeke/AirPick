// src/services/userService.js
import api from "../axios";

// User Login

const userLogin = async ({ email, password, setIsAuthed }) => {
  try {
    const res = await api.post("/api/users/login", { email, password });
    const { user } = res.data;
    sessionStorage.setItem("user", JSON.stringify(user));
    setIsAuthed(true);
    console.log("Login successful");
    return { status: res.status, data: res.data.message };
  } catch (error) {
    return { status: error.response.status, data: error.response.data.message };
    //console.error('Login failed',error.res?.data?.message||error.message)
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

export default {
  updateUser,
  getUser,
  userLogin,
  userRegist,
};
