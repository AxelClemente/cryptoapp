import React, { useState, useEffect } from 'react';
import './holdings.css';
import axios from 'axios';
import Header from '../../Header'
import { useNavigate } from 'react-router-dom';

function Holdings() {
  const [cryptos, setCryptos] = useState([]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega hacia atrás en el historial del navegador
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get('/api/holdings', config);
        setCryptos(response.data.cryptos);
        console.log("1- quiero saber cual es esta respuesta",response.data.cryptos)
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const portfolioResponse = await axios.get('/api/holdings', config);
        console.log("2- Informacion de la del backend en Holdings.js", portfolioResponse)
        const portfolioIDs = portfolioResponse.data.cryptos.map(crypto => crypto.id);
        
        const marketResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: portfolioIDs.join(','),
            order: 'market_cap_desc',
            per_page: 150,
            page: 1
          }
        });
        console.log("3- informacion de la API en Holdings.js", marketResponse.data);
        
        const enrichedCryptos = portfolioResponse.data.cryptos.map(crypto => {
          const marketCrypto = marketResponse.data.find(marketCrypto => marketCrypto.id === crypto.id);
          return {
            ...crypto,
            name: marketCrypto?.name || 'Nombre no disponible',
            image: marketCrypto?.image || 'URL de imagen predeterminada',
            current_price: marketCrypto?.current_price || 0,
          };
        });
        
  
        setCryptos(enrichedCryptos);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };
  
    fetchMarketData();
  }, []);
  



  return (
    <div className="mx-[210px]">
      <Header handleGoback={handleGoBack}/>
      <ul className="divide-y divide-gray-100">
          {cryptos.map((crypto) => (
            <li key={crypto.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full" src={crypto.image} alt={crypto.name} />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{crypto.name}</p>
                  <p className="mt-1 truncate text-s leading-5 text-gray-500">
                    {crypto.current_price > 0 
                      ? crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
                      : 'Precio no disponible'} - Cantidad: {crypto.amount}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                {/* Aquí puedes añadir más información o acciones relacionadas con cada criptomoneda si es necesario */}
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
  
  
}

export default Holdings;
