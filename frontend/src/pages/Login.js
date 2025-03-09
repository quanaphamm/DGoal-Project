import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return;
      }

      // ✅ Store user data in localStorage to persist across pages
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Redirect to homepage
      navigate("/frontpage");

      // ✅ Reload the page to update Navbar immediately
      window.location.reload();

    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
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

        <button type="submit" className="login-button">Đăng Nhập</button>

        <p className="register-link">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
