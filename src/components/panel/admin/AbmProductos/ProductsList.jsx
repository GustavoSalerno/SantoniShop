import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productsList.css';
import Swal from 'sweetalert2';
import ProductoImagen from '../../../assets/imagenComponent/ProductImage';

const ProductList = ({ onEditProduct }) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteProduct(id);
        Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
      }
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos.php');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Error fetching products');
    }
  };

  const handleDeleteProduct = async (productId) => {
    
    try {
      const response = await axios.delete(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/deleteProduct.php?id=${productId}`);
      if (response.data.success) {
        setProducts(products.filter((product) => product.id !== productId));
        setSuccessMessage('Producto eliminado correctamente');
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage('Error al eliminar el producto');
      setSuccessMessage('');
    }
  };


  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Compañía</th>
            <th>Precio</th>
            <th>Disponibilidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td className='image-container-list'>
               <ProductoImagen producto={product} clas={2} />
              </td>
              <td>{product.productname}</td>
              <td>{product.productcompany}</td>
              <td>{product.productprice}</td>
              <td>{product.productavailability}</td>
              <td className='actions'>
                <div className='bt'>
                <button className='button' onClick={() => onEditProduct(product)}>Editar</button>
                <button className='button-delete' onClick={() => confirmDeleteProduct(product.id)}>Eliminar</button>
                </div>
                    
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
