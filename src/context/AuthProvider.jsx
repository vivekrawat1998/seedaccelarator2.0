import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Safe localStorage parsing
  const getStoredUser = () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "null" && storedUser !== "undefined") {
        return JSON.parse(storedUser);
      }
      return null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
      localStorage.removeItem("user");
      return null;
    }
  };

  // Initialize user from localStorage
  useEffect(() => {
    const initUser = async () => {
      const storedUser = getStoredUser();

      if (storedUser) {
        try {
          const response = await api.get("/users/me");
          setUser(response.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Token invalid, logging out:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    initUser();
  }, []);

  // ✅ FIXED: Simple login (accepts Strapi response object)
  const login = (authData) => {
    const userData = authData.user;
    const token = authData.jwt;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-xl font-semibold text-green-600">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
