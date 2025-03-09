import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  // ✅ Calculate total price dynamically
  useEffect(() => {
    const calculatedTotal = cartItems.reduce((acc, item) => acc + parseInt(item.price.replace(/[^0-9]/g, "")), 0);
    setTotal(calculatedTotal);
  }, [cartItems]);

  // ✅ Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Handle checkout process
  const handleCheckout = () => {
    alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
    setCartItems([]); // Clear cart after checkout
    localStorage.removeItem("cart");
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="checkout-container">
      <div className="cart-section">
        <h2>🛒 Giỏ Hàng</h2>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <ul className="checkout-list">
            {cartItems.map(item => (
              <li key={item.id} className="checkout-item">
                <input type="checkbox" className="item-checkbox" />
                <img src={item.image} alt={item.name} className="checkout-item-img" />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.name}</p>
                  <p className="checkout-item-price">{item.price}₫</p>
                </div>
                <div className="item-actions">
                  <button className="item-btn">-</button>
                  <span>1</span>
                  <button className="item-btn">+</button>
                </div>
                <button className="checkout-remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ✅ Order Summary Section */}
      <div className="order-summary">
        <h3>Tóm Tắt Đơn Hàng</h3>
        <p><strong>Tổng tiền hàng:</strong> {total.toLocaleString()}₫</p>
        <p><strong>Phí vận chuyển:</strong> 0₫</p>
        <h4><strong>Tổng số tiền:</strong> {total.toLocaleString()}₫</h4>

        {/* ✅ Discount Section */}
        <div className="discount-section">
          <h4>Giảm giá</h4>
          <button className="discount-btn">Nhập voucher</button>
          
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>Thanh toán</button>
      </div>
    </div>
  );
};

export default Checkout;
