import React, { useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import CartWitdge from '../cartwidtge/CartWitdge';
import CategorySelect from '../aside/CategorySelect';
import Logo from '../logo.jpg';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <nav className='navbar'>
      <Link to="/" className='logo'>
        <img src={Logo} alt="logo" className="navbar-logo" />
      </Link>
      <form className='search-bar' onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className='search-input'
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className='search-button'>Buscar</button>
      </form>
      <ul className='menu'>
        <li className='menu-link'><Link to="/">Inicio</Link></li>
        <li className='menu-link'><Link to="/productos">Productos</Link></li>
        <li className="menu-link">
          <CategorySelect />
        </li>
        <li className='menu-link'><Link to="/nosotros">Nosotros</Link></li>
        <li className='menu-link'><Link to="/contacto">Contacto</Link></li>
        <li className='cart-widget'><CartWitdge /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
