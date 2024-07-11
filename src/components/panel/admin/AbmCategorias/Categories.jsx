import React, { useState, useEffect } from "react";
import axios from "axios";
import "./categorias.css";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  

  console.log("Categorias");
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameCategorys.php"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        "https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/addCategory.php",
        {
          categoryname: categoryName,
          categorydescription: categoryDescription,
        }
      );
      if (response.data.success) {
        fetchCategories();
        setCategoryName("");
        setCategoryDescription("");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = async () => {
    try {
      const response = await axios.put(
        "https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/updateCategory.php",
        {
          id: editingCategory.id,
          categoryname: categoryName,
          categorydescription: categoryDescription,
        }
      );
      if (response.data.success) {
        fetchCategories();
        setCategoryName("");
        setCategoryDescription("");
        setEditingCategory(null);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/deleteCategory.php?id=${id}`);
      if (response.data.success) {
        fetchCategories();
      }
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      handleEditCategory();
    } else {
      handleAddCategory();
    }
  };

  const startEditing = (category) => {
    setEditingCategory(category);
    setCategoryName(category.categoryname);
    setCategoryDescription(category.categorydescription);
  };

  return (
    <div>
      <h1 className="h2">ABM Categorías</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre de la Categoría</label>
          <input
            className="form-input"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Descripción de la Categoría</label>
          <input
            className="form-input"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            required
          ></input>
        </div>
        <button className="button" type="submit">
          {editingCategory ? "Actualizar Categoría" : "Agregar Categoría"}
        </button>
      </form>

      <h2 className="h2">Listado de Categorías</h2>
      <ul className="ul">
  {categories.map((category) => (
    <li className="li" key={category.id}>
      <div className="category-info">
        <strong>{category.categoryname}</strong> - {category.categorydescription}
      </div>
      <div>
        <button className="button" onClick={() => startEditing(category)}>
          Editar
        </button>
        <button className="button-delete" onClick={() => handleDeleteCategory(category.id)}>
          Eliminar
        </button>
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Categories;
