import React, { useEffect, useState } from 'react'
import generatePDF from '../pdfGenerator/PdfGenerator';
import axios from 'axios';
export const ListaOrden = ( {detalleOrden, productos, idOrden}) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);
    const [datos, setDatos] =useState([])
    useEffect(() => {
        setSelectedOrder(idOrden);
    }, [idOrden]);   
    
    
    
    
    const nombreProd = (productId) => {
        // console.log(productId)
            const estado = productos.find((product) => product.id === productId);
            return estado ? estado.productname : 'Estado no encontrado';
        };
        const precioPro = (productId) => {
            // console.log(productId)
                const estado = productos.find((product) => product.id === productId);
                return estado ? estado.productprice : 'Estado no encontrado';
            };

        const calcularTotal = () => {
            return detalleOrden.reduce((total, detalle) => total + detalle.cantidad *  precioPro(detalle.product_id), 0);
        }; 
        const fetchOrderDetails = async (orderId) => {
            try {
                const response = await axios.get(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_detalles_orden_pdf_by_id.php?id=${orderId}`);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        const fetchDatos = async () => {
            try {
                const response = await axios.get(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_datos.php`);
                setDatos(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
    
        useEffect(() => {
            if (selectedOrder) {
                fetchOrderDetails(selectedOrder);
                fetchDatos();
            }
        }, [selectedOrder]);
        const handleGeneratePDF = () => {
            if (datos && selectedOrder && detalleOrden.length > 0) {
                generatePDF(orderDetails, detalleOrden,datos);
            } else {
                alert('Selecciona una orden y asegúrate de que tenga detalles.');
            }
        };
        // console.log(calcularTotal())
  return (
    <div>
        {detalleOrden.length > 0 && (
                <div>
                    <h2 style={{textAlign: 'center'}}>Detalle de Orden <strong >{idOrden}</strong></h2>
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>ID Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unidad</th>
                                <th>Precio Compra</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalleOrden.map(detalle => (
                                <tr key={detalle.id}>
                                    <td>{nombreProd(detalle.product_id)}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>{precioPro(detalle.product_id).toFixed(2)}</td>
                                    <td>{(detalle.cantidad * precioPro(detalle.product_id)).toFixed(2)}</td>
                                </tr>
                            ))}
                                <tr>
                                <td colSpan="2">
                                    <button onClick={handleGeneratePDF}>Generar Recibo</button>
                                    </td>
                                <td colSpan="1">Total:</td>
                                <td>{calcularTotal().toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
    </div>
  )
}
