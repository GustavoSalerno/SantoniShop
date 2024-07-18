import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './itemCart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../context/CartContext';

const ItemCart = ({ carrito }) => {
  const { eliminarDelCarrito, vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  };

  // Calcular el total del carrito teniendo en cuenta las cantidades
  const totalCarrito = carrito.reduce((total, producto) => total + producto.productprice * producto.cantidad, 0);
  const tosCarrito = carrito.reduce((total, producto) => total + producto.cantidad , 0);

  return (
    <div className="cart-items-container">
      <div className="store-header">
        <h2>Casa Santoni</h2>
        <p>Tienda Oficial</p>
      </div>
      {carrito && carrito.length > 0 ? (
        carrito.map((producto, index) => {
          const imageUrl = `/assets/productimages/${producto.id}/${producto.productimage1}`;
          return (
            <div key={index} className="producto">
              <div className="producto-image-container2">
                <img src={imageUrl} alt={producto.productname} />
              </div>
              <div className="producto-info">
                <Link to={`/item/${producto.id}`}>
                  <h4 className="producto-name">{producto.productname}</h4>
                </Link>
                <p className="producto-description">{producto.productdescription}</p>
                <p className="producto-cantidad">Cantidad: {producto.cantidad}</p>
                <p className="producto-price">Precio: ${producto.productprice}</p>
                <div className="producto-actions">
                  <button className='action-btn' onClick={() => eliminarDelCarrito(producto.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="empty-cart-message">El carrito está vacío.</p>
      )}
      <div className="summary-container">
        <h3>Resumen de compra</h3>
        {/* <p>Productos ({carrito.length})</p> */}
        <p>Productos ({tosCarrito})</p>
        <p>Envío: Gratis</p>
        <p>Total: ${totalCarrito}</p>
        <Link to={'/checkout'}><button className="checkout-btn" style={{marginRight:'13px'}}>Finalizar compra</button></Link>
        <button className="checkout-btn" onClick={handleVaciar}>Vaciar Carrito</button>
      </div>
    </div>
  );
};

export default ItemCart;
