import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJob } from "../services/api"; // ✅ API function
import "./TuyenDung.css";

const TuyenDung = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState({
        company: "",
        title: "",
        salary: "",
        location: "",
        type: "Toàn thời gian",
        description: "",
        requirements: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // 🛠 Handle Input Changes
    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    // 🛠 Handle Job Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!job.company || !job.title || !job.salary || !job.location || !job.description || !job.requirements) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        try {
            await postJob(job); // ✅ Send job data to backend
            setSuccess("Công việc đã được đăng thành công!");
            
            // ✅ Redirect to job listings after 2 seconds
            setTimeout(() => navigate("/timviec"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <div className="tuyendung-container">
            <h2>Đăng Tuyển Công Việc</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Tên Công Ty:</label>
                <input type="text" name="company" placeholder="Nhập tên công ty" value={job.company} onChange={handleChange} required />

                <label>Vị Trí Cần Tuyển:</label>
                <input type="text" name="title" placeholder="Nhập vị trí tuyển dụng" value={job.title} onChange={handleChange} required />

                <label>Mức Lương:</label>
                <input type="text" name="salary" placeholder="Nhập mức lương" value={job.salary} onChange={handleChange} required />

                <label>Địa Điểm:</label>
                <input type="text" name="location" placeholder="Nhập địa điểm làm việc" value={job.location} onChange={handleChange} required />

                <label>Loại Hình Công Việc:</label>
                <select name="type" value={job.type} onChange={handleChange}>
                    <option value="Toàn thời gian">Toàn thời gian</option>
                    <option value="Bán thời gian">Bán thời gian</option>
                    <option value="Thực tập">Thực tập</option>
                    <option value="Freelancer">Freelancer</option>
                </select>

                <label>Mô Tả Công Việc:</label>
                <textarea name="description" placeholder="Nhập mô tả công việc" value={job.description} onChange={handleChange} required></textarea>

                <label>Yêu Cầu Công Việc:</label>
                <textarea name="requirements" placeholder="Nhập yêu cầu công việc" value={job.requirements} onChange={handleChange} required></textarea>

                <button type="submit" className="post-job-btn">Đăng Công Việc</button>
            </form>
        </div>
    );
};

export default TuyenDung;
