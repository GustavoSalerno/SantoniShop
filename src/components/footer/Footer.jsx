import React from "react";
import { Link } from "react-router-dom";
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3 className="footer-title">Sobre nosotros</h3>
          <p className="footer-text">
            Somos una tienda dedicada a ofrecer los mejores productos a nuestros clientes.
            Nuestro objetivo es brindar calidad y satisfacción.
          </p>
        </div>

        <div className="footer-section links">
          <h3 className="footer-title">Enlaces rápidos</h3>
          <ul className="footer-links">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/about">Sobre nosotros</Link></li>
            <li><Link to="/shop">Tienda</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3 className="footer-title">Síguenos</h3>
          <div className="footer-social-links">
            <a href="https://www.facebook.com/casasantoni.tienda" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" /> 
            </a>
            <a href="https://www.instagram.com/casa.santoni/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" /> 
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Casa Santoni. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
