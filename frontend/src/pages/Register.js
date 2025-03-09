import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!user.fullName || !user.email || !user.password || !user.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Mật khẩu không khớp.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: user.fullName,
          email: user.email,
          password: user.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Đăng Ký</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        
        <label>Họ và Tên:</label>
        <input type="text" name="fullName" placeholder="Nhập họ và tên" value={user.fullName} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" placeholder="Nhập email" value={user.email} onChange={handleChange} required />

        <label>Mật khẩu:</label>
        <input type="password" name="password" placeholder="Nhập mật khẩu" value={user.password} onChange={handleChange} required />

        <label>Xác nhận mật khẩu:</label>
        <input type="password" name="confirmPassword" placeholder="Nhập lại mật khẩu" value={user.confirmPassword} onChange={handleChange} required />

        <button type="submit" className="register-button">Đăng Ký</button>

        <p className="login-link">
          Đã có tài khoản? <a href="/login">Đăng nhập</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
