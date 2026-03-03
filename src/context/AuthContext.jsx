import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const BASE_URL = "https://loginpage-backend-production.up.railway.app/api/user";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  const register = async (userData) => {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    setUser(response.data);
    return response.data;
  };

const login = async (email, pwd) => {
  const res = await axios.post("https://loginpage-backend-production.up.railway.app/api/user/login", {
    email: email,
    pwd: pwd
  });

  setUser(res.data);   // only if backend validates
  return res.data;
};


  const updateProfile = async (userData) => {
    const response = await axios.put(`${BASE_URL}/update`, userData);
    setUser(response.data);
    return response.data;
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
};


  return (
    <AuthContext.Provider value={{ user, register, login, updateProfile,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
