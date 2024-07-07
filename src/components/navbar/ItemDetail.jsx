import { useContext, useState } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

const ItemDetail = ({ item }) => {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);

  const handleSumar = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);

  };
console.log(item)
  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };
  const image = `../assets/productimages/${item.id}/${item.productimage1}`
  // console.log(image)
  // console.log(item)
  return (
    <div className="container">
      <div className="producto-detalle">
      <img src={image} alt={item.productname} />

        <div>
          <p className="descripcion">Descripción: {item.categorydescription}</p>
          <p className="categoria">Categoria: {item.categoryname}</p>
          <p className="precio">Precio: {item.productprice}</p>
          <ItemCount
            cantidad={cantidad}
            handleRestar={handleRestar}
            handleAgregar={() => { agregarAlCarrito(item, cantidad) }}
            handleSumar={handleSumar}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
