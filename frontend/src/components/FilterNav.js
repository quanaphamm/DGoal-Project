import React, { useState } from "react";
import "./FilterNav.css";

const FilterNav = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        price: "all",
        location: "all",
        status: "all"
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    return (
        <div className="filter-nav">
            <h3>Bộ Lọc</h3>

            {/* Price Filter */}
            <label htmlFor="price">Giá:</label>
            <select name="price" value={filters.price} onChange={handleChange}>
                <option value="all">Tất cả</option>
                <option value="low">Dưới 5 triệu</option>
                <option value="medium">5 - 10 triệu</option>
                <option value="high">Trên 10 triệu</option>
            </select>

            {/* Location Filter */}
            <label htmlFor="location">Địa điểm:</label>
            <select name="location" value={filters.location} onChange={handleChange}>
                <option value="all">Tất cả</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
            </select>

            {/* Status Filter */}
            <label htmlFor="status">Trạng thái:</label>
            <select name="status" value={filters.status} onChange={handleChange}>
                <option value="all">Tất cả</option>
                <option value="new">Mới</option>
                <option value="used">Cũ</option>
            </select>
        </div>
    );
};

export default FilterNav;
