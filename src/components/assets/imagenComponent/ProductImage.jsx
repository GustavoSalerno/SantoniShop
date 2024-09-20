import React from 'react';
import './ProductImage.css'

const ProductoImagen = ({ producto , clas = null }) => {
    // const imagePath = `../../../assets/productimages/${producto.id}/${producto.productimage1}`; 
    const imagePath = `../../../public/assets/productimages/${producto.id}/${producto.productimage1}`;
    

if (clas!=null){
    clas = 'image-container-list'
}

    return (
        <div >
            <img src={imagePath} alt={producto.productname} className={clas} />
        </div>
    );
};

export default ProductoImagen;
