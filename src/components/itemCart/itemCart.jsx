import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './itemCart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../context/CartContext';

const ItemCart = ({ carrito }) => {
  const { eliminarDelCarrito } = useContext(CartContext);

  return (
    <div className="cart-items-container">
      {carrito && carrito.length > 0 ? (
        carrito.map((producto, index) => {
          const imageUrl = `/assets/productimages/${producto.id}/${producto.productimage1}`;
          console.log(imageUrl); // Verifica la URL en la consola

          return (
            <div key={index} className="producto">
              <div className="producto-image-container">
                <img src={imageUrl} alt={producto.productname} />
              </div>
              <div className="producto-info">
                <Link className="" to={`/item/${producto.id}`}>
                  <h4 className="producto-price2">{producto.productname}</h4>
                  <h4 className="producto-price2">{producto.productdescription}</h4>
                </Link>
                <p className="producto-price">Precio: ${producto.productprice}</p>
                <div className="producto-actions">
                  <button className='action-btn' onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                  {/* <button className="action-btn">Guardar</button> */}
                  <Link to={'/checkout'}>
                    <button className="action-btn">Comprar ahora</button>
                  </Link>
                  <div className="product-quantity-container">
                    <button className="quantity-btn">-</button>
                    <p>{producto.cantidad}</p>
                    <button className="quantity-btn">+</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default ItemCart;
