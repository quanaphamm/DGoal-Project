const ProductCard = ({ product }) => {
    // Add the backend URL if the image path is relative
    const imageUrl = product.image.startsWith('http') 
        ? product.image 
        : `https://dgoal-project.onrender.com${product.image}`;
    
    return (
        <div className="product-card">
            <img 
                src={imageUrl} 
                alt={product.name} 
                onError={(e) => {
                    console.error("Image failed to load:", imageUrl);
                    e.target.src = '/placeholder.jpg'; // Fallback image
                }}
            />
            <h3>{product.name}</h3>
            <p>{product.price}đ</p>
        </div>
    );
}; 