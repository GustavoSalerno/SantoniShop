import "./App.css";
// import Pokemon from './components/fetch/Pokemon';
// import PokemonList from './components/fetch/PokemonList';
// import Counter  from './components/Counter';
// import Tet  from './components/Te44xt';
// import ContactoIntermedio from "./components/navbar/ContactoIntermedio";
import Navbar from "./components/navbar/Navbar";
import ItemListContainer from "./components/itemList/ItemListContainer";
import ItemDetailContainer from "./components/itemDetail/ItemDetailContainer"
// import Myp  from './components/Myp';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nosotros from "./components/Nosotros";
import ContactoAvanzado from "./components/ContactoAvanzado";

import {  CartProvider } from "./components/context/CartContext";
import Carrito from "./components/Carrito";
import Checkout from "./components/Checkout";
// import Aside from "./components/aside/Aside";
import './App.css'
import { ImageCarousel } from "./components/carousel/ImageCarousel";
import SearchResultsPage from "./components/seach/SearchResultsPage";
import Footer from "./components/footer/Footer";
import ProductCarousel from "./components/carouselProd/ProductCarousel";

// import { Contacto } from "./components/navbar/ContactoSimple";
function App() {


  return (
    <div>
     <CartProvider>
      <BrowserRouter>

        <ImageCarousel />
        <Navbar />
        <div className="main-layout">
      
        {/* <ProductCarousel titulo={'Recomendados'}/> */}
      <div className="main-content">
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/item/:id' element={<ItemDetailContainer itemId={6} />}/>
        <Route path='/productos'element={<ItemListContainer />} />
        <Route path='/productos/:idcategoria'element={<ItemListContainer />} />
        <Route path='/productos/:idcategoria?:subcategorias'element={<ItemListContainer />} />
        <Route path='/productos/:idcategoria?:subcategorias?:producto'element={<ItemListContainer />} />
        <Route path='/nosotros'element={<Nosotros />} />
        <Route path="/search/:query" element={<SearchResultsPage />} /> {/* Add the search results page route */}

        {/* <Route path='/contacto'element={<ContactoIntermedio />} /> */}
        <Route path='/contacto'element={<ContactoAvanzado />} />
        <Route path='/carrito'element={<Carrito />} />
        <Route path='/checkout'element={<Checkout />} />
        </Routes>  
        </div>
        </div>
      <Footer />
      </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
