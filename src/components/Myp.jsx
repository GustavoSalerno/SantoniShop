import React, { useState, useEffect } from "react";
// Myp => Map y Promisses
import data from "./MOCK_D.json";

const Myp = () => {
  const [productos, setProductos] = useState([]);

  const pedirInfor = () => {
    return new Promise((res, req) => {
      res(data);
    });
  };

  useEffect(() => {
    pedirInfor().then((res) => {
      setProductos(res);
    });
  }, []);

  // const nombres = ['cristian' , 'leon', 'noah'];
  // const nombres2 = nombres.map((nombre) => nombre +1);
  // //console.log(nombres2)

  return (
    <div>
      {productos.length > 0 &&
        productos.map((producto) => {
         return(
            <div key={producto.id}>
            <p>{producto.id}</p>
            <img src={producto.img_profile} alt="" />
            <h2>{producto.first_name}</h2>
            <p>{producto.last_name}</p>
          </div>
         )
        })}
    </div>
  );
};

export default Myp;
