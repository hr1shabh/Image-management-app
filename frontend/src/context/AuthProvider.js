import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const login = (token) => {
    setAuthToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('token');
  };

  // Function to check token expiration
  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken)
    const expirationTime = decodedToken?.exp * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    return expirationTime && expirationTime < currentTime;
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      console.log(newToken);
        if (newToken && !isTokenExpired(newToken)) {
          // Token is valid
          setAuthToken(newToken);
        } else {
          // Token is expired or not present
          setAuthToken(null);
          localStorage.removeItem('token');
        }
    
    };
    handleStorageChange();
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};