import React, { useState } from 'react';
import USEF from './USEF';

export default function Text() {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <div>
      <hr />
      {show && <USEF />}
      <button onClick={handleShow}>{show ? "Ocultar" : "Mostrar"}</button>
    </div>
  );
}
