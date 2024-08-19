import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: localStorage.getItem('token') || null,
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setAuth({ user: email, token });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  
  const register = async (email, password) => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password });
      await login(email, password);
    } catch (error) {
      if (error.response?.data?.message.includes('duplicate key error')) {
        console.error('Registration failed: Email already in use.');
        alert('Email already registered. Please use a different email or log in.');
      } else {
        console.error('Registration failed:', error.response?.data || error.message);
      }
    }
  };
  

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
