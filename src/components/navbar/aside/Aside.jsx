import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Aside.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Aside = () => {
  const [categorias, setCategorias] = useState([]);
  const [subCategorias, setSubCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameCategorys.php');
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          console.error("Error fetching categories:", data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (categoriaSeleccionada) {
      const fetchSubCategorias = async () => {
        try {
          const response = await fetch(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameSubCategorysById.php?id=${categoriaSeleccionada}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setSubCategorias(data);
          } else {
            console.error("Error fetching subcategories:", data);
          }
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      };

      fetchSubCategorias();
    }
  }, [categoriaSeleccionada]);
  

  return (
    <aside className="categories-aside">
      <h2>Categorías</h2>
      <ul className="list-group">
        {categorias.map((categoria) => (
          <li 
            key={categoria.id} 
            className={`list-group-item ${categoriaSeleccionada === categoria.id ? 'active' : ''}`}
            onClick={() => setCategoriaSeleccionada(categoria.id)}
          >
            <Link to={`/productos/${categoria.id}`}>{categoria.categoryname}</Link>
          </li>
        ))}
      </ul>
      {categoriaSeleccionada && (
        <div className="subcategories">
          <h3>Subcategorías</h3>
          <ul className="list-group">
            {subCategorias.map((subCategoria) => (
              <li key={subCategoria.id} className='list-group-item'>
                <Link to={`/productos/${subCategoria.id}`}>{subCategoria.subcategory}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Aside;
