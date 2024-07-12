import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Products from "./AbmProductos/Products";
import Categories from "./AbmCategorias/Categories";
import SubCategories from "./AbmSubCategorias/SubCategories";
import Orders from "./Ordenes/Orders";
import "./AdminPanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h3 style={{ textAlign: "center" }}>
        Bienvenido al Panel Administrativo
      </h3>
      <nav className="admin-nav">
        <ul>
          <li>
            <Link to="/admin/products">Productos</Link>
          </li>
          <li>
            <Link to="/admin/categories">Categorías</Link>
          </li>
          <li>
            <Link to="/admin/subcategories">Subategorías</Link>
          </li>
          <li>
            <Link to="/admin/orders">Órdenes</Link>
          </li>
        </ul>
      </nav>
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<div><h2 className="h2">Hola señor, que desea realizar?</h2> <br /> <hr /><h1 className="h2"><strong>Porximamente dashboard de tienda</strong></h1></div>}/>
          <Route path="/products" element={<Products />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/subcategories" element={<SubCategories />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
