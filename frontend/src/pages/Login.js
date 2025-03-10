import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/api"; // ✅ Import API function
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  // ✅ Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
        console.log("🔄 Attempting login with:", user);

        const response = await loginUser(user);
        console.log("✅ Login Response:", response);

        if (!response || !response.user) {
            throw new Error("❌ No user data received from server!");
        }

        localStorage.setItem("user", JSON.stringify(response.user));  // ✅ Store user session

        // ✅ Preserve Cart After Login
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        localStorage.setItem("cart", JSON.stringify(storedCart)); // ✅ Restore cart

        navigate("/frontpage");
        window.location.reload();
    } catch (err) {
        console.error("❌ Login Error:", err.response?.data || err.message);
        setError(err.response?.data?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
        setLoading(false);
    }
};


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Đăng Nhập</h2>

        {error && <p className="error-message">{error}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Nhập email"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label>Mật khẩu:</label>
        <input
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
        </button>

        <p className="register-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
