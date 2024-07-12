import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css';
import ProductList from './ProductsList';

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productCompany, setProductCompany] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productPriceBeforeDiscount, setProductPriceBeforeDiscount] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImages, setProductImages] = useState([null, null, null]);
  const [shippingCharge, setShippingCharge] = useState('');
  const [productAvailability, setProductAvailability] = useState('In Stock');
  const [stock, setStock] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
const [productimage1, setProductImage1] = useState('');
const [productimage2, setProductImage2] = useState('');
const [productimage3, setProductImage3] = useState('');
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameCategorys.php');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setErrorMessage('Error fetching categories');
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/getNameSubCategorysById.php?id=${categoryId}`);
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      setErrorMessage('Error fetching subcategories');
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchSubCategories(categoryId);
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleImageChange = (index, file) => {
    setProductImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubCategory);
    formData.append('productname', productName);
    formData.append('productcompany', productCompany);
    formData.append('productprice', productPrice);
    formData.append('productpricebeforediscount', productPriceBeforeDiscount);
    formData.append('productdescription', productDescription);
    formData.append('shippingcharge', shippingCharge);
    formData.append('productavailability', productAvailability);
    formData.append('stock', stock);
    productImages.forEach((image, index) => {
      if (image) {
        formData.append(`productimage${index + 1}`, image);
      }
    });

    try {
      const response = await axios.post('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/addProduct.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      if (response.data) {
        setSelectedCategory('');
        setSelectedSubCategory('');
        setProductName('');
        setProductCompany('');
        setProductPrice('');
        setProductPriceBeforeDiscount('');
        setProductDescription('');
        setProductImages([null, null, null]);
        setShippingCharge(0);
        setProductAvailability('In Stock');
        setStock(5);
        setSuccessMessage('Producto agregado correctamente');
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Error al agregar el producto');
      setSuccessMessage('');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setSelectedCategory(product.category);
    setSelectedSubCategory(product.subcategory);
    setProductName(product.productname);
    setProductCompany(product.productcompany);
    setProductPrice(product.productprice);
    setProductPriceBeforeDiscount(product.productpricebeforediscount);
    setProductDescription(product.productdescription);
    setShippingCharge(product.shippingcharge);
    setProductAvailability(product.productavailability);
    setStock(product.stock);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', editingProduct.id);
    formData.append('category', selectedCategory);
    formData.append('subcategory', selectedSubCategory);
    formData.append('productname', productName);
    formData.append('productcompany', productCompany);
    formData.append('productprice', productPrice);
    formData.append('productpricebeforediscount', productPriceBeforeDiscount);
    formData.append('productdescription', productDescription);
    formData.append('shippingcharge', shippingCharge);
    formData.append('productavailability', productAvailability);
    formData.append('stock', stock);
    productImages.forEach((image, index) => {
      if (image) {
        formData.append(`productimage${index + 1}`, image);
      }
    });

    try {
      const response = await axios.put('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/updateProduct.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setEditingProduct(null);
        setSelectedCategory('');
        setSelectedSubCategory('');
        setProductName('');
        setProductCompany('');
        setProductPrice('');
        setProductPriceBeforeDiscount('');
        setProductDescription('');
        setProductImages([null, null, null]);
        setShippingCharge(0);
        setProductAvailability('In Stock');
        setStock(5);
        setSuccessMessage('Producto actualizado correctamente');
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Error al actualizar el producto');
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <div className='container-pro'>
        <h1 className="h2">{editingProduct ? 'Editar Producto' : 'Crear Producto'}</h1>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className="form" onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
          <div className="form-group">
            <label className="form-label">Categoría</label>
            <select
              className="form-input"
              value={selectedCategory}
              onChange={handleCategoryChange}
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

          <div className="form-group">
            <label className="form-label">Subcategoría</label>
            <select
              className="form-input"
              value={selectedSubCategory}
              onChange={(e) => handleInputChange(e, setSelectedSubCategory)}
              required
            >
              <option value="">Selecciona una subcategoría</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.subcategory}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Nombre del Producto</label>
            <input
              className="form-input"
              type="text"
              value={productName}
              onChange={(e) => handleInputChange(e, setProductName)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Compañía del Producto</label>
            <input
              className="form-input"
              type="text"
              value={productCompany}
              onChange={(e) => handleInputChange(e, setProductCompany)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Precio del Producto</label>
            <input
              className="form-input"
              type="number"
              value={productPrice}
              onChange={(e) => handleInputChange(e, setProductPrice)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Precio Antes de Descuento</label>
            <input
              className="form-input"
              type="number"
              value={productPriceBeforeDiscount}
              onChange={(e) => handleInputChange(e, setProductPriceBeforeDiscount)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción del Producto</label>
            <textarea
              className="form-input"
              value={productDescription}
              onChange={(e) => handleInputChange(e, setProductDescription)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Imagen 1 del Producto</label>
            <input
              className="form-input"
              type="file"
              value={productimage1}
              onChange={(e) => handleImageChange(0, e.target.files[0])}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imagen 2 del Producto</label>
            <input
              className="form-input"
              type="file"
              value={productimage2}
              onChange={(e) => handleImageChange(1, e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Imagen 3 del Producto</label>
            <input
              className="form-input"
              type="file"
              value={productimage3}
              onChange={(e) => handleImageChange(2, e.target.files[0])}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Costo de Envío</label>
            <input
              className="form-input"
              type="number"
              value={shippingCharge}
              onChange={(e) => handleInputChange(e, setShippingCharge)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Disponibilidad del Producto</label>
            <input
              className="form-input"
              type="text"
              value={productAvailability}
              onChange={(e) => handleInputChange(e, setProductAvailability)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Stock</label>
            <input
              className="form-input"
              type="number"
              value={stock}
              onChange={(e) => handleInputChange(e, setStock)}
              required
            />
          </div>

          <button className="form-button" type="submit">{editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}</button>
        </form>
      </div>
      <br />
      <ProductList onEditProduct={handleEditProduct} />
    </div>
  );
};

export default CreateProduct;
