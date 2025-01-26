import React, { useState } from "react";
import "./ImageWithFallback.css";

const ImageWithFallback = ({ src, alt, className }) => {
    const [imageStatus, setImageStatus] = useState("loading"); // "loading", "loaded", "error"

    const handleImageLoad = () => setImageStatus("loaded");
    const handleImageError = () => setImageStatus("error");

    return (
        <div className={`image-container ${imageStatus} ${className}`}>
            {imageStatus === "loading" && (
                <div className="loading-animation">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div 
                            key={index} 
                            style={{
                                transform: `rotate(${360 / 8 * index}deg) translateX(150%) rotate(-${360 / 8 * index}deg)`,
                                animation: `orbit 1.5s linear infinite, fade-in 0.19s ${index * 0.19}s forwards`,
                                animationDelay: `${(index * 0.19)}s`,
                            }}
                            className="circle" />
                    ))}
                </div>
            )}
            {imageStatus === "error" && <div className="error-placeholder">Нет изображения</div>}
            <img
                src={src}
                alt={alt}
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="image-element"
            />
        </div>
    );
};

export default ImageWithFallback;