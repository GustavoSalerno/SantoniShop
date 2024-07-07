import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'
import CartWitdge from './CartWitdge'
function Navbar() {
  return (
    <nav className='navbar' style={{marginBottom: '15px'}}>
        <Link href="/" className='logo'><h1>SantoniShop</h1></Link>
        <ul className='menu'>
            <li className='menu-link'><Link to="/">inicio</Link></li>
            <li className='menu-link'><Link to="/productos">productos</Link></li>
            {/* <li className='menu-link'><Link to="/productos/Pantalones">Pantalones</Link></li>
            <li className='menu-link'><Link to="/productos/Technology">Technology</Link></li>
            <li className='menu-link'><Link to="/productos/Public Utilities">Public Utilities</Link></li>*/}
            <li className='menu-link'><Link to="/productos/Buzos">Buzos</Link></li> 
            <li className='menu-link'><Link to="/productos/Pantalones">Nosotros</Link></li>
            <li className='menu-link'><Link to="/contacto">Contacto</Link></li>
            <li><CartWitdge /></li>
        </ul>
    </nav>
  )
}

export default Navbar