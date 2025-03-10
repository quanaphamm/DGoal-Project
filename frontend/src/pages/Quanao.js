import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quanao.css";
import FilterNav from "../components/FilterNav"; // ✅ Import filter component
import { getProducts } from "../services/api"; // ✅ Import API function

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // ✅ Ensure correct base URL

const Quanao = () => {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch "quanao" products from backend on first render
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("🔄 Fetching quần áo products...");
        const response = await getProducts();
        console.log("✅ Fetched Products:", response.products);

        // ✅ Filter only "quanao" category
        const clothingProducts = response.products.filter(
          (item) => item.category === "quanao"
        );

        if (!clothingProducts || clothingProducts.length === 0) {
          setError("Không có sản phẩm nào.");
          return;
        }

        setAllItems(clothingProducts);
        setFilteredItems(clothingProducts);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("Lỗi khi tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // ✅ Handle filtering products
  const handleFilterChange = (filters) => {
    let updatedItems = [...allItems];

    if (filters.price !== "all") {
      updatedItems = updatedItems.filter((item) => {
        if (filters.price === "low") return item.price < 500000;
        if (filters.price === "medium") return item.price >= 500000 && item.price <= 1000000;
        if (filters.price === "high") return item.price > 1000000;
        return true;
      });
    }

    if (filters.location !== "all") {
      updatedItems = updatedItems.filter((item) => item.location === filters.location);
    }

    if (filters.status !== "all") {
      updatedItems = updatedItems.filter((item) => item.status === filters.status);
    }

    setFilteredItems(updatedItems);
  };

  return (
    <div className="quanao-container">
      <FilterNav onFilterChange={handleFilterChange} />

      <div className="quanao-content">
        <h2 className="section-title">Quần Áo</h2>

        {loading ? (
          <p className="loading-message">Đang tải sản phẩm...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="clothing-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="clothing-item" onClick={() => navigate(`/view/${item.id}`)}>
                <img 
                  src={item.image ? `${API_BASE_URL}${item.image}` : "/img/default-clothing.jpg"}
                  alt={item.name}
                  className="clothing-image"
                  onError={(e) => { e.target.src = "/img/default-clothing.jpg"; }} // ✅ Handle broken images
                />
                <p className="clothing-name">{item.name}</p>
                <p className="clothing-price">{item.price.toLocaleString()}đ</p>
                <p className="clothing-location">📍 {item.location || "Không rõ"}</p>
                <p className="clothing-status">{item.status === "new" ? "🆕 Mới" : "♻️ Cũ"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quanao;
