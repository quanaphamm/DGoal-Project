import axios from "axios";

// ✅ Backend API Base URL (Matches the Correct Backend Endpoint)
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://dgoal-project.onrender.com/api";

// Create an axios instance with the base URL
const api = axios.create({
    baseURL: 'https://dgoal-project.onrender.com',
    // or if using the proxy in _redirects:
    // baseURL: '/api',
    withCredentials: true,
});

export default api;

/**
 * ✅ Login User
 * @param {Object} userData - { email, password }
 */
export const loginUser = async (userData) => {
    try {
        console.log("🔹 Attempting login with:", userData);

        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true // ✅ Ensures cookies/session work correctly
        });

        console.log("✅ Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Login Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Register New User
 * @param {Object} userData - { fullName, email, password }
 */
export const registerUser = async (userData) => {
    try {
        console.log("🔹 Attempting registration with:", userData);

        const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log("✅ Registration Successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Registration Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Upload Product for Sale (Đăng Bán Sản Phẩm)
 * @param {FormData} formData - Contains product details including image
 */
export const uploadProduct = async (formData) => {
    try {
        console.log("🔹 Uploading product:", Object.fromEntries(formData));

        const response = await axios.post(`${API_BASE_URL}/products/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        console.log("✅ Upload Successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Upload Product Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Post a Job (Đăng Tuyển Công Việc)
 * @param {Object} jobData - { company, title, salary, location, type, description, requirements }
 */
export const postJob = async (jobData) => {
    try {
        console.log("🔹 Posting job:", jobData);

        const response = await axios.post(`${API_BASE_URL}/jobs/post`, jobData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log("✅ Job Posted:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Post Job Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Products (For Display)
 */
export const getProducts = async () => {
    try {
        console.log("🔹 Fetching products...");

        const response = await axios.get(`${API_BASE_URL}/products`, { withCredentials: true });

        if (!response.data || !response.data.products) {
            throw new Error("❌ No product data received from server!");
        }

        console.log("✅ Fetched Products:", response.data.products);
        return response.data;
    } catch (error) {
        console.error("❌ Get Products Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Jobs (For Display)
 */
export const getJobs = async () => {
    try {
        console.log("🔹 Fetching jobs...");

        const response = await axios.get(`${API_BASE_URL}/jobs`, { withCredentials: true });

        if (!response.data || !response.data.jobs) {
            throw new Error("❌ No job data received from server!");
        }

        console.log("✅ Fetched Jobs:", response.data.jobs);
        return response.data;
    } catch (error) {
        console.error("❌ Get Jobs Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Registered Users (For Debugging)
 */
export const getUsers = async () => {
    try {
        console.log("🔹 Fetching users...");

        const response = await axios.get(`${API_BASE_URL}/auth/users`, { withCredentials: true });

        if (!response.data || !response.data.registered_users) {
            throw new Error("❌ No user data received from server!");
        }

        console.log("✅ Fetched Users:", response.data.registered_users);
        return response.data;
    } catch (error) {
        console.error("❌ Get Users Error:", error.response?.data?.error || error.message);
        throw error;
    }
};

/**
 * ✅ Logout User without removing cart
 */
export const logoutUser = () => {
    console.log("🔹 Logging out user...");

    localStorage.removeItem("user");
    console.log("✅ User logged out, refreshing page...");

    window.location.reload();
};
