import { Link } from "react-router-dom"
const Item = ({producto}) => {
    
  return (
    
    <div className="producto">
        <img src={producto.imagen} alt={producto.titulo} />
        <h4>{producto.titulo}</h4>
        <p>Precio: {producto.precio}</p>
        <p>Categoria: {producto.categoria}</p>
        {/* <p>{producto.descripcion}</p> */}
        <Link className="ver-mas" to={`/item/${producto.id}`}>ver mas</Link>
    </div>
    
  )
}

export default Item
