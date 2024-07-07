import React, { useEffect, useState } from "react";
function PokemonList() {
  const [listaActual, setListaActual] = useState({});

  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=5&offset=0");
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");

  useEffect(() => {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setListaActual(data);
        setNext(data.next);
        setPrevious(data.previous);
      });
  }, [url]);

  const handleNext = () => {
    previous && setUrl(previous);
  };
  const handlePrevious = () => {
    setUrl(next);
  };
console.log(listaActual.results)
  return (
    <div>
      {listaActual.results && (
        <div>
          {listaActual.results.map((pokemon) => {
            return (
              <div key={pokemon.name}>
                <h2>{pokemon.name}</h2>
              </div>
            );
          })}
          <button onClick={handleNext}>Siguiente</button>
          <button onClick={handlePrevious}>Anterior</button>
        </div>
      )}
    </div>
  );
}

export default PokemonList;
