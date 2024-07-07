import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";
import "./styles.css";

const ItemListContainer = () => {
  const [titulo, setTitulo] = useState("Productos");
  const [productos, setProductos] = useState([]);
  const { categoria } = useParams();
console.log(categoria)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos_por_categoria.php`;

        // Construir la URL con el parámetro de categoría si existe
        if (categoria) {
          url += `?categoria=${categoria}`;
          setTitulo(categoria);
        } else {
          setTitulo('Todos los productos');
        }

        console.log(`Fetching data from: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setProductos(data);  // Asumiendo que `data` es un array de productos
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    };

    fetchData();
  }, [categoria]);

  return (
    <div>
      <ItemList productos={productos} titulo={titulo} />
    </div>
  );
};

export default ItemListContainer;
