import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Item = ({ producto, idCategoria }) => {
  // console.log(producto); // Para verificar que producto es un objeto correcto
  const [nombreCategoria, setNombreCategoria ] = useState('');
  // console.log(idCategoria)
  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const res = await fetch(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameCategorysById.php?id=${idCategoria}`);
        const data = await res.json();
        setNombreCategoria(data[0].categoryname || ""); // Asegúrate de que `data` tiene la estructura esperada
      } catch (error) {
        console.error("Error al obtener el nombre de la categoría:", error);
      }
    };
    fetchCategoria();
  }, [idCategoria]);
  return (
    producto && (
      <div className="producto">
        <img src={`../../assets/productimages/${producto.id}/${producto.productimage1}`} alt={producto.productname} />
        <h4>{producto.productname}</h4>
        <p>Precio: ${producto.productprice}</p>
        <p>Categoria: {nombreCategoria}</p>
        <Link className="ver-mas" to={`/item/${producto.id}`}>
          ver más
        </Link>
      </div>
    )
  );
};

export default Item;
