import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Añade esta línea


const Portfolio = () => {
  const [cryptos, setCryptos] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 150, // Fetch the first 150 cryptocurrencies
            page: 1
          }
        });
        setCryptos(response.data);
        // Log the IDs of the first 100 cryptocurrencies
        console.log(response.data.map(crypto => crypto.id));
        
      } catch (error) {
        console.error('Error fetching data from the API', error);
      }
    };

    fetchData();
  }, []);

  const addToPortfolio = async (cryptoId) => {
    try {
      // Obtener el ID del usuario del almacenamiento local
      const userId = localStorage.getItem('userId'); // Asumiendo que el userId se guardó con este nombre después del login o registro
  
      if (!userId) {
        console.error('El ID del usuario no está disponible.');
        return;
      }
  
      // Obtener el token del almacenamiento local
      const token = localStorage.getItem('token'); // Asumiendo que el token se guardó con este nombre
    
      // Configurar los encabezados de la solicitud para incluir el token de autenticación
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
    
      // Realizar la solicitud incluyendo el token y el ID del usuario en los encabezados
      const response = await axios.post('/portfolio/add', {
        userId, // Ya no usamos 'userIdAqui', sino el userId del estado global o almacenamiento local
        cryptoId,
        amount: 1,
      }, config);
    
      console.log("Cryptomonedas añadidas al portfolio", response.data);
    } catch (error) {
      console.error('Error adding to portfolio', error);
    }
  };
  

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button> {/* Añade este botón */}
      <h1>Mercados top 150 cryptomonedas</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            <img src={crypto.image} alt={crypto.name} style={{ width: '20px', height: '20px' }} />
            <span>{crypto.name}: ${crypto.current_price}</span>
            <button onClick={() => addToPortfolio(crypto.id)}>Agregar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;

