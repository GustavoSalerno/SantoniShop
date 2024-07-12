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
                    carrito.map((producto) => (
                        <div key={producto.id} className="product-summary">
                          {console.log(`../../public/assets/productimages/${producto.id}/${producto.productimage1}`)}
                            <img src={`../../public/assets/productimages/${producto.id}/${producto.productimage1}`} alt={producto.productname} className="product-image" />
                            <div className="product-details">
                                <h2>{producto.productname}</h2>
                                <p>Precio: ${producto.productprice}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
                <h3>Total: ${precioTotal()}</h3>
            </div>

           <img src="../lic/assets/productimages/80/logo.jpg" width={'3000px'} alt="" />
        </div>
    );
};

export default Checkout;
