import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DangBan.css";

const DangBan = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "dienthoai", // 🔹 Match category keys in localStorage
        description: "",
        price: "",
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    // 🛠 Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // 🛠 Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file });
            setImagePreview(URL.createObjectURL(file)); // Show image preview
        }
    };

    // 🛠 Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!product.image) {
            alert("Hãy tải lên một hình ảnh sản phẩm!");
            return;
        }

        // ✅ Create product object
        const newProduct = {
            id: Date.now(), // Unique ID
            name: product.name,
            category: product.category,
            description: product.description,
            price: parseInt(product.price),
            location: "Hồ Chí Minh", // Default location
            status: "new", // Default status
            image: imagePreview, // Use preview URL
        };

        // ✅ Retrieve existing products from localStorage
        const storedProducts = JSON.parse(localStorage.getItem(product.category)) || [];

        // ✅ Save new product
        const updatedProducts = [...storedProducts, newProduct];
        localStorage.setItem(product.category, JSON.stringify(updatedProducts));

        alert("Sản phẩm đã được đăng thành công!");

        // ✅ Redirect to respective category page
        navigate(`/${product.category}`);
    };

    return (
        <div className="dangban-container">
            <form className="dangban-form" onSubmit={handleSubmit}>
                <h2>Đăng Bán Sản Phẩm</h2>

                {/* 🏷 Product Name */}
                <div className="form-group">
                    <label>Tên Sản Phẩm:</label>
                    <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </div>

                {/* 🏷 Product Category */}
                <div className="form-group">
                    <label>Loại Sản Phẩm:</label>
                    <select name="category" value={product.category} onChange={handleChange}>
                        <option value="dienthoai">Điện thoại</option>
                        <option value="quanao">Quần áo</option>
                    </select>
                </div>

                {/* 🏷 Product Image */}
                <div className="form-group">
                    <label>Hình Ảnh Sản Phẩm:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} required />
                </div>

                {/* 🖼 Show Image Preview */}
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}

                {/* 🏷 Product Description */}
                <div className="form-group">
                    <label>Mô Tả:</label>
                    <textarea name="description" value={product.description} onChange={handleChange} required></textarea>
                </div>

                {/* 🏷 Product Price */}
                <div className="form-group">
                    <label>Giá:</label>
                    <input type="number" name="price" value={product.price} onChange={handleChange} required />
                </div>

                {/* ✅ Submit Button */}
                <button type="submit" className="submit-btn">Đăng Bán</button>
            </form>
        </div>
    );
};

export default DangBan;
