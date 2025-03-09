import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quanao.css";
import FilterNav from "../components/FilterNav"; // ✅ Import the filter component

const preloadedItems = [
  { id: 1, name: "Áo Thun Nam", price: 250000, location: "Hà Nội", status: "new", image: "/img/clothings/quanao1.jpg" },
  { id: 2, name: "Quần Jeans", price: 450000, location: "Hồ Chí Minh", status: "used", image: "/img/clothings/quanao2.jpg" },
  { id: 3, name: "Áo Khoác", price: 600000, location: "Đà Nẵng", status: "new", image: "/img/clothings/quanao3.jpg" },
  { id: 4, name: "Váy Nữ", price: 800000, location: "Hà Nội", status: "used", image: "/img/clothings/quanao4.jpg" },
  { id: 5, name: "Giày Sneaker", price: 1200000, location: "Hồ Chí Minh", status: "new", image: "/img/clothings/quanao1.jpg" }
];

const Quanao = () => {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState(preloadedItems);

  // ✅ Load user-added products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("quanao")) || [];
    setFilteredItems([...preloadedItems, ...storedProducts]);
  }, []);

  const handleFilterChange = (filters) => {
    let updatedItems = [...preloadedItems, ...(JSON.parse(localStorage.getItem("quanao")) || [])];

    // Filter by Price
    if (filters.price !== "all") {
      updatedItems = updatedItems.filter(item => {
        if (filters.price === "low") return item.price < 500000;
        if (filters.price === "medium") return item.price >= 500000 && item.price <= 1000000;
        if (filters.price === "high") return item.price > 1000000;
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
    <div className="quanao-container">
      {/* ✅ Add the FilterNav component */}
      <FilterNav onFilterChange={handleFilterChange} />

      <div className="quanao-content">
        <h2 className="section-title">Quần Áo</h2>
        <div className="clothing-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="clothing-item" onClick={() => navigate(`/view/${item.id}`)}>
              <img src={item.image || "/img/default-clothing.jpg"} alt={item.name} className="clothing-image" />
              <p className="clothing-name">{item.name}</p>
              <p className="clothing-price">{item.price.toLocaleString()}đ</p>
              <p className="clothing-location">📍 {item.location || "Không rõ"}</p>
              <p className="clothing-status">{item.status === "new" ? "🆕 Mới" : "♻️ Cũ"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quanao;
