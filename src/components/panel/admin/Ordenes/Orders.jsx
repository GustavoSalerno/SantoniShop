import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';  // Asegúrate de crear este archivo para el estilo

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_orders.php');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos.php');
                setProductos(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_users_by_id.php');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchOrders();
        fetchProducts();
        fetchUsers();
    }, []);

    const getProductNameById = (productId) => {
        const product = productos.find((producto) => producto.id.toString() === productId);
        console.log(product)
        return product ? product.productname : 'Producto no encontrado';
    };

    const getUserNameById = (userId) => {
        const user = usuarios.find((user) => user.id === userId);
        return user ? user.name : 'Usuario no encontrado';
    };

    return (
        <div className="orders-container">
            <h2>Gestión de Órdenes</h2>
            {orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ID de Orden</th>
                            <th>Nombre del Producto</th>
                            <th>Cantidad del Producto</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Estado de pedido</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((orden) => (
                            <tr key={orden.id}>
                                <td>{orden.id}</td>
                                <td>{getProductNameById(orden.productid)}</td>
                                <td>{orden.quantity}</td>
                                <td>{getUserNameById(orden.userid)}</td>
                                <td>{orden.orderdate}</td>
                                <td>{orden.orderstatus}</td>
                                <td>{}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay órdenes disponibles</p>
            )}
        </div>
    );
};

export default Orders;
