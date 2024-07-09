import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";

const ItemListContainer = () => {
  const [titulo, setTitulo] = useState("Productos");
  const [productos, setProductos] = useState([]);
  const { idcategoria } = useParams();
console.log(idcategoria)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos_por_categoria.php`;

        // Construir la URL con el parámetro de categoría si existe
        if (idcategoria) {
          url += `?categoria=${idcategoria}`;
        } else {
          setTitulo('Todos los productos');
        }

        console.log(`Fetching data from: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProductos(data); // Asumiendo que `data` es un array de productos
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    };

    fetchData();
  }, [idcategoria]);

  return (
    <div style={{marginLeft: '16%', maxWidth:'100%'}}>
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListContainer;
