import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const AuthContext = createContext();

// Define AuthProvider to manage and provide the authentication status
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, category: null });
  const loginRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAuth({ isLoggedIn: true, category: user.category });
    }
  }, []);

  const login = async({email, password, api}) => {
    try {
      const res = await api.post("/api/users/login", { email, password });
      const { user } = res.data;
      const newAuth = { isLoggedIn: true, category: user.category };
      setAuth(newAuth);
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Login successful");
      return { status: res.status, data: res.data.message };
    } catch (error) {
      return { status: error.response.status, data: error.response.data.message };
    }
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, category: null });
    localStorage.removeItem('user');
    navigate('/');
    loginRef.current.click();

  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loginRef }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

