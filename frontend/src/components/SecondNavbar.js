import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import "./SecondNavbar.css";

const SecondNavbar = () => {
    const navigate = useNavigate(); // ✅ Hook for navigation

    return (
        <div className="vertical-navbar">
            <Navbar className="category-navbar">
                <Container className="justify-content-start">
                    <Nav className="category-nav flex-column">
                       
                        <Nav.Link onClick={() => navigate("/timviec")} className="nav-item">Tìm việc</Nav.Link>
                        <Nav.Link onClick={() => navigate("/FrontPage")} className="nav-item">Giao lưu</Nav.Link>
                        <Nav.Link onClick={() => navigate("/vehicles")} className="nav-item">Xe cộ</Nav.Link>
                        <Nav.Link onClick={() => navigate("/Quanao")} className="nav-item">Quần áo</Nav.Link>
                        <Nav.Link onClick={() => navigate("/oldstuffs")} className="nav-item">Đồ cũ</Nav.Link>
                        <Nav.Link onClick={() => navigate("/food")} className="nav-item">Thực phẩm</Nav.Link>
                        
                        {/* ✅ Fix navigation to Điện Thoại */}
                        <Nav.Link onClick={() => navigate("/dienthoai")} className="nav-item">
                            Đồ điện tử
                        </Nav.Link>

                        <Nav.Link onClick={() => navigate("/parts")} className="nav-item">Phụ Tùng</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default SecondNavbar;
