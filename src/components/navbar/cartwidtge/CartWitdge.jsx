// CartWidget.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../context/CartContext';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
const CartWidget = () => {
  const {  cantidadEnCarrito } = useContext(CartContext);
  return (
    <Link className="cart-widget" to="/carrito">
      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      <span className='numerito'>{cantidadEnCarrito()}</span>
    </Link>
  );
};

export default CartWidget;

