import { Link } from 'react-router-dom';
import './itemCount.css';

const ProductComponent = ({ cantidad, handleRestar, handleSumar, handleAgregar }) => {
  return (
    <div>
      <div className="product-container">
        <div className="product-quantity-container">
          <button className="quantity-button" onClick={handleRestar}>-</button>
          <p className="quantity-text">{cantidad}</p>
          <button className="quantity-button" onClick={handleSumar}>+</button>
        </div>
        <button className='add-to-cart' onClick={handleAgregar}>Agregar al carrito</button>
      </div>

      <Link to={'/checkout'}> {/* Asegúrate de que la ruta sea correcta */}
        <button className='add-to-cart' onClick={() => { handleAgregar(); /* Aquí se agrega al carrito */ }}>
          Comprar
        </button>
      </Link>
    </div>
  );
}

export default ProductComponent;
