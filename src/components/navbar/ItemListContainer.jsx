import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/Config";
import ItemList from "./ItemList";
import "./styles.css";

const ItemListContainer = () => {
  const [titulo, setTitulo] = useState("Productos");
  const [productos, setProductos] = useState([]);
  const { categoria } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRef = collection(db, "productos");
        let q;

        if (categoria) {
          q = query(productosRef, where("categoria", "==", categoria));
          setTitulo(categoria)
        } else {
            q = query(productosRef); // Sin filtro de categoría
            
        }
        console.log(categoria)
        const resp = await getDocs(q);
        setProductos(
          resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error al obtener los documentos: ", error);
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
