import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadProduct } from "../services/api"; // ✅ API function
import "./DangBan.css";

const DangBan = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "dienthoai",
        description: "",
        price: "",
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // 🛠 Handle input changes
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // 🛠 Handle image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct({ ...product, image: file });
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 🛠 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!product.image) {
            setError("Hãy tải lên một hình ảnh sản phẩm!");
            return;
        }

        // ✅ Prepare FormData for file upload
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("category", product.category);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("image", product.image);

        try {
            const response = await uploadProduct(formData); // ✅ Send to backend
            setSuccess("Sản phẩm đã được đăng thành công!");
            
            // ✅ Redirect after 2s
            setTimeout(() => navigate(`/${product.category}`), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

    return (
        <div className="dangban-container">
            <form className="dangban-form" onSubmit={handleSubmit}>
                <h2>Đăng Bán Sản Phẩm</h2>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

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
