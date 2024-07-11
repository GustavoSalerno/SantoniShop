import { useContext, useEffect, useState } from "react";
import ItemCount from "../itemCount/ItemCount";
import { CartContext } from "../context/CartContext";
import ItemListContainer from "../itemList/ItemListContainer";
import './itemdetail.css';
import { fetchProductById } from "../utils/endpoints";
import {ImageCarousel}  from "../carousel/ImageCarousel";
import ProductCarousel from "../carouselProd/ProductCarousel";

const ItemDetail = ({ item }) => {
  const [cantidad, setCantidad] = useState(1);
  const { agregarAlCarrito } = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState('');
  const [nombreCat, setNombreCategoria] = useState('');
  const [titulo, setTitulo] = useState("Productos");
  const idSubCategoria = item.subcategory;
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/get_all_productos_por_subCategoria.php`;

        // Construir la URL con el parámetro de categoría si existe
        if (idSubCategoria) {
          url += `?categoria=${idSubCategoria}`;
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
  }, [idSubCategoria]);

  useEffect(() => {
    if (item.productimage1) {
      setSelectedImage(item.productimage1);
    }
  }, [item.productimage1]);

  const handleSumar = () => {
    cantidad < item.stock && setCantidad(cantidad + 1);
  };

  const handleRestar = () => {
    cantidad > 1 && setCantidad(cantidad - 1);
  };

  const images = [
    item.productimage1,
    item.productimage2,
    item.productimage3
  ].filter(image => image);

  const imagePath = (image) => `../../../../assets/productimages/${item.id}/${image}`;

  const idCategoria = item.subcategory;
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(idCategoria);
        console.log(data)
        setNombreCategoria(data[0].categoryname);
      } catch (error) {
        console.error('Error loading product:', error);
      }
    };
    loadProduct();
  }, [idCategoria]);

  // const formatDescription = (description) => {
  //   const regex = /<li.*?>(.*?)<\/li>/g;
  //   const matches = description.matchAll(regex);
  //   const formattedDescription = Array.from(matches).map(
  //     (match) => match[1]
  //   );
  //   return formattedDescription;
  // };

  // const formattedDescription = formatDescription(item.productdescription);

  return (
    <div>
    <div className="container">
      <div className="product-details">
        <div className="details-row">
          <div className="details-image">

            <div className="details-image-large">
              <img src={imagePath(selectedImage)} alt={item.productname} className="main-image"/>
            </div>
            <div className="details-image-thumbnails">
              <div className="thumbnail-container">
                {images.map((image, index) => (
                  <div key={index} className={`details-image-thumbnail ${selectedImage === image ? 'active' : ''}`} onClick={() => setSelectedImage(image)}>
                    <img src={imagePath(image)} alt={`${item.productname} ${index + 1}`} className="thumbnail" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="product-details-info">
            <h2 className="product-name">{item.productname}</h2>
            <p className="product-price">
              <span className="product-price-original">{item.originalPrice}</span>
              <span className="product-price-discounted">${item.productprice}</span>
            </p>
            <p className="product-availability">Availability: In Stock</p>
            <div className="details-text">
              <p className="descripcion"><strong>Descripción:</strong></p>
              {/* <ul>
                {formattedDescription.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul> */}
              <p className="categoria">Categoria: {nombreCat}</p>
            </div>
            <div className="product-quantity-container">
              <ItemCount
                cantidad={cantidad}
                handleRestar={handleRestar}
                handleAgregar={() => { agregarAlCarrito(item, cantidad) }}
                handleSumar={handleSumar}
              />
            </div>
            {/* <button className="add-to-cart" onClick={() => agregarAlCarrito(item, cantidad)}>Add to cart</button> */}
          </div>
        </div>
      </div>
    </div>
      <br />
      <br />
      <br />
      <div style={{width: '100%'}}>
      <ImageCarousel /> 
      </div>
      <br />
      {productos &&
        <ProductCarousel productos={productos} titulo={titulo}/>
      }
      <br />
      <ItemListContainer />
    </div>
  );
};

export default ItemDetail;
