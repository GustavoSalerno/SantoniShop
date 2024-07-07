import React, { useState } from 'react'

 const ContactoIntermedio = () => {

    const [valores,setValores]= useState({
        nombre: "",
        email: "",
        telefono: ''
    })

    const handleValores = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value,
            
        })
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviado", valores);
  };
    return (
        <div className="container">
          <h1 className="main-title">Contacto</h1>
          <form className="formulario" onSubmit={handleSubmit}>
            <input 
            type="text" 
            placeholder="Ingresa tu nombre" 
            value={valores.nombre}
            onChange={handleValores}
            name='nombre'
            />
            {valores.nombre}
            <input type="email" placeholder="Ingresa tu mail" 
              value={valores.email}
              onChange={handleValores}
              name='email'/>
            <input type="telefono" placeholder="Ingresa tu telefono" 
              value={valores.telefono}
              onChange={handleValores}
              name='telefono'/>
            <button className="enviar" type="submit">
              Enviar
            </button>
          </form>
        </div>
      );
    };
    
    export default ContactoIntermedio