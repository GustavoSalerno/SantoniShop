import React, { useState, useContext } from 'react';
import { CartContext } from '../../../context/CartContext';
import './Invoice.css';

const Invoice = () => {
    const { carrito, precioTotal } = useContext(CartContext);
    const [cliente, setCliente] = useState({
        nombre: '',
        email: '',
        telefono: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío de la factura a tu backend
        console.log('Cliente:', cliente);
        console.log('Productos:', carrito);
        console.log('Total:', precioTotal());
    };

    return (
        <div className="invoice-container">
            <h1>Emitir Factura</h1>
            <form className="invoice-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        value={cliente.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={cliente.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input 
                        type="tel" 
                        id="telefono" 
                        name="telefono" 
                        value={cliente.telefono} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="submit-button">Emitir Factura</button>
            </form>
            <div className="invoice-summary">
                <h2>Resumen de la Factura</h2>
                {carrito.length > 0 ? (
                    carrito.map((producto) => (
                        <div key={producto.id} className="product-summary">
                            <img 
                                src={`/assets/productimages/${producto.id}/${producto.productimage1}`} 
                                alt={producto.productname} 
                                className="product-image" 
                            />
                            <div className="product-details">
                                <h3>{producto.productname}</h3>
                                <p>Precio: ${producto.productprice}</p>
                                <p>Cantidad: {producto.cantidad}</p>
                                <p>Subtotal: ${producto.productprice * producto.cantidad}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay productos en el carrito</p>
                )}
                <h2>Total: ${precioTotal()}</h2>
            </div>
        </div>
    );
};

export default Invoice;
