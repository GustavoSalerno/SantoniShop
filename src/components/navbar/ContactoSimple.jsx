import React, { useState } from "react";

export const Contacto = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviado");
  };
const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  
  const handleNombre = (e) => {
    setNombre(e.target.value) //accedo al valor del formulario
    console.log(nombre)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  
  return (
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <input 
        type="text" 
        placeholder="Ingresa tu nombre" 
        value={nombre}
        onChange={handleNombre}
        />
        {nombre}
        <input type="email" placeholder="Ingresa tu mail" 
          value={email}
          onChange={handleEmail}/>
        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};
