import React, { useEffect, useState } from 'react';
import './ImageCarousel.css';

const importAll = (requireContext) => requireContext.keys().map(requireContext);

const images = importAll(require.context('../../../public/assets/propaganda', false, /\.(png|jpe?g|svg)$/)).map(image => image.replace('../../../public', ''));

export const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`carousel-img-${index}`}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
};


