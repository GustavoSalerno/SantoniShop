import React from "react";
import {useForm } from 'react-hook-form'
/**
 *
 * Para utilizar este componente instale => npm install react-hook-form
 *
 */
const ContactoAvanzado = () => {
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     //console.log("enviado");
    //   };
const {register, handleSubmit} = useForm();

const enviar = (data) => {
    //console.log(data)
}
  return (
    <div className="container">
      <h1 className="main-title">Contacto</h1>
      <form className="formulario" onSubmit={handleSubmit(enviar)} >
        <input type="text" placeholder="Ingresa tu nombre" {...register("nombre")}/>

        <input type="email" placeholder="Ingresa tu mail" {...register("email")} />
        <input type="telefono" placeholder="Ingresa tu telefono"{...register("telefono")} />
        <button className="enviar" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactoAvanzado;
