import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CartDropdown.css";

const CartDropdown = () => {
  const [cart, setCart] = useState([]);
  const [isHovered, setIsHovered] = useState(false); // ✅ State to keep dropdown open

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div 
      className="cart-dropdown-container"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setTimeout(() => setIsHovered(false), 300)} // ✅ Small delay before closing
    >
      <h4>🛒 Giỏ Hàng ({cart.length})</h4>
      
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Ensure checkout button is clickable */}
          <div className="cart-footer">
            <Link to="/checkout" className="checkout-button">Thanh toán</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
