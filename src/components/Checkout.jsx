import React, { useContext, useState } from 'react';
import { CartContext } from './context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './others/firebase/Config';
import './Checkout.css'; // Asegúrate de tener estilos en este archivo

const Checkout = () => {
    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
    const { register, handleSubmit } = useForm();
    const [pedidoId, setPedidoId] = useState('');

    const comprar = (data) => {
        const pedido = {
            cliente: data,
            productos: carrito,
            total: precioTotal()
        };

        const pedidosRef = collection(db, "pedidos");
        addDoc(pedidosRef, pedido)
            .then((doc) => {
                setPedidoId(doc.id);
                vaciarCarrito();
            });
    };

    if (pedidoId) {
        return (
            <div className="container">
                <h1 className='main-title'>¡Muchas gracias por tu compra!</h1>
                <p>Tu ID de compra es: {pedidoId}</p>
            </div>
        );
    }

    return (
        <div className="container-check">
            <h1 className="main-title">Finaliza tu compra</h1>

            <div className="cart-summary">
                {carrito.length > 0 ? (
                   carrito.map((producto) => {
                    const imageUrl = `/assets/productimages/${producto.id}/${producto.productimage1}`;
                    console.log(imageUrl); // Verifica la URL en la consola
                    return (
                        <div key={producto.id} className="product-summary">
                            <img src={imageUrl} alt={producto.productname} className="product-image" />
                            <div className="product-details">
                                <h2>{producto.productname}</h2>
                                <p>Precio: ${producto.productdescription}</p>
                            </div>
                        </div>
                    );
                })
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
                <div className='final-compra'>
                <h3 className='precio2'>"detallws de la compra"</h3>
                <h3 className='precio'>Total: ${precioTotal()}</h3>
                </div>
            </div>

   
            <form className="formulario" onSubmit={handleSubmit(comprar)}>
                <input type="text" placeholder="Ingresa tu nombre" {...register("nombre")} required />
                <input type="email" placeholder="Ingresa tu email" {...register("email")} required />
                <input type="tel" placeholder="Ingresa tu teléfono" {...register("telefono")} required />
                <button className="enviar" type="submit">
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Checkout;
