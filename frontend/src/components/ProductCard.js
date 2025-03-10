import React from 'react';

const ProductCard = ({ product }) => {
    const [imgSrc, setImgSrc] = React.useState(product.image);
    
    const handleImageError = () => {
        console.error("Image failed to load:", product.image);
        // Try a different URL format
        if (product.image.includes('/static/uploads/')) {
            const filename = product.image.split('/').pop();
            setImgSrc(`https://dgoal-project.onrender.com/products/direct-image/${filename}`);
        } else {
            setImgSrc('/placeholder.jpg');
        }
    };
    
    return (
        <div className="product-card">
            <img 
                src={imgSrc} 
                alt={product.name} 
                onError={handleImageError}
            />
            <h3>{product.name}</h3>
            <p>{product.price}đ</p>
        </div>
    );
};

export default ProductCard; 