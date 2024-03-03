// En src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setCryptos(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Top 10 Criptomonedas</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            <img src={crypto.image} alt={crypto.name} style={{width: 50, height: 50}} />
            <span>{crypto.name}: ${crypto.current_price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
