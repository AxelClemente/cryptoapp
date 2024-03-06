import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 150, // Fetch the first 100 cryptocurrencies
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

  return (
    <div>
      <h1>Mercados top 120 cryptomonedas</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            <img src={crypto.image} alt={crypto.name} style={{ width: '20px', height: '20px' }} />
            <span>{crypto.name}: ${crypto.current_price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Portfolio;

