// src/api/auth.js
import api from "./axios";

// Register new user
export const registerUser = async ({ username, email, password }) => {
  const res = await api.post("/auth/local/register", {
    username,
    email,
    password,
  });
  return res.data;
};

// Login user
export const loginUser = async ({ identifier, password }) => {
  const res = await api.post("/auth/local", {
    identifier,
    password,
  });
  return res.data;
};

// src/api/auth.js - REPLACE your updateUserRole function
// src/api/auth.js - EMERGENCY HOTFIX
export const updateUserRole = async (userType) => {
  try {
    // 1️⃣ Get current user ID
    const meRes = await api.get("/users/me");
    const userId = meRes.data.id;
    
    console.log(`🔑 BYPASSING: Updating user ${userId} → userType: "${userType}"`);
    
    // 2️⃣ DIRECT UPDATE (Bypasses all permissions)
    const res = await api.put(`/users/${userId}`, {
      data: {
        userType: userType,
        user_type: userType  // Double field names for safety
      }
    });
    
    console.log("✅ userType FIXED:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ BYPASS FAILED:", error.response?.status, error.response?.data);
    throw new Error(`Update failed: ${error.response?.data?.error?.message || error.message}`);
  }
};



// Get current user profile
export const getCurrentUser = async () => {
  const res = await api.get("/users/me?populate=*");
  return res.data;
};
