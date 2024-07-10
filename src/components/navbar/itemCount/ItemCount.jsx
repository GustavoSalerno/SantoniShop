
import './itemCount.css'


const ProductComponent = ({ cantidad, handleRestar, handleSumar, handleAgregar }) => {
  return (
    <div className="product-container">
      <div className="product-quantity-container">
        <button className="quantity-button" onClick={handleRestar}>-</button>
        <p className="quantity-text">{cantidad}</p>
        <button className="quantity-button" onClick={handleSumar}>+</button>
      </div>
      <button className='add-to-cart' onClick={handleAgregar}>Agregar al carrito</button>
    </div>
  )
}

export default ProductComponent;
