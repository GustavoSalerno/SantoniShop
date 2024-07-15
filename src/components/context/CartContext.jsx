import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const carritoInicial = JSON.parse(localStorage.getItem("carrito")) || [];
export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(carritoInicial);

  const agregarAlCarrito = (item, cantidad) => {
    const itemAgregado = { ...item, cantidad };
    const nuevoCarrito = [...carrito];
    const estaEnElCarro = nuevoCarrito.find(
      (producto) => producto.id === itemAgregado.id
    );
    if (estaEnElCarro) {
      estaEnElCarro.cantidad += cantidad;
    } else {
      // setCarrito([...carrito, itemAgregado]);
      nuevoCarrito.push(itemAgregado);
    }
    setCarrito(nuevoCarrito);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const cantidadEnCarrito = () => {
    return carrito.reduce((acumulador, prod) => acumulador + prod.cantidad, 0);
  };
  const precioTotal = () => {
    return carrito.reduce(
      (acumulador, prod) => acumulador + prod.productprice * prod.cantidad,0);
  };
  
  const vaciarCarrito = () => {
    setCarrito([]);
  };
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(nuevoCarrito);
  };
  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        cantidadEnCarrito,
        precioTotal,
        vaciarCarrito,
        eliminarDelCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
