import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import "../pages/Home.css";

const deviceItems = [
    { id: 1, name: "iPhone 13", img: "/img/devices/dt1.jpg", route: "/view/1" },
    { id: 2, name: "Samsung Galaxy S21", img: "/img/devices/dt2.jpg", route: "/view/2" },
    { id: 3, name: "Xiaomi Mi 11", img: "/img/devices/dt3.jpg", route: "/view/3" },
    { id: 4, name: "Oppo Reno 6", img: "/img/devices/dt4.jpg", route: "/view/4" },
];

const clothingItems = [
    { id: 1, name: "Áo Polo", img: "/img/clothings/quanao1.jpg" },
    { id: 2, name: "Áo Khoác", img: "/img/clothings/quanao2.jpg" },
    { id: 3, name: "Quần Jeans", img: "/img/clothings/quanao3.jpg" },
    { id: 4, name: "Áo Thun", img: "/img/clothings/quanao4.jpg" },
];

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const jobData = [
            {
                id: 1,
                title: "Lái xe bồn",
                company: "CTNH MINQUAN.",
                salary: "67tr/tháng",
                location: "Sài Gòn",
                type: "Toàn thời gian",
                description: "Lái xe bồn chở hàng đến các địa điểm được chỉ định, đảm bảo an toàn giao thông...",
            },
            {
                id: 2,
                title: "Kế toán",
                company: "CTNH MINQUAN.",
                salary: "15-20tr/tháng",
                location: "Sài Gòn",
                type: "Toàn thời gian",
                description: "Phụ trách sổ sách kế toán, theo dõi thu chi, lập báo cáo tài chính...",
            },
           
        ];

        setJobs(jobData.slice(0, 3)); // Take the first 3 jobs
    }, []);

    const handleItemClick = (route) => {
        navigate(route);
    };

    return (
        <div className="home-container">
            {/* Điện Thoại Section */}
            <div className="section-container">
                <h2 className="section-title clickable" onClick={() => navigate("/dienthoai")}>
                    ĐIỆN THOẠI
                </h2>
                <Carousel images={deviceItems} onImageClick={handleItemClick} />
            </div>

            {/* Quần Áo Section */}
            <div className="section-container">
                <h2 className="section-title clickable" onClick={() => navigate("/quanao")}>
                     QUẦN ÁO
                    </h2>                
                <Carousel images={clothingItems} />
            </div>

            <div className="section-container">
                <h2 className="section-title clickable" onClick={() => navigate("/timviec")}>
                    CÔNG VIỆC
                </h2>
                <div className="home-job-list-container">
                    {jobs.map((job) => (
                        <div 
                            key={job.id} 
                            className="home-job-item" 
                            onClick={() => navigate(`/timviec?jobId=${job.id}`)}
                        >
                            <h3 className="home-job-title">{job.title}</h3>
                            <p className="company-name">{job.company}</p>
                            <p className="salary">💰 {job.salary}</p>
                            <p className="home-job-description">
                                {job.description.substring(0, 80)}...
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
