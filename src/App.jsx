import "./App.css";
// import Pokemon from './components/fetch/Pokemon';
// import PokemonList from './components/fetch/PokemonList';
// import Counter  from './components/Counter';
// import Tet  from './components/Te44xt';
// import ContactoIntermedio from "./components/navbar/ContactoIntermedio";
import Navbar from "./components/navbar/Navbar";
import ItemListContainer from "./components/navbar/itemList/ItemListContainer";
import ItemDetailContainer from "./components/navbar/itemDetail/ItemDetailContainer"
// import Myp  from './components/Myp';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nosotros from "./components/navbar/Nosotros";
import ContactoAvanzado from "./components/navbar/ContactoAvanzado";

import {  CartProvider } from "./components/context/CartContext";
import Carrito from "./components/navbar/Carrito";
import Checkout from "./components/navbar/Checkout";
import Aside from "./components/navbar/aside/Aside";


// import { Contacto } from "./components/navbar/ContactoSimple";
function App() {


  return (
    <div>
     <CartProvider>
      <BrowserRouter>

        <Navbar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/item/:id' element={<ItemDetailContainer itemId={6} />}/>
        <Route path='/productos'element={<ItemListContainer />} />
        <Route path='/productos/:idcategoria'element={<ItemListContainer />} />
        <Route path='/productos/:idcategoria?:subcategorias'element={<ItemListContainer />} />
        <Route path='/productos/:idcategoria?:subcategorias?:producto'element={<ItemListContainer />} />
        <Route path='/nosotros'element={<Nosotros />} />
        {/* <Route path='/contacto'element={<ContactoIntermedio />} /> */}
        <Route path='/contacto'element={<ContactoAvanzado />} />
        <Route path='/carrito'element={<Carrito />} />
        <Route path='/checkout'element={<Checkout />} />
        </Routes>  
      <Aside />
      </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
