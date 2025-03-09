import axios from "axios";

// ✅ Get API URL from `.env` or use fallback (for demo)
const API_URL = process.env.REACT_APP_API_URL || "https://dgoal.onrender.com/api";

// ✅ Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    
    // ✅ Save token & user info to localStorage
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Đã xảy ra lỗi!" };
  }
};

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Đã xảy ra lỗi!" };
  }
};

// ✅ Logout User
export const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// ✅ Get Logged-in User Data
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};
