import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./timviec.css";

const TimViec = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const location = useLocation();

    useEffect(() => {
        // ✅ Get stored jobs or use empty array if none exist
        const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];

        // ✅ Default job listings
        const defaultJobs = [
            {
                id: 5, // Ensuring a unique ID
                title: "Lái xe bồn",
                company: "CTNH MINQUAN.",
                salary: "67tr/tháng",
                location: "Sài Gòn",
                type: "Toàn thời gian",
                description: "Lái xe bồn chở hàng đến các địa điểm được chỉ định, đảm bảo an toàn giao thông...",
                requirements: "Có bằng lái xe hạng C trở lên, có ít nhất 2 năm kinh nghiệm lái xe bồn."
            },
            {
                id: 2, // Ensuring a unique ID
                title: "Kế toán",
                company: "CTNH MINQUAN.",
                salary: "15-20tr/tháng",
                location: "Sài Gòn",
                type: "Toàn thời gian",
                description: "Phụ trách sổ sách kế toán, theo dõi thu chi, lập báo cáo tài chính...",
                requirements: "Tốt nghiệp chuyên ngành kế toán, có chứng chỉ hành nghề kế toán là lợi thế."
            }
        ];

        // ✅ Ensure unique job IDs by using a Set
        const allJobs = [...defaultJobs, ...storedJobs];
        const uniqueJobs = Array.from(new Map(allJobs.map(job => [job.id, job])).values());

        setJobs(uniqueJobs);

        // ✅ Check for job selection in URL
        const queryParams = new URLSearchParams(location.search);
        const jobIdFromURL = parseInt(queryParams.get("jobId"));

        if (jobIdFromURL) {
            const jobToSelect = uniqueJobs.find(job => job.id === jobIdFromURL);
            if (jobToSelect) {
                setSelectedJob(jobToSelect);
            }
        } else {
            setSelectedJob(uniqueJobs[0]); // ✅ Default to first job
        }
    }, [location.search]);

    return (
        <div className="timviec-container">
            {/* ✅ Job List Section */}
            <div className="job-list">
                {jobs.map((job) => (
                    <div 
                        key={job.id}  // ✅ Ensured Unique Key
                        className={`job-item ${selectedJob?.id === job.id ? "selected" : ""}`} 
                        onClick={() => setSelectedJob(job)}
                    >
                        <h3>{job.title}</h3>
                        <p><strong>{job.company}</strong></p>
                        <p className="salary">💰 {job.salary}</p>
                        <p className="location">📍 {job.location}</p>
                        <p className="type">⏳ {job.type}</p>
                    </div>
                ))}
            </div>

            {/* ✅ Job Details Section */}
            <div className="job-details">
                {selectedJob && (
                    <div className="job-details-container">
                        <p className="company">{selectedJob.company}</p>
                        <h2 className="job-title">{selectedJob.title}</h2>

                        <div className="divider"></div>

                        <p className="label">💰 Lương: <span className="salary">{selectedJob.salary}</span></p>
                        <p className="label">📍 Địa điểm: <span className="location">{selectedJob.location}</span></p>
                        <p className="label">⏳ Loại hình: <span className="type">{selectedJob.type}</span></p>

                        <div className="divider"></div>

                        <div className="job-description">
                            <strong>📋 Mô tả công việc:</strong>
                            <p>{selectedJob.description}</p>
                        </div>

                        <div className="divider"></div>

                        <div className="job-requirements">
                            <strong>🛠 Yêu cầu công việc:</strong>
                            <p>{selectedJob.requirements ? selectedJob.requirements : "Không có yêu cầu cụ thể."}</p>
                        </div>

                        <div className="button-group">
                            <button className="save-btn">⭐ Lưu</button>
                            <button className="apply-btn">📩 Ứng tuyển</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TimViec;
