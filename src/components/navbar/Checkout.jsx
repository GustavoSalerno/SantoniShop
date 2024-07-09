import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import { useForm } from 'react-hook-form';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../others/firebase/Config';
const Checkout = () => {
    const { carrito, precioTotal,vaciarCarrito } = useContext(CartContext);
    const {register, handleSubmit} = useForm();
    const [pedidoId, setPedidoId] = useState('')
    const comprar = (data) => {
        const pedido = {
            cliente: data,
            productos: carrito,
            total: precioTotal()
        }
        //console.log(pedido)



        const pedidosRef = collection(db, "pedidos");
        addDoc(pedidosRef,pedido)
        .then((doc) => {
            setPedidoId(doc.id)
            vaciarCarrito();
        })
    }

    if(pedidoId){
        return(
            <div className="container">
                <h1 className='main-title'>muchas gracias por tu compra</h1>
                <p>Tu id de Compra es {pedidoId}</p>
            </div>
        )
    }
    return (
        <div className="container">
          <h1 className="main-title">Finaliza Compra</h1>
          <form className="formulario" onSubmit={handleSubmit(comprar)} >
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


export default Checkout