import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DienThoai.css";
import FilterNav from "../components/FilterNav"; // ✅ Import filter component
import { getProducts } from "../services/api"; // ✅ Import API function

const DienThoai = () => {
  const navigate = useNavigate();
  const [filteredItems, setFilteredItems] = useState([]); // ✅ Store displayed items
  const [allItems, setAllItems] = useState([]); // ✅ Store all items from API
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(""); // ✅ Error handling

  // ✅ Fetch products from backend on first render
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("🔄 Fetching products...");
        const response = await getProducts(); // ✅ Fetch from backend
        console.log("✅ Fetched Products:", response.products);

        // ✅ Ensure products are correctly received and filtered
        if (!response.products || response.products.length === 0) {
          setError("Không có sản phẩm nào.");
          return;
        }

        // ✅ Filter only "dienthoai" category
        const phoneProducts = response.products.filter(item => item.category === "dienthoai");

        setAllItems(phoneProducts);
        setFilteredItems(phoneProducts);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
        setError("Lỗi khi tải sản phẩm. Vui lòng thử lại.");
      } finally {
        setLoading(false); // ✅ Hide loading
      }
    }
    fetchProducts();
  }, []);

  // ✅ Handle filtering products
  const handleFilterChange = (filters) => {
    let updatedItems = [...allItems];

    // 🔹 Filter by Price
    if (filters.price !== "all") {
      updatedItems = updatedItems.filter(item => {
        if (filters.price === "low") return item.price < 5000000;
        if (filters.price === "medium") return item.price >= 5000000 && item.price <= 10000000;
        if (filters.price === "high") return item.price > 10000000;
        return true;
      });
    }

    // 🔹 Filter by Location
    if (filters.location !== "all") {
      updatedItems = updatedItems.filter(item => item.location === filters.location);
    }

    // 🔹 Filter by Status (New/Used)
    if (filters.status !== "all") {
      updatedItems = updatedItems.filter(item => item.status === filters.status);
    }

    setFilteredItems(updatedItems);
  };

  return (
    <div className="dienthoai-container">
      {/* ✅ Filter Navigation */}
      <FilterNav onFilterChange={handleFilterChange} />

      <div className="dienthoai-content">
        <h2 className="section-title">Điện Thoại</h2>

        {/* ✅ Show loading message */}
        {loading ? (
          <p className="loading-message">Đang tải sản phẩm...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="phone-grid">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className="phone-item" onClick={() => navigate(`/view/${item.id}`)}>
                  <img
                    src={item.image ? `http://localhost:5000${item.image}` : "/img/default-phone.jpg"}
                    alt={item.name}
                    className="phone-image"
                  />
                  <p className="phone-name">{item.name}</p>
                  <p className="phone-price">{parseInt(item.price).toLocaleString()}đ</p>
                  <p className="phone-location">📍 {item.location || "Không rõ"}</p>
                  <p className="phone-status">{item.status === "new" ? "🆕 Mới" : "♻️ Cũ"}</p>
                </div>
              ))
            ) : (
              <p className="no-products-message">Không có sản phẩm nào.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DienThoai;
