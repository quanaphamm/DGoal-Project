import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import DangBan from "./pages/DangBan";  // ✅ Added the new "Đăng Bán" page
import ViewItem from "./pages/ViewItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import FrontPage from "./pages/FrontPage";
import TuyenDung from "./pages/TuyenDung"; 

const Layout = ({ children, user, setUser, cartItems, setCartItems }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCategoryPage =
    location.pathname.startsWith("/dienthoai") || location.pathname.startsWith("/quanao");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    window.scrollTo(0, 0); // ✅ Scroll to top on navigation
  }, [location.pathname]);

  return (
    <div className="app-container">
      <NavigationBar user={user} setUser={setUser} cartItems={cartItems} setCartItems={setCartItems} />
      <div className="main-content">
        {isHomePage && <SecondNavbar />}
        {isCategoryPage && <FilterNav />}
        <div className="content-area">{children}</div>
      </div>
      {!isAuthPage && <Footer />} {/* ✅ Hide Footer on Login & Register Pages */}
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ✅ Save cart items to localStorage whenever cart updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Router>
      <Routes>
        {/* ✅ Define all routes dynamically */}
        {[
          { path: "/", element: <Home /> },
          { path: "/timviec", element: <TimViec /> },
          { path: "/dienthoai", element: <DienThoai /> },
          { path: "/quanao", element: <Quanao /> },
          { path: "/dangban", element: <DangBan /> },  // ✅ Added DangBan Route
          { path: "/view/:id", element: <ViewItem setCartItems={setCartItems} /> },
          { path: "/login", element: <Login setUser={setUser} />, hideCart: true },
          { path: "/register", element: <Register />, hideCart: true },
          { path: "/checkout", element: <Checkout cartItems={cartItems} setCartItems={setCartItems} /> },
          { path: "/frontpage", element: <FrontPage /> },
          { path: "/tuyendung", element: <TuyenDung /> },  
          {/* ✅ Catch-all route */}
          
        ].map(({ path, element, hideCart = false }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout
                user={user}
                setUser={setUser}
                cartItems={hideCart ? [] : cartItems}
                setCartItems={hideCart ? () => {} : setCartItems}
              >
                {element}
              </Layout>
            }
          />
        ))}
      </Routes>
    </Router>
  );
};

export default App;
