import React from "react";
import { useParams } from "react-router-dom";
import "./ViewItem.css";

const items = [
  { id: 1, name: "iPhone 13", price: "12,000,000đ", location: "Hà Nội", image: "/img/devices/dt1.jpg", description: "Chi tiết về iPhone 13." },
  { id: 2, name: "Samsung Galaxy S21", price: "9,500,000đ", location: "Hồ Chí Minh", image: "/img/devices/dt2.jpg", description: "Chi tiết về Samsung Galaxy S21." },
  { id: 3, name: "Xiaomi Mi 11", price: "7,000,000đ", location: "Đà Nẵng", image: "/img/devices/dt3.jpg", description: "Chi tiết về Xiaomi Mi 11." },
  { id: 4, name: "Oppo Reno 6", price: "8,000,000đ", location: "Hà Nội", image: "/img/devices/dt4.jpg", description: "Chi tiết về Oppo Reno 6." },
  { id: 5, name: "Vivo X70 Pro", price: "8,500,000đ", location: "Hồ Chí Minh", image: "/img/devices/dt5.jpg", description: "Chi tiết về Vivo X70 Pro." }
];

const ViewItem = ({ setCartItems }) => {
  const { id } = useParams();
  const item = items.find(i => i.id === parseInt(id));

  const addToCart = () => {
    if (!item) return;

    setCartItems(prevCart => {
      const updatedCart = [...prevCart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Store updated cart in localStorage
      return updatedCart;
    });

    alert(`✅ Đã thêm ${item.name} vào giỏ hàng!`);
  };

  if (!item) {
    return <h2>Sản phẩm không tồn tại</h2>;
  }

  return (
    <div className="view-container">
      <div className="view-item">
        <div className="view-image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="view-details">
          <h2>{item.name}</h2>
          <p className="view-price">{item.price}</p>
          <p className="view-location">📍 {item.location}</p>
          <button className="buy-button">Mua ngay</button>
          <button className="cart-button" onClick={addToCart}>Thêm vào giỏ hàng</button>
        </div>
      </div>
      <div className="view-description">
        <h3>Chi tiết sản phẩm</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ViewItem;
