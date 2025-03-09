import React, { useRef, useEffect } from "react";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

const Carousel = ({ images }) => {
    const trackRef = useRef(null);
    const navigate = useNavigate();
    const speed = 1; // 🔹 Adjust speed for smoother scrolling

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        let position = 0;

        const animate = () => {
            position -= speed;

            // 🔹 Reset position when it scrolls past half of its width
            if (Math.abs(position) >= track.scrollWidth / 2) {
                position = 0;
            }

            track.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        };

        const animation = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animation);
    }, []);

    // 🔹 Duplicate images for seamless infinite scrolling
    const allImages = [...images, ...images];

    return (
        <div className="carousel-wrapper">
            <div className="carousel-container">
                <div className="carousel-track" ref={trackRef}>
                    {allImages.map((item, index) => (
                        <img 
                            key={index} 
                            src={item.img} 
                            alt={item.name} 
                            className="carousel-image"
                            onClick={() => navigate(item.route)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
