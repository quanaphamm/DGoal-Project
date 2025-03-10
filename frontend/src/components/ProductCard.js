const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <img 
                src={product.image} 
                alt={product.name} 
                onError={(e) => {
                    console.error("Image failed to load:", product.image);
                    e.target.src = '/placeholder.jpg'; // Fallback image
                }}
            />
            <h3>{product.name}</h3>
            <p>{product.price}đ</p>
        </div>
    );
}; 