import React, { useState } from "react";
import "./ImageWithFallback.css";

const ImageWithFallback = ({ src, alt, className }) => {
    const [imageStatus, setImageStatus] = useState("loading"); // "loading", "loaded", "error"

    const handleImageLoad = () => setImageStatus("loaded");
    const handleImageError = () => setImageStatus("error");

    return (
        <div className={`image-container ${imageStatus} ${className}`}>
            {imageStatus === "loading" && <div className="loading-animation"></div>}
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