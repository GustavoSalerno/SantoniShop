import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productsList.css';

const ProductList = ({ onEditProduct }) => {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleSeguro = (id) => {
    alert('estas seguro de eliminar el producto con id: ' + id)
    handleDeleteProduct(id)
  }
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
              <td>
                <img src={`../../../../../public/assets/productimages/${product.id}/${product.productimage1}`} alt={`../../../../../public/assets/productimages/${product.id}/${product.productimage1}`} />
              </td>
              <td>{product.productname}</td>
              <td>{product.productcompany}</td>
              <td>{product.productprice}</td>
              <td>{product.productavailability}</td>
              <td className='actions'>
                <button className='button' onClick={() => onEditProduct(product)}>Editar</button>
                <button className='button-delete' onClick={handleSeguro}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
