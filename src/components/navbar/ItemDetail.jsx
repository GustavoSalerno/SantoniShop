import { useContext, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";
// import ItemListContainer from './ItemListContainer'

const ItemDetail = ({ item }) => {
  const [cantidad, setCantidad] = useState(1);
  const { carrito, agregarAlCarrito } = useContext(CartContext);
  const handleSumar = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);
  };
  console.log(carrito);


  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };
  return (
    <div className="container">
      <div className="producto-detalle">
        <img src={item.imagen} alt={item.titulo} />
        <div>
          <h3 className="titulo">{item.titulo}</h3>
          <p className="descripcion">Descripcion: {item.descripcion}</p>
          <p className="categoria">Categoria: {item.categoria}</p>
          <p className="precio">Precio: {item.precio}</p>
          <ItemCount
            cantidad={cantidad}
            handleRestar={handleRestar}
            handleAgregar={() => {agregarAlCarrito(item,cantidad)}}
            handleSumar={handleSumar}
          />
        </div>
      </div>
      {/* <ItemListContainer /> */}
    </div>
  );
};

export default ItemDetail;
