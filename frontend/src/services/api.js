import axios from "axios";

// ✅ Backend API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://dgoal-project.onrender.com";


/**
 * ✅ Login User
 * @param {Object} userData - { email, password }
 */
export const loginUser = async (userData) => {
    try {
        console.log("🔹 Attempting login with:", userData); // ✅ Debug log

        const response = await axios.post(`${API_BASE_URL}/login`, userData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log("✅ Login Response:", response.data); // ✅ Debug log

        if (!response.data || !response.data.user) {
            throw new Error("❌ No user data received from server!");
        }

        return response.data;
    } catch (error) {
        console.error("❌ Login Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Register New User
 * @param {Object} userData - { fullName, email, password }
 */
export const registerUser = async (userData) => {
    try {
        console.log("🔹 Attempting registration with:", userData); // ✅ Debug log

        const response = await axios.post(`${API_BASE_URL}/register`, userData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log("✅ Registration Successful:", response.data); // ✅ Debug log

        return response.data;
    } catch (error) {
        console.error("❌ Registration Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Upload Product for Sale (Đăng Bán Sản Phẩm)
 * @param {FormData} formData - Contains product details including image
 */
export const uploadProduct = async (formData) => {
    try {
        console.log("🔹 Uploading product:", Object.fromEntries(formData)); // ✅ Debug log

        const response = await axios.post(`${API_BASE_URL}/products/upload`, formData, {
            headers: { "Content-Type": "multipart/form-data" }, // ✅ Required for file upload
            withCredentials: true
        });

        console.log("✅ Upload Successful:", response.data); // ✅ Debug log
        return response.data;
    } catch (error) {
        console.error("❌ Upload Product Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Post a Job (Đăng Tuyển Công Việc)
 * @param {Object} jobData - { company, title, salary, location, type, description, requirements }
 */
export const postJob = async (jobData) => {
    try {
        console.log("🔹 Posting job:", jobData); // ✅ Debug log

        const response = await axios.post(`${API_BASE_URL}/jobs/post`, jobData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });

        console.log("✅ Job Posted:", response.data); // ✅ Debug log
        return response.data;
    } catch (error) {
        console.error("❌ Post Job Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Products (For Display)
 */
export const getProducts = async () => {
    try {
        console.log("🔹 Fetching products..."); // ✅ Debug log

        const response = await axios.get(`${API_BASE_URL}/products`, { withCredentials: true });

        if (!response.data || !response.data.products) {
            throw new Error("❌ No product data received from server!");
        }

        console.log("✅ Fetched Products:", response.data.products); // ✅ Debug log
        return response.data;
    } catch (error) {
        console.error("❌ Get Products Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Jobs (For Display)
 */
export const getJobs = async () => {
    try {
        console.log("🔹 Fetching jobs..."); // ✅ Debug log

        const response = await axios.get(`${API_BASE_URL}/jobs`, { withCredentials: true });

        if (!response.data || !response.data.jobs) {
            throw new Error("❌ No job data received from server!");
        }

        console.log("✅ Fetched Jobs:", response.data.jobs); // ✅ Debug log
        return response.data;
    } catch (error) {
        console.error("❌ Get Jobs Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Fetch All Registered Users (For Debugging)
 */
export const getUsers = async () => {
    try {
        console.log("🔹 Fetching users..."); // ✅ Debug log

        const response = await axios.get(`${API_BASE_URL}/users`, { withCredentials: true });

        if (!response.data || !response.data.registered_users) {
            throw new Error("❌ No user data received from server!");
        }

        console.log("✅ Fetched Users:", response.data.registered_users); // ✅ Debug log
        return response.data;
    } catch (error) {
        console.error("❌ Get Users Error:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * ✅ Logout User without removing cart
 */
export const logoutUser = () => {
    console.log("🔹 Logging out user..."); // ✅ Debug log

    localStorage.removeItem("user"); // ✅ Remove user session only
    console.log("✅ User logged out, refreshing page...");

    window.location.reload();
};