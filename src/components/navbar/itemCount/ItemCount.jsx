
import './itemCount.css'
const ItemCount = ({cantidad, handleRestar, handleSumar, handleAgregar}) => {

   
  return (
    <div>
        <div className="product-quantity-container">
            <button onClick={handleRestar}>-</button>
            <p>{cantidad}</p>
            <button onClick={handleSumar}>+</button>
        </div>
        <button className='add-to-cart' onClick={handleAgregar}>Agregar al carrito</button>
    </div>
  )
}

export default ItemCount