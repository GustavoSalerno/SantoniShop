import Item from "../item/Item"
import { toCapital } from "../helpers/toCapital"

import './itemlist.css'
// import ProductCarousel from "../carouselProd/ProductCarousel"
const ItemList = ({productos, titulo}) => {
  //console.log(productos)
    return (
    <div className="container">
      <h2 className="main-title">{toCapital(titulo)}</h2>
      {/* <ProductCarousel productos={productos}></ProductCarousel> */}
      <div className="productos">
        {productos && 
            productos.map((producto) =>  <Item producto={producto} key={producto.id} idCategoria={producto.category} stock ={producto.stock}/>)
        }
      </div>
    </div>
  )
}

export default ItemList
