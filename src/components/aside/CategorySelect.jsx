import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CategorySelect.css';

const CategorySelect = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

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

  const handleChange = (event) => {
    const categoryId = event.target.getAttribute('data-id');
    if (categoryId) {
      navigate(`/productos/${categoryId}`);
    }
  };

  return (
    <div className="category-select">
      <div className="category-button">Categorías</div>
      <div className="category-dropdown">
        {categorias.map((categoria) => (
          <div key={categoria.id} data-id={categoria.id} onClick={handleChange} className="category-option">
            {categoria.categoryname}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelect;
