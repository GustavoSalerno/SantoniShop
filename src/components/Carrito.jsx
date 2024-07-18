import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";

import ItemCart from './itemCart/itemCart';
const Carrito = () => {
  const { carrito } = useContext(CartContext);

 
  return (
    <div className="container">
      <h1 className="main-title">Carrito</h1>
      {
        carrito.length > 0 ?
        < >
        <ItemCart carrito={carrito} /> 
        <div style={{display: 'flex', marginRight:'3px'}}>
      {/* <button className="btn btn-primary" onClick={handleVaciar} >Vaciar Carrito</button> */}
      {/* <Link to="/checkout"> <button className="btn btn-primary"> Finalizar Compra </button></Link> */}
        </div>
      </> :
      <h2>El Carrito esta vacio</h2>
      }
    </div>
  );
};

export default Carrito;
