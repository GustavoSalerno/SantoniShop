import React, { useEffect } from 'react'

const Nosotros = () => {
    
    
    useEffect(() => {
        let count = 0;
        const clicky = () => {
            count += 1;
            console.log(count)
          }
        window.addEventListener('click',clicky )
        return () => window.removeEventListener('click',clicky)
    }, []);


  return (
    <div className='container'>
        <h1 className='main-title'>Nosotros</h1>
        <p>Este es el componente Nosotros</p>
    </div>
  )
}

export default Nosotros