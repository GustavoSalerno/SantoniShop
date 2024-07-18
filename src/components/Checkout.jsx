import React, { useContext, useState } from 'react';
import { CartContext } from './context/CartContext';
import { useForm } from 'react-hook-form';
import './Checkout.css'; // Asegúrate de tener estilos en este archivo

const Checkout = () => {
    const { carrito, precioTotal, vaciarCarrito } = useContext(CartContext);
    const { register, handleSubmit } = useForm();
    const [pedidoId, setPedidoId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const comprar = async (data) => {
        setIsSubmitting(true);
        
        // Preparar los datos del formulario y los productos
        const orderData = {
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono,
            dni: data.dni,
            estado: 1, // Asigna el estado inicial que corresponda
            productos: carrito.map(producto => ({
                id: producto.id,
                cantidad: producto.cantidad
            }))
        };
    console.log(orderData)
        try {
            const response = await fetch('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/addOrden.php', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(orderData) // Convertir a JSON
            });
    
            console.log(response);
            const result = await response.json();
    
            if (result.success) {
                setPedidoId(result.pedidoId);
                vaciarCarrito();
            } else {
                console.error('Error:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (pedidoId) {
        return (
            <div className="container">
                <h1>¡Muchas gracias!</h1>
                <br />
                <h2>Tu ID de compra es: {pedidoId}</h2>
                <h3>A la brevedad un representante se comunicar con usted.</h3>
                
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
                        return (
                            <div key={producto.id} className="product-summary">
                                <img src={imageUrl} alt={producto.productname} className="product-image" />
                                <div className="product-details">
                                    <h2>{producto.productname}</h2>
                                    <div>
                                        <p>Cantidad: {producto.cantidad}</p>
                                        <p>Precio: ${producto.productprice}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>No hay productos en el carrito.</p>
                )
            }
            
                <div className='final-compra'>
                    <h3 className='precio2'>Complete los campos</h3>
                    <h3 className='precio'>Total: ${precioTotal()}</h3>
                </div>

            </div>
            <form className="formulario" onSubmit={handleSubmit(comprar)}>
                <input type="text" placeholder="Ingresa tu nombre" {...register("nombre")} required />
                <input type="email" placeholder="Ingresa tu email" {...register("email")} required />
                <input type="text" placeholder="Ingresa tu DNI" {...register("dni")} required />
                <input type="tel" placeholder="Ingresa tu teléfono" {...register("telefono")} required />
                <button className="enviar" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
            
        </div>
    );
};

export default Checkout;
