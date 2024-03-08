import React, { useState, useEffect } from 'react';
import './holdings.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Añade esta línea


// Definir el tiempo de caché en milisegundos (5 minutos)
const CACHE_TIME = 8 * 60 * 1000;

function Holdings() {
  const [portfolio, setPortfolio] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    // Verificar si los datos de la caché aún son válidos
    if (lastFetchTime && new Date() - new Date(lastFetchTime) < CACHE_TIME) {
      console.log('Usando datos de caché para el portafolio');
      return;
    }

    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const { data } = await axios.get('/api/holdings', config);
        const portfolioData = data.cryptos;

        // Hacer solicitud para obtener detalles adicionales si es necesario
        const cryptoDetailsPromises = portfolioData.map(async (crypto) => {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}`);
          return {
            id: crypto.id,
            amount: crypto.amount,
            image: response.data.image.small,
            current_price: response.data.market_data.current_price.usd,
          };
        });

        const enrichedPortfolio = await Promise.all(cryptoDetailsPromises);
        setPortfolio(enrichedPortfolio);
        setLastFetchTime(new Date().toISOString()); // Actualizar la hora de la última solicitud
        console.log('Datos del portafolio actualizados desde la API');
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    fetchPortfolio();
  }, [lastFetchTime]);


  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button> {/* Añade este botón */}
      <h1>Mi Portafolio</h1>
      <ul>
        {portfolio.map((crypto) => (
          <li key={crypto.id}>
              <img src={crypto.image} alt={crypto.id} style={{ width: '50px', height: '50px' }} />
              {/* <span>{crypto.id}: ${crypto.current_price} - Amount: {crypto.amount}</span> */}
              <span>
                {crypto.id}: ${crypto.current_price.toFixed(2)} - 
                Amount: {crypto.amount} - 
                Total: ${(crypto.current_price * crypto.amount).toFixed(2)}
              </span>
          </li>
            ))}
      </ul>
    </div>
  );
  
}

export default Holdings;
