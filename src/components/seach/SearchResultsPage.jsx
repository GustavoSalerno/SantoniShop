import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../item/Item';

const SearchResultsPage = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://pro.dna.netlatin.net.ar/endpoints/E-Commerce/joins/searchProducts.php?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchResults();
  }, [query]);
console.log(query)
  return (
    <div>
      <h1>Resultados de búsqueda para "{query}"</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
         <Item key={result.id} producto={result} />
         // <li key={result.id}>
            //   {result.productname} - ${result.productprice}
            // </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
