import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { Link } from "react-router-dom";
import ItemCart from './itemCart/itemCart';
const Carrito = () => {
  const { carrito, precioTotal,vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  }
  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>
      {
        carrito.length > 0 ?
        <>
        <ItemCart carrito={carrito} /> 
        <h2>Precio Total: $ {precioTotal()} </h2>
      <button className="btn btn-primary" onClick={handleVaciar}>Vaciar</button>
      <Link to="/checkout"> <button  className="btn btn-primary"> Finalizar Compra </button></Link>
      </> :
      <h2>El Carrito esta vacio</h2>
      }
    </div>
  );
};

export default Carrito;
