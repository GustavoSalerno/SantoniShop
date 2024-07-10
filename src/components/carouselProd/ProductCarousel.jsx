// ProductCarousel.jsx
import React from 'react';
import './ProductCarousel.css';
import Item from '../item/Item';

const ProductCarousel = ({ productos, titulo }) => {
    console.log(productos)
  return (
    <div className="product-carousel">
      <h2>Productos Relacionados</h2>
      <div className="product-carousel-container">
        {productos && productos.map((producto, index) => (
          <div key={index} className="product-carousel-item">
            <Item producto={producto} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
