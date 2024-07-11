import React, { useState, useEffect } from "react";
import axios from "axios";
import "./subcategorias.css";

const Categories = () => {
  const [subcategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  useEffect(() => {
    fetchCategoriesAndSubCategories();
  }, []);

  const fetchCategoriesAndSubCategories = async () => {
    try {
      const [categoriesResponse, subcategoriesResponse] = await Promise.all([
        axios.get("https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameCategorys.php"),
        axios.get("https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameSubCategorys.php")
      ]);
      setCategories(categoriesResponse.data);
      setSubCategories(subcategoriesResponse.data);
    } catch (error) {
      console.error("Error fetching categories and subcategories:", error);
    }
  };

  const handleAddSubCategory = async () => {
    if (!subcategoryName || !categoryId) {
      console.error('Both category name and description are required.');
      return;
    }
    try {
      const response = await axios.post(
        "https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/addSubCategory.php",
        {
          subcategory: subcategoryName,
          categoryid: categoryId,
        }
      );
      if (response.data) {
        fetchCategoriesAndSubCategories();
        setSubcategoryName("");
        setCategoryId("");
      }
    } catch (error) {
      console.error("Error adding subcategory:", error);
    }
  };

  const handleEditSubCategory = async () => {
    try {
      const response = await axios.put(
        "https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/updateSubCategory.php",
        {
          id: editingSubCategory.id,
          subcategory: subcategoryName,
          categoryid: categoryId,
        }
      );
      if (response.data.success) {
        fetchCategoriesAndSubCategories();
        setSubcategoryName("");
        setCategoryId("");
        setEditingSubCategory(null);
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  const handleDeleteSubCategory = async (id) => {
    try {
      const response = await axios.delete(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/deleteSubCategory.php?id=${id}`);
      if (response.data) {
        fetchCategoriesAndSubCategories();
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSubCategory) {
      handleEditSubCategory();
    } else {
      handleAddSubCategory();
    }
  };

  const startEditing = (subcategory) => {
    setEditingSubCategory(subcategory);
    setSubcategoryName(subcategory.subcategory);
    setCategoryId(subcategory.categoryid);
  };

  const getCategoryNameById = (id) => {
    const category = categories.find(category => category.id === id);
    return category ? category.categoryname : 'Categoría desconocida';
  };

  return (
    <div>
      <h1 className="h2">ABM Subcategorías</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Nombre de la Subcategoría</label>
          <input
            className="form-input"
            type="text"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Categoría</label>
          <select
            className="form-input"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryname}
              </option>
            ))}
          </select>
        </div>
        <button className="button" type="submit">
          {editingSubCategory ? "Actualizar Subcategoría" : "Agregar Subcategoría"}
        </button>
      </form>

      <h2 className="h2">Listado de Subcategorías</h2>
      <ul className="ul">
        {subcategories.map((subcategory) => (
          <li className="li" key={subcategory.id}>
            <div className="category-info">
            <strong>{subcategory.subcategory}</strong>
              <strong>{subcategory.subcategoryname}</strong>  {getCategoryNameById(subcategory.categoryid)}
            </div>
            <div>
              <button className="button" onClick={() => startEditing(subcategory)}>
                Editar
              </button>
              <button className="button-delete" onClick={() => handleDeleteSubCategory(subcategory.id)}>
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
