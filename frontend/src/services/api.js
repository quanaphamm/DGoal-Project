import axios from "axios";

// ✅ Get API URL from `.env` or use fallback (for demo)
const API_URL = process.env.REACT_APP_API_URL || "https://dgoal.onrender.com/api";

// ✅ Set Authorization Header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

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

// ✅ Upload Product for Sale
export const uploadProduct = async (productData) => {
  try {
    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      formData.append(key, productData[key]);
    });

    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Lỗi khi đăng sản phẩm!" };
  }
};

// ✅ Get Product Listings (Demo uses localStorage)
export const getProducts = () => {
  return JSON.parse(localStorage.getItem("products")) || [];
};

// ✅ Upload Job Listing
export const uploadJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData, {
      headers: getAuthHeaders(),
    });

    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || "Lỗi khi đăng tuyển!" };
  }
};

// ✅ Get Job Listings (Demo uses localStorage)
export const getJobs = () => {
  return JSON.parse(localStorage.getItem("jobs")) || [];
};
