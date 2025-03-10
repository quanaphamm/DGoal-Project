import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./timviec.css";
import { getJobs } from "../services/api"; // ✅ Import API function

const TimViec = () => {
    const [jobs, setJobs] = useState([]); // ✅ Store job listings
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Show loading state
    const [error, setError] = useState(""); // ✅ Handle errors
    const location = useLocation();

    useEffect(() => {
        // ✅ Fetch jobs from backend
        async function fetchJobs() {
            try {
                console.log("🔄 Fetching jobs...");
                const response = await getJobs(); // ✅ Fetch from API
                console.log("✅ Fetched Jobs:", response.jobs);

                // ✅ Ensure jobs exist
                if (!response.jobs || response.jobs.length === 0) {
                    setError("Không có công việc nào.");
                    return;
                }

                setJobs(response.jobs);

                // ✅ Check for job selection in URL
                const queryParams = new URLSearchParams(location.search);
                const jobIdFromURL = parseInt(queryParams.get("jobId"));

                if (jobIdFromURL) {
                    const jobToSelect = response.jobs.find(job => job.id === jobIdFromURL);
                    if (jobToSelect) {
                        setSelectedJob(jobToSelect);
                    }
                } else {
                    setSelectedJob(response.jobs[0]); // ✅ Default to first job
                }
            } catch (error) {
                console.error("❌ Error fetching jobs:", error);
                setError("Lỗi khi tải danh sách công việc.");
            } finally {
                setLoading(false); // ✅ Hide loading
            }
        }
        fetchJobs();
    }, [location.search]); // ✅ Fetch jobs on page load or URL change

    return (
        <div className="timviec-container">
            {/* ✅ Job List Section */}
            <div className="job-list">
                {loading ? (
                    <p className="loading-message">Đang tải công việc...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    jobs.map((job) => (
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
                    ))
                )}
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
