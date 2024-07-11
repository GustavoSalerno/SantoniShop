import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Products from './AbmProductos/Products';
import Categories from './AbmCategorias/Categories';
import Orders from './Ordenes/Orders';
import './AdminPanel.css';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<h3>Bienvenido al Panel Administrativo</h3>} />
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/products">Productos</Link></li>
          <li><Link to="/admin/categories">Categorías</Link></li>
          <li><Link to="/admin/orders">Órdenes</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;
