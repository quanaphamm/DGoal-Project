import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const QuanAoPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        console.log("QuanAoPage rendered");
        
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await getProducts();
                console.log("Products fetched:", response);
                
                // Filter for clothing products
                const clothingProducts = response.products.filter(
                    product => product.category === "Quần áo"
                );
                
                console.log("Clothing products:", clothingProducts);
                setProducts(clothingProducts);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products");
                setLoading(false);
            }
        };
        
        fetchProducts();
        
        return () => {
            console.log("QuanAoPage unmounted");
        };
    }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (products.length === 0) return <div>No clothing products found</div>;
    
    return (
        <div className="products-container">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default QuanAoPage; 