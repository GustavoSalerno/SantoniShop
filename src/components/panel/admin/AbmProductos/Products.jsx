import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css';
import ProductList from './ProductsList';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [shippingCharge, setShippingCharge] = useState(0);
  const [productAvailability, setProductAvailability] = useState('In Stock');
  const [stock, setStock] = useState(10);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos.php');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Error fetching products');
      }
    };
    fetchCategories();
    fetchProducts();
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
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos.php');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage('Error fetching products');
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

  const handleFormSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    const formData = new FormData();
    if (isEdit) formData.append('id', editingProduct.id);
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

    let imagesChanged = false;
    productImages.forEach((image, index) => {
      if (image) {
        formData.append(`productimage${index + 1}`, image);
        imagesChanged = true;
      }
    });

    if (isEdit && !imagesChanged) {
      formData.append('images_not_updated', 'true');
    }

    try {
      const endpoint = isEdit
        ? 'https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/updateProduct.php'
        : 'https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/abm/addProduct.php';
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        resetForm();
        setSuccessMessage(isEdit ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding/updating product:', error);
      setErrorMessage('Error al agregar/actualizar el producto');
      setSuccessMessage('');
    }
  };

  const resetForm = () => {
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
    setEditingProduct(null);
  };

  const handleCancelar = () => {
    resetForm();
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

  return (
    <div>
      <div className='container-pro'>
        <h1 className="h2">{editingProduct ? `Editar Producto id: ${editingProduct.id}` : 'Crear Producto'}</h1>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form className="form" onSubmit={(e) => handleFormSubmit(e, !!editingProduct)}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Categoría</label>
              <select
                className="form-input"
                value={selectedCategory}
                onChange={handleCategoryChange}
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
                onChange={(e) => setSelectedSubCategory(e.target.value)}
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
              />
            </div>

            <div className="form-group">
              <label className="form-label">Compañía del Producto</label>
              <input
                className="form-input"
                type="text"
                value={productCompany}
                onChange={(e) => handleInputChange(e, setProductCompany)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Precio del Producto</label>
              <input
                className="form-input"
                type="number"
                value={productPrice}
                onChange={(e) => handleInputChange(e, setProductPrice)}
              />
            </div>
            
                {/* _
            .__(.)< (GUAU) 
             \___)
             ~~~~~~~~~~~~~~ */}
            <div className="form-group">
              <label className="form-label">Precio antes de Descuento</label>
              <input
                className="form-input"
                type="number"
                value={productPriceBeforeDiscount}
                onChange={(e) => handleInputChange(e, setProductPriceBeforeDiscount)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descripción del Producto</label>
              <textarea
                className="form-input"
                value={productDescription}
                onChange={(e) => handleInputChange(e, setProductDescription)}
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Cargos de Envío</label>
              <input
                className="form-input"
                type="number"
                value={shippingCharge}
                onChange={(e) => handleInputChange(e, setShippingCharge)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Disponibilidad del Producto</label>
              <select
                className="form-input"
                value={productAvailability}
                onChange={(e) => handleInputChange(e, setProductAvailability)}
              >
                <option value="In Stock">En Stock</option>
                <option value="Out of Stock">Fuera de Stock</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Stock</label>
              <input
                className="form-input"
                type="number"
                value={stock}
                onChange={(e) => handleInputChange(e, setStock)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Imágenes del Producto</label>
              <div className="product-images">
                {[0, 1, 2].map((index) => (
                  <input
                    key={index}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
              </button>
              {editingProduct && (
                <button type="button" className="btn btn-secondary mt-3" onClick={handleCancelar}>
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ProductList onEditProduct={handleEditProduct} />
    </div>
  );
};

export default CreateProduct;
