import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api"; // ✅ Import API function
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
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value.trim() }); // ✅ Trim input values
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); // ✅ Show loading state

    // ✅ Validation
    if (!user.fullName || !user.email || !user.password || !user.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      setLoading(false);
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Mật khẩu không khớp.");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Attempting registration with:", user); // ✅ Debugging log

      const response = await registerUser({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      });

      console.log("✅ Registration Successful:", response.data); // ✅ Debugging log

      setSuccess("Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
      setTimeout(() => navigate("/login"), 1500); // ✅ Reduced delay
    } catch (err) {
      console.error("❌ Registration Error:", err.response?.data || err.message); // ✅ Debugging log
      setError(err.response?.data?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false); // ✅ Hide loading state
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

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng Ký"}
        </button>

        <p className="login-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
