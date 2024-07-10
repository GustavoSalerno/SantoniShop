// import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import CartWitdge from './cartwidtge/CartWitdge';

function Navbar() {


  return (
    <nav className='navbar' >
      <Link to="/" className='logo' ><h1 >Casa Santoni</h1></Link>
      <ul className='menu' >
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
