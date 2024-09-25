// src/services/userService.js
// const axios =require('axios') ;
import axios from "axios";


const BASE_URL = 'http://localhost:4000/api/users';
// const userId="66e939d2b5d08ae24758029d";


// login

const userLogin=async({email,password, setIsAuthed})=>{
      try {
        const res=await axios.post(`${BASE_URL}/login`,{email,password});
        const {user}=res.data;
        localStorage.setItem('user', JSON.stringify(user));
        setIsAuthed(user);
        console.log('Login successful');
        return {status:res.status, data:res.data.message};
      } catch (error) {
          return {status:error.response.status, data:error.response.data.message};
        //console.error('Login failed',error.res?.data?.message||error.message)
      }

}

// userRegist

const userRegist=async ({first_name,last_name,email,password,category})=>{
 try {
   const res=await axios.post(`${BASE_URL}/regist`,{first_name,last_name,email,password,category});
   return {status:res.status, data:res.data};
 } catch (error) {
     return {status:error.response.status, data:error.response.data.message};
    //throw error;  
 }


}

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

const getUser=async ()=>{
      const user=localStorage.getItem('user')
    try {
        const response=await axios.get(BASE_URL,{
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        });
        return {status:response.status,data:response.data};
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}


// 更新用户
 const updateUser = async (userData) => {
    const user=localStorage.getItem('user')
  try {
    const response = await axios.put(BASE_URL, userData,{
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    });
    return {status:response.status,data:response.data};
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// 删除用户
 const deleteUser = async (userId) => {
  const user=localStorage.getItem('user')
  try {
    const response = await axios.delete(`${BASE_URL}/${userId}`,{
      headers:{
        Authorization: `Bearer ${user.token}`
      }
    });
    return {status:response.status,data:response.data};
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


export default {
    // getAllUsers,
    // createUser,
    updateUser,
    // deleteUser,
    getUser,
    userLogin,
    userRegist,
  };


  // module.exports = {
  //   updateUser,
  //   getUser,
  //   userLogin,
  //   userRegist,
  // };
