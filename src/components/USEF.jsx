import React, { useState, useEffect } from 'react';

const USEF = () => {

const [text,setText] = useState("");

const handleText = (e) =>{
    setText(e.target.value)
}

useEffect(()=>{
    console.log("componente montado")
},[text]);
useEffect(()=>{
    console.log("componente montado")
    return () => {
        console.log('Componente Desmontado')
    }
});

    return (
        <div>
            <input type="text" onChange={handleText}/>
            <p>{text}</p>
        </div>
    );
};

export default USEF;