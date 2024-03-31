import React, { useState, useEffect } from 'react';
import './holdings.css';
import axios from 'axios';
import Header from '../../Header';
import '../Holdings/holdings.css'

function Holdings() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga
  const [totalHoldings, setTotalHoldings] = useState(0);

  useEffect(() => {
    const fetchPortfolioAndMarketData = async () => {
      setIsLoading(true); // Inicia la carga
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const portfolioResponse = await axios.get(`${process.env.REACT_APP_URL}/api/holdings`, config);
        console.log("2- Información del backend en Holdings.js", portfolioResponse);
    
        if (portfolioResponse.data.cryptos && portfolioResponse.data.cryptos.length > 0) {
          const marketResponse = await axios.get(`${process.env.REACT_APP_URL}/portfolio/markets`, config);
          console.log("3- Información de la API en Holdings.js", marketResponse.data);
  
          // Filtra la respuesta de la API para incluir solo las criptomonedas en el portafolio del usuario
          const portfolioIDs = portfolioResponse.data.cryptos.map(crypto => crypto.id);
          const filteredMarketData = marketResponse.data.filter(crypto => portfolioIDs.includes(crypto.id));
  
          // Enriquece los datos del portafolio del usuario con la información filtrada de la API
          const enrichedCryptos = portfolioResponse.data.cryptos.map(crypto => {
            const marketCrypto = filteredMarketData.find(marketCrypto => marketCrypto.id === crypto.id);
            return {
              ...crypto,
              name: marketCrypto?.name || 'Nombre no disponible',
              image: marketCrypto?.image || 'URL de imagen predeterminada',
              current_price: marketCrypto?.current_price || 0,
            };
          });

          const total = enrichedCryptos.reduce((acc, crypto) => {
            return acc + (crypto.current_price * crypto.amount);
          }, 0);
  
          setTotalHoldings(total); // Guarda el total en el estado
          setCryptos(enrichedCryptos); // Actualiza el estado con los datos enriquecidos y filtrados
  
          setCryptos(enrichedCryptos); // Actualiza el estado con los datos enriquecidos y filtrados
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };
    
    fetchPortfolioAndMarketData();
  }, []);
  
  
  if (isLoading) {
    return <div className="loading">Cargando...</div>; // O cualquier otro indicador de carga
  }

  return (
    <div className="container">
      <Header/>
        
            <div className="total-holdings" >
              <img className="holdings-image" src="logo1.png" alt="Holdings" />
              <div className="total-value" >                               
                 Total: {totalHoldings.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}               
              </div>
            </div>       
      <ul className="crypto-list">
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="crypto-item">
            <div>
              <img className="crypto-image" src={crypto.image} alt={crypto.name} />
              <div className="crypto-info">
                <p className="crypto-name">{crypto.name}</p>
                <p className="crypto-details">
                  {crypto.current_price > 0 
                    ? crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
                    : 'Precio no disponible'}
                    <span className="crypto-qty">  QTY: {crypto.amount}</span>
                </p>
              </div>

            </div>
            
            <div className="crypto-value">
              <span>               
                <span style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : '#009393' }}>
                  ${(crypto.current_price * crypto.amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                </span>

              </span>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}

export default Holdings;

