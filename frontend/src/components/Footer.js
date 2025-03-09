import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid> {/* Ensure it spans full width */}
                <Row className="justify-content-between align-items-center">
                    {/* Left Side - Copyright */}
                    <Col md="auto">
                        <small>Copyright &copy; 2025 Minh Quan. All rights reserved.</small>
                    </Col>

                    {/* Right Side - Links */}
                    <Col md="auto" className="footer-links">
                        <a href="/terms">Terms of Service</a>
                        <a href="/privacy">Privacy Policy</a>
                        <a href="/donotsell">Do Not Sell or Share My Personal Information</a>
                        <a href="/accessibility">Accessibility Statement</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
