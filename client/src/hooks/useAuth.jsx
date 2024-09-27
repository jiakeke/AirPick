import { createContext, useContext, useState, useEffect } from 'react';
import api from '../axios';

const AuthContext = createContext();

// Define AuthProvider to manage and provide the authentication status
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isLoggedIn: false, category: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAuth({ isLoggedIn: true, category: user.category });
    }
  }, []);

  const login = async({email, password}) => {
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
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

