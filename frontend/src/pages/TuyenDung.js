import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postJob } from "../services/api"; // ✅ Import API function
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
    const [loading, setLoading] = useState(false); // ✅ Added loading state

    // 🛠 Handle Input Changes
    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    // 🛠 Handle Job Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true); // ✅ Show loading state

        // ✅ Input validation
        if (!job.company || !job.title || !job.salary || !job.location || !job.description || !job.requirements) {
            setError("Vui lòng điền đầy đủ thông tin.");
            setLoading(false);
            return;
        }

        try {
            console.log("🔄 Posting job:", job); // ✅ Debug log
            const response = await postJob(job); // ✅ Send job data to backend
            console.log("✅ Job posted:", response); // ✅ Debug log

            setSuccess("Công việc đã được đăng thành công!");

            // ✅ Redirect to job listings after 2 seconds
            setTimeout(() => navigate("/timviec"), 2000);
        } catch (err) {
            console.error("❌ Post Job Error:", err.response?.data || err.message); // ✅ Debug log
            setError(err.response?.data?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        } finally {
            setLoading(false); // ✅ Hide loading state
        }
    };

    return (
        <div className="tuyendung-container">
            <h2>Đăng Tuyển Công Việc</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
                {/* 🏢 Company Name */}
                <label>Tên Công Ty:</label>
                <input
                    type="text"
                    name="company"
                    placeholder="Nhập tên công ty"
                    value={job.company}
                    onChange={handleChange}
                    required
                />

                {/* 📌 Job Title */}
                <label>Vị Trí Cần Tuyển:</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Nhập vị trí tuyển dụng"
                    value={job.title}
                    onChange={handleChange}
                    required
                />

                {/* 💰 Salary */}
                <label>Mức Lương:</label>
                <input
                    type="text"
                    name="salary"
                    placeholder="Nhập mức lương"
                    value={job.salary}
                    onChange={handleChange}
                    required
                />

                {/* 📍 Location */}
                <label>Địa Điểm:</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Nhập địa điểm làm việc"
                    value={job.location}
                    onChange={handleChange}
                    required
                />

                {/* ⏳ Job Type */}
                <label>Loại Hình Công Việc:</label>
                <select name="type" value={job.type} onChange={handleChange}>
                    <option value="Toàn thời gian">Toàn thời gian</option>
                    <option value="Bán thời gian">Bán thời gian</option>
                    <option value="Thực tập">Thực tập</option>
                    <option value="Freelancer">Freelancer</option>
                </select>

                {/* 📄 Job Description */}
                <label>Mô Tả Công Việc:</label>
                <textarea
                    name="description"
                    placeholder="Nhập mô tả công việc"
                    value={job.description}
                    onChange={handleChange}
                    required
                ></textarea>

                {/* ✅ Job Requirements */}
                <label>Yêu Cầu Công Việc:</label>
                <textarea
                    name="requirements"
                    placeholder="Nhập yêu cầu công việc"
                    value={job.requirements}
                    onChange={handleChange}
                    required
                ></textarea>

                {/* 🚀 Submit Button */}
                <button type="submit" className="post-job-btn" disabled={loading}>
                    {loading ? "Đang đăng tuyển..." : "Đăng Công Việc"}
                </button>
            </form>
        </div>
    );
};

export default TuyenDung;
