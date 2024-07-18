import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';  // Asegúrate de crear este archivo para el estilo
import { ListaOrden } from './ListaOrden';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const [usuarios, setUsuarios] = useState([]);
 console.log(usuarios)

    const [productos, setProductos] = useState([]);
    const [estados, setEstados] = useState([]);
    const [detalleOrden, setDetalleOrden] = useState([]);
    const [idOrden, setIdOrden] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_orders.php');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        
        const fetchStatusOrders = async () => {
            try {
                const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_statusOrders.php');
                setEstados(response.data);
            } catch (error) {
                console.error('Error fetching status orders:', error);
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
                const response = await axios.post('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_users_by_id.php');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchOrders();
        fetchStatusOrders();
        fetchProducts();
        fetchUsers();
    }, []);

    // const getEstadoNameById = (estadoId) => {
    //     const estado = estados.find((estado) => estado.id === estadoId);
    //     return estado ? estado.nombre_estado : 'Estado no encontrado';
    // };

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const fetchOrdersList = async (id) => {
        try {
            const response = await axios.get(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_detalles_orden.php?id=${id}`);
            setDetalleOrden(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleDetalles = (id) => {
        fetchOrdersList(id);
        setIdOrden(id);
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/update_order_status.php`, {
                id: orderId,
                estado: newStatus
            });
            // Actualiza el estado localmente después de una actualización exitosa
            setOrders(orders.map(order => 
                order.id === orderId ? { ...order, estado: newStatus } : order
            ));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="orders-container">
            <h2>Gestión de Órdenes</h2>
            {orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>ID de Orden</th>
                            <th>Cliente</th>
                            <th>N° de compra</th>
                            <th>Fecha</th>
                            <th>Estado de pedido</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((orden) => (
                            <tr key={orden.id}>
                                <td>{orden.id}</td>
                                <td>{orden.nombre}</td>
                                <td>{orden.detalle_orden_id}</td>
                                <td>{formatearFecha(orden.fechaorden)}</td>
                                <td>
                                    <select 
                                        value={orden.estado} 
                                        onChange={(e) => handleStatusChange(orden.id, e.target.value)}
                                    >
                                        {estados.map((estado) => (
                                            <option key={estado.id} value={estado.id}>
                                                {estado.nombre_estado}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => handleDetalles(orden.id)}>Ver Detalles</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay órdenes disponibles</p>
            )}
            <ListaOrden detalleOrden={detalleOrden} productos={productos} idOrden={idOrden}/>
        </div>
    );
};

export default Orders;
