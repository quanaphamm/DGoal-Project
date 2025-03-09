import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DienThoai.css";
import FilterNav from "../components/FilterNav"; // ✅ Import the filter component

const preloadedItems = [
  { id: 1, name: "iPhone 13", price: 12000000, location: "Hà Nội", status: "new", image: "/img/devices/dt1.jpg" },
  { id: 2, name: "Samsung Galaxy S21", price: 9500000, location: "Hồ Chí Minh", status: "used", image: "/img/devices/dt2.jpg" },
  { id: 3, name: "Xiaomi Mi 11", price: 7000000, location: "Đà Nẵng", status: "new", image: "/img/devices/dt3.jpg" },
  { id: 4, name: "Oppo Reno 6", price: 8000000, location: "Hà Nội", status: "used", image: "/img/devices/dt4.jpg" },
  { id: 5, name: "Vivo X70 Pro", price: 8500000, location: "Hồ Chí Minh", status: "new", image: "/img/devices/dt5.jpg" }
];

const DienThoai = () => {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState([...preloadedItems]);
  const [allItems, setAllItems] = useState([...preloadedItems]);

  // ✅ Load user-added products from localStorage on first render
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("dienthoai")) || [];
    const updatedItems = [...preloadedItems, ...storedProducts];
    setAllItems(updatedItems);
    setFilteredItems(updatedItems);
  }, []);

  // ✅ Function to update the list dynamically after a new product is added
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("dienthoai")) || [];
    setAllItems([...preloadedItems, ...storedProducts]);
    setFilteredItems([...preloadedItems, ...storedProducts]);
  }, [localStorage.getItem("dienthoai")]); // Runs when localStorage changes

  const handleFilterChange = (filters) => {
    let updatedItems = [...allItems];

    // Filter by Price
    if (filters.price !== "all") {
      updatedItems = updatedItems.filter(item => {
        if (filters.price === "low") return item.price < 5000000;
        if (filters.price === "medium") return item.price >= 5000000 && item.price <= 10000000;
        if (filters.price === "high") return item.price > 10000000;
        return true;
      });
    }

    // Filter by Location
    if (filters.location !== "all") {
      updatedItems = updatedItems.filter(item => item.location === filters.location);
    }

    // Filter by Status (New/Used)
    if (filters.status !== "all") {
      updatedItems = updatedItems.filter(item => item.status === filters.status);
    }

    setFilteredItems(updatedItems);
  };

  return (
    <div className="dienthoai-container">
      {/* ✅ Add the FilterNav component */}
      <FilterNav onFilterChange={handleFilterChange} />

      <div className="dienthoai-content">
        <h2 className="section-title">Điện Thoại</h2>
        <div className="phone-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="phone-item" onClick={() => navigate(`/view/${item.id}`)}>
              <img src={item.image || "/img/default-phone.jpg"} alt={item.name} className="phone-image" />
              <p className="phone-name">{item.name}</p>
              <p className="phone-price">{item.price.toLocaleString()}đ</p>
              <p className="phone-location">📍 {item.location || "Không rõ"}</p>
              <p className="phone-status">{item.status === "new" ? "🆕 Mới" : "♻️ Cũ"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DienThoai;
