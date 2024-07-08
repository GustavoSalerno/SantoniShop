// import React, { useState, useEffect } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import CartWitdge from './CartWitdge';

function Navbar() {


  return (
    <nav className='navbar' style={{ marginBottom: '15px' }}>
      <Link to="/" className='logo'><h1>SantoniShop</h1></Link>
      <ul className='menu'>
        <li className='menu-link'><Link to="/">Inicio</Link></li>
        <li className='menu-link'><Link to="/productos">Productos</Link></li>
     
        <li className='menu-link'><Link to="/nosotros">Nosotros</Link></li>
        <li className='menu-link'><Link to="/contacto">Contacto</Link></li>
        <li><CartWitdge /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
