import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, NavDropdown, Form, FormControl } from "react-bootstrap";
import "./Navbar.css";

const NavigationBar = ({ cartItems, setCartItems }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showCart, setShowCart] = useState(false);

    // ✅ Load user from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            // ✅ If no user, clear cart
            setCartItems([]);
            localStorage.removeItem("cart");
        }
    }, []);

    // ✅ Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("cart"); // Clear cart when user logs out
        setUser(null);
        setCartItems([]); // Reset cart state
        navigate("/login");
    };

    return (
        <div className="fixed-navbar">
            <Navbar bg="dark" variant="dark" expand="lg" className="main-navbar">
                <Container fluid>
                    <Navbar.Brand href="/" className="navbar-logo">THỬ NGHIỆM</Navbar.Brand>

                    {/* 🔹 Search Bar */}
                    <Form className="d-flex mx-auto search-bar">
                        <FormControl type="search" placeholder="Search..." className="me-2" />
                    </Form>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto navbar-links">
                            <NavDropdown title="About" className="nav-item">
                                <NavDropdown.Item href="/privacy">Privacy Policy</NavDropdown.Item>
                                <NavDropdown.Item href="/terms">Terms of Service</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/tuyendung" className="nav-item">Tuyển dụng</Nav.Link>
                            <Nav.Link href="/dangban" className="nav-item">Đăng bán</Nav.Link>

                            {/* 🔹 Show Cart ONLY if User is Logged In */}
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

                            {/* 🔹 User Dropdown OR Login Button */}
                            {user ? (
                                <NavDropdown title={user.full_name} className="user-dropdown">
                                    <NavDropdown.Item href="/profile">Hồ sơ</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Button variant="outline-light" href="/login" className="login-btn">
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
