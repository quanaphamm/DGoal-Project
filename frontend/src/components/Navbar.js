import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown, Form, FormControl } from "react-bootstrap";
import "./Navbar.css";

const NavigationBar = ({ cartItems, setCartItems }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showCart, setShowCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Load user from localStorage on mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            setCartItems([]); // Clear cart if no user
            localStorage.removeItem("cart");
        }
    }, [setCartItems]); // ✅ Fixed ESLint warning

    const handleLogout = () => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // ✅ Preserve cart
        localStorage.removeItem("user"); // ✅ Remove only user data
        localStorage.setItem("cart", JSON.stringify(storedCart)); // ✅ Restore cart
        setUser(null);
        setCartItems(storedCart);
        navigate("/login");
    };
    
    // ✅ Handle Search
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="fixed-navbar">
            <Navbar bg="dark" variant="dark" expand="lg" className="main-navbar">
                <Container fluid>
                    <Navbar.Brand as={Link} to="/" className="navbar-logo">THỬ NGHIỆM</Navbar.Brand>

                    {/* 🔍 Search Bar */}
                    <Form className="d-flex mx-auto search-bar" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm..."
                            className="me-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button variant="outline-light" type="submit">🔍</Button>
                    </Form>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navbar-links">
                            <NavDropdown title="About" className="nav-item">
                                <NavDropdown.Item as={Link} to="/privacy">Chính sách bảo mật</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/terms">Điều khoản dịch vụ</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link as={Link} to="/tuyendung" className="nav-item">Tuyển dụng</Nav.Link>
                            <Nav.Link as={Link} to="/dangban" className="nav-item">Đăng bán</Nav.Link>

                            {/* 🛒 Cart Dropdown (Only for Logged-in Users) */}
                            {user && (
                                <NavDropdown
                                    title={`🛒 Giỏ Hàng (${cartItems.length})`}
                                    className="cart-dropdown"
                                    show={showCart}
                                    onMouseEnter={() => setShowCart(true)}
                                    onMouseLeave={() => setShowCart(false)}
                                >
                                    {cartItems.length > 0 ? (
                                        <>
                                            {cartItems.map((item, index) => (
                                                <NavDropdown.Item key={index}>
                                                    {item.name} - {item.price}₫
                                                </NavDropdown.Item>
                                            ))}
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item as={Link} to="/checkout" className="checkout-link">
                                                <strong>🛒 Thanh toán</strong>
                                            </NavDropdown.Item>
                                        </>
                                    ) : (
                                        <NavDropdown.Item>Giỏ hàng trống</NavDropdown.Item>
                                    )}
                                </NavDropdown>
                            )}

                            {/* 👤 User Dropdown OR Login Button */}
                            {user ? (
                                <NavDropdown title={user.full_name} className="user-dropdown">
                                    <NavDropdown.Item as={Link} to="/profile">Hồ sơ</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Button variant="outline-light" as={Link} to="/login" className="login-btn">
                                    Đăng Nhập
                                </Button>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavigationBar;
