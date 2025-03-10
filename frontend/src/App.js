import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/Navbar"; 
import SecondNavbar from "./components/SecondNavbar";
import FilterNav from "./components/FilterNav";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ Import Pages
import Home from "./pages/Home";
import TimViec from "./pages/timviec";
import DienThoai from "./pages/DienThoai";
import Quanao from "./pages/Quanao";
import DangBan from "./pages/DangBan";
import ViewItem from "./pages/ViewItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import FrontPage from "./pages/FrontPage";
import TuyenDung from "./pages/TuyenDung"; 

const Layout = ({ children, user, setUser, cartItems, setCartItems }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCategoryPage = ["/dienthoai", "/quanao"].includes(location.pathname);
  const isAuthPage = ["/login", "/register"].includes(location.pathname);
  const isSpecialPage = ["/dangban", "/tuyendung"].includes(location.pathname); // ✅ Special pages check

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-container">
      <NavigationBar user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems} />
      <div className="main-content">
        {isHomePage && <SecondNavbar />}
        {isCategoryPage && <FilterNav />}
        <div className="content-area">{children}</div>
      </div>
      {!isAuthPage && !isSpecialPage && <Footer />} {/* ✅ Hide Footer on Login, Register, Đăng Bán, Tuyển Dụng */}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><Home /></Layout>} />
        <Route path="/timviec" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><TimViec /></Layout>} />
        <Route path="/dienthoai" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><DienThoai /></Layout>} />
        <Route path="/quanao" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><Quanao /></Layout>} />
        <Route path="/dangban" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><DangBan /></Layout>} />
        <Route path="/view/:id" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><ViewItem setCartItems={setCartItems} /></Layout>} />
        
        {/* ✅ Simplified login and register pages */}
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/checkout" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><Checkout cartItems={cartItems} setCartItems={setCartItems} /></Layout>} />
        <Route path="/frontpage" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><FrontPage /></Layout>} />
        <Route path="/tuyendung" element={<Layout user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems}><TuyenDung /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
