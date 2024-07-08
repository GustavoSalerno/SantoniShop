import axios from 'axios';
const BASE_URL = 'https://pro.dna.netlatin.net.ar/endpoints/E-Commerce';



export const fetchProductById = async (idCategoria) => {
    try {
      const response = await axios.get(`${BASE_URL}/joins/getNameCategorysById.php?id=${idCategoria}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  };