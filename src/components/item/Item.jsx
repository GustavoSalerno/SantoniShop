import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProductById } from '../utils/endpoints'
import './item.css'
const Item = ({ producto, idCategoria }) => {
  // //console.log(producto); // Para verificar que producto es un objeto correcto
  const [nombreCategoria, setNombreCategoria ] = useState('');
  
  console.log(nombreCategoria)
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(idCategoria);
        //console.log()
        setNombreCategoria(data.categoryname);
        // setSelectedImage(data.images[0]);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
    
    loadProduct();
  }, [idCategoria]);
  
  return (
    producto && (
      <div className="producto">
        <Link className="" to={`/item/${producto.id}`}>
        <div className="producto-image-container">
        <img src={`../../assets/productimage/${producto.id}/${producto.productimage1}`} alt={producto.productname} />
        </div>
        </Link>
        <div className="producto-info">
        <h4 className="producto-name">{producto.productname}</h4>
        <p className="producto-price"><del style={{color:'red'}}>Antes: {producto.productpricebeforediscount}</del></p>
        <p className="producto-price" style={{color:'green'}}>Precio: ${producto.productprice}</p>
        {/* <p className="producto-price">Stock:{producto.stock}</p> */}
          {/* ver más */}
        </div>
        </div>
    )
  );
};

export default Item;
