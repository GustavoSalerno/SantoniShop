import { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    const fetchData = async () => {  // Quitar el parámetro 'id' de la función fetchData
      try {
        const url = `https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos_porId.php?id=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        //console.log(data);
        if (data && data[0]) {  // Verificar si data no está vacío y tiene al menos un elemento
          setItem(data[0]);  // Asumir que data es un array con un objeto y tomar el primer elemento
        } else {
          console.error("Datos no válidos recibidos:", data);
        }
      } catch (error) {
        console.error('Error al obtener los documentos:', error);
      }
    };

    if (id) {  // Verificar que id no sea null o undefined
      fetchData();
    }
  }, [id]);

  return (
    <div>
      {item ? (
        <ItemDetail item={item} />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ItemDetailContainer;
