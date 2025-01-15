import { useState } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    return (
        <div className="carousel">
            <div className="carousel__container">
                <button 
                    onClick={handlePrevious} 
                    className="carousel__button carousel__button--prev"
                    >
                        &lt;
                </button>

                <div className="carousel__image-container">
                <div
                    className="carousel__images"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }} >
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Screenshot ${index + 1}`}
                                className="carousel__image"
                            />
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleNext} 
                    className="carousel__button carousel__button--next"
                    >
                        &gt;
                </button>
            </div>

            <div className="carousel__thumbnails">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className={`carousel__thumbnail ${
                            index === currentIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageCarousel
