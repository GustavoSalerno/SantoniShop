import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { carrito, precioTotal,vaciarCarrito } = useContext(CartContext);

  const handleVaciar = () => {
    vaciarCarrito();
  }
  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>


      {carrito &&
      carrito.map((prod) => {
        return(

            <div key={prod.id}>
            {/* <h2>{prod.id}</h2> */}
            <img src={prod.imagen} alt="" />
            <p>Precio unit: $ {prod.precio}</p>
            <p>Precio Total: $ {prod.precio * prod.cantidad}</p>
            <p>Cantidad: {prod.cantidad}</p>
            
            <br />
        </div>
        )
      })}
      {
        carrito.length > 0 ?
        <>
        <h2>Precio Total: $ {precioTotal()} </h2>
      <button onClick={handleVaciar}>Vaciar</button>
      <Link to="/checkout">Finalizar Compra</Link>
      </> :
      <h2>El Carrito esta vacio</h2>
      }
    </div>
  );
};

export default Carrito;
