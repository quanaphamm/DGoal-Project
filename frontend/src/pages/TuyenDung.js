import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TuyenDung.css";

const TuyenDung = () => {
    const navigate = useNavigate();
    const [job, setJob] = useState({
        company: "",
        title: "",
        salary: "",
        location: "",
        type: "Toàn thời gian", // Default job type
        description: "",
        requirements: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ✅ Handle Input Changes
    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    // ✅ Handle Job Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Validate Inputs
        if (!job.company || !job.title || !job.salary || !job.location || !job.description || !job.requirements) {
            setError("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        // ✅ Create New Job Object
        const newJob = {
            id: Date.now(), // Generate unique ID
            company: job.company,
            title: job.title,
            salary: job.salary,
            location: job.location,
            type: job.type,
            description: job.description,
            requirements: job.requirements
        };

        // ✅ Save to LocalStorage
        const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];
        const updatedJobs = [...existingJobs, newJob];
        localStorage.setItem("jobs", JSON.stringify(updatedJobs));

        setSuccess("Công việc đã được đăng thành công!");
        setTimeout(() => navigate("/timviec"), 1500); // ✅ Redirect to job listings
    };

    return (
        <div className="tuyendung-container">
            <h2>Đăng Tuyển Công Việc</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit}>
                <label>Tên Công Ty:</label>
                <input type="text" name="company" placeholder="Nhập tên công ty" value={job.company} onChange={handleChange} />

                <label>Vị Trí Cần Tuyển:</label>
                <input type="text" name="title" placeholder="Nhập vị trí tuyển dụng" value={job.title} onChange={handleChange} />

                <label>Mức Lương:</label>
                <input type="text" name="salary" placeholder="Nhập mức lương" value={job.salary} onChange={handleChange} />

                <label>Địa Điểm:</label>
                <input type="text" name="location" placeholder="Nhập địa điểm làm việc" value={job.location} onChange={handleChange} />

                <label>Loại Hình Công Việc:</label>
                <select name="type" value={job.type} onChange={handleChange}>
                    <option value="Toàn thời gian">Toàn thời gian</option>
                    <option value="Bán thời gian">Bán thời gian</option>
                    <option value="Thực tập">Thực tập</option>
                    <option value="Freelancer">Freelancer</option>
                </select>

                <label>Mô Tả Công Việc:</label>
                <textarea name="description" placeholder="Nhập mô tả công việc" value={job.description} onChange={handleChange}></textarea>

                <label>Yêu Cầu Công Việc:</label>
                <textarea name="requirements" placeholder="Nhập yêu cầu công việc" value={job.requirements} onChange={handleChange}></textarea>

                <button type="submit" className="post-job-btn">Đăng Công Việc</button>
            </form>
        </div>
    );
};

export default TuyenDung;
