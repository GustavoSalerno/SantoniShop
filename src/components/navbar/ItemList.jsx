import Item from "./Item"
import { toCapital } from "../helpers/toCapital"


const ItemList = ({productos, titulo}) => {
  console.log(productos)
    return (
    <div className="container">
      <h2 className="main-title">{toCapital(titulo)}</h2>
      <div className="productos">
        {
            productos && productos.map((producto) => <Item producto={producto} key={producto.id}/>)
        }
      </div>
    </div>
  )
}

export default ItemList
