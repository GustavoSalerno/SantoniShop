import React, { useEffect, useState } from "react";

function Pokemon() {
  const [pokemon, setPokemon] = useState("");
  const [id, setId] = useState(1);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
      });
  }, [id]);

  const handleBefore = () => {
    id > 1 && setId(id - 1);
  };
  const handleAfter = () => {
    setId(id + 1);
  };
  console.log(id);
  return (
    <div>
      {pokemon && (
        <div>
          <h1>{pokemon.name}</h1>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <br />
          {/* manera 1 oculta el boton */}
          {id > 1 && <button onClick={handleBefore}>Anterior con condicional</button>}
          {/* manera 2 deshabilita el boton con operador ternario */}
          {
            id > 1 ? <button onClick={handleBefore}>Anterior en ternario habilitado</button> : <button disabled>Anterior con ternario deshabilita</button>
          }
          <hr />
          <button onClick={handleAfter}>siguiente</button>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
