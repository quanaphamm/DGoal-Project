import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/api"; // ✅ Import API function
import "./ViewItem.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"; // ✅ Backend Base URL

const ViewItem = ({ setCartItems }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null); // ✅ Store item details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        console.log(`🔄 Fetching item with ID: ${id}`);
        const response = await getProducts();

        const foundItem = response.products.find((product) => product.id === parseInt(id));

        if (!foundItem) {
          setError("Sản phẩm không tồn tại.");
        } else {
          setItem(foundItem);
        }
      } catch (err) {
        console.error("❌ Error fetching item:", err);
        setError("Lỗi khi tải sản phẩm.");
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [id]);

  const addToCart = () => {
    if (!item) return;

    setCartItems((prevCart) => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Store updated cart in localStorage
      return updatedCart;
    });

    alert(`✅ Đã thêm ${item.name} vào giỏ hàng!`);
  };

  if (loading) return <h2>🔄 Đang tải sản phẩm...</h2>;
  if (error) return <h2 className="error-message">{error}</h2>;
  if (!item) return <h2 className="error-message">Sản phẩm không tồn tại</h2>;

  return (
    <div className="view-container">
      <div className="view-item">
        <div className="view-image">
          <img
            src={item.image ? `${API_BASE_URL}${item.image}` : "/img/default-product.jpg"}
            alt={item.name}
            onError={(e) => (e.target.src = "/img/default-product.jpg")} // ✅ Handle missing images
          />
        </div>
        <div className="view-details">
          <h2>{item.name}</h2>
          <p className="view-price">{parseInt(item.price).toLocaleString()}đ</p>
          <p className="view-location">📍 {item.location || "Không rõ"}</p>
          <button className="buy-button">Mua ngay</button>
          <button className="cart-button" onClick={addToCart}>Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div className="view-description">
        <h3>Chi tiết sản phẩm</h3>
        <p>{item.description || "Không có mô tả."}</p>
      </div>
    </div>
  );
};

export default ViewItem;
