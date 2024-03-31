/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal'; // Asegúrate de crear este componente
import Header from '../../Header'
import '../Portfolio/portfolio.css'

// Supongamos que añadimos un tiempo de vida de la caché de 1 minuto
const CACHE_TIME = 7 * 60 * 1000; // 3 minutos en milisegundos

const Portfolio = () => {
  const [cryptos, setCryptos] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCryptoId, setSelectedCryptoId] = useState('');
  const [selectedCryptoPrice, setSelectedCryptoPrice] = useState(0);
  const [amount, setAmount] = useState(1); // Estado para almacenar la cantidad especificada
  const [source, setSource] = useState(''); // Nuevo estado para la fuente

  

  useEffect(() => {
    const now = new Date().getTime();
  
    if (now - lastFetchTime < CACHE_TIME && cryptos.length) {
      // console.log('Usando datos de caché');
      return;
    }

      // Obtén el token del almacenamiento local
    const token = localStorage.getItem('token');
    if (!token) {
    // console.log("Comprabando el token de google en portfolio page del localStorage:", token)
    // console.error('Token no encontrado');

    return;
  }
  
    // Actualiza la solicitud para obtener datos de tu backend
    const fetchData = async () => {
      try {
        // Asume que tienes un endpoint en tu backend /portfolio/markets
        const response = await axios.get(`${process.env.REACT_APP_URL}/portfolio/markets`,{headers: { 'Authorization': `Bearer ${token}` }});        
        console.log("Respuesta del servidor:", response); // Aquí se imprime la respuesta del servidor
        setCryptos(response.data);
        setLastFetchTime(now);
      } catch (error) {
        console.error('Error fetching data from the API', error);
      }
    };
  
    fetchData();
  }, [cryptos, lastFetchTime]);

  const handleOpenModal = (cryptoId) => {
    const crypto = cryptos.find(c => c.id === cryptoId); // Encuentra la criptomoneda seleccionada
    if (crypto) {
      setSelectedCryptoId(cryptoId);
      setSelectedCryptoPrice(crypto.current_price); // Establece el precio actual
      setShowModal(true);
    } else {
      console.error('Criptomoneda no encontrada');
    }
  };

  useEffect(() => {
    // console.log("El estado de showModal cambió a:", showModal);
  }, [showModal]);

  const handleAddToPortfolio = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      // console.log("Token de google en Portfolio.js:", token);
      // console.log("Axel este es el problema con el user id:", userId)
  
      // Asegúrate de tener definida REACT_APP_URL en tu .env
      const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000"; // Este es el cambio
      
  
      const response = await axios.post(`${backendUrl}/portfolio/add`, {
        userId,
        source,
        cryptoId: selectedCryptoId,
        dailyPrice: selectedCryptoPrice,
        amount,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      console.log("Cryptomonedas añadidas al portfolio", response.data);
      console.log("Cryptomonedas añadidas al portfolio por el usuario:", userId);
      console.log("Cryptomonedas añadidas al portfolio en el source:", source);
      console.log("Cryptomonedas añadidas al portfolio por con el precio de:", selectedCryptoPrice);


      setShowModal(false); // Cierra el modal después de agregar
    } catch (error) {
      console.error('Error adding to portfolio', error);
    }
  };
  
  return (
    <div className="portfolio-container">
      {/* <button onClick={handleGoBack}>Volver atrás</button> Botón para ir hacia atrás */}
      <Header/>


      <ul role="list" className="crypto-list">
          {cryptos.map((crypto) => (
            <li key={crypto.name} className="crypto-item">
              <div className="crypto-info">
                <img className="crypto-image" src={crypto.image} alt="" />
                <div >
                  <p className="crypto-name">{crypto.name}</p>
                  <p className="crypto-price">{crypto.current_price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} $</p>
                </div>
              </div>
              <div className="crypto-ath">
              {/* <p className="text-sm leading-6 text-gray-900">ATH {crypto.ath.toLocaleString()} $</p> */}
              {/* <p className="text-sm leading-6 text-gray-900">{crypto.ath.toLocaleString('es-ES')}$</p> */}
              <p >ATH - {crypto.ath.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}$</p>

          {crypto.ath ? (
            <div className="crypto-additional">
              <span style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : '#009393' }}>
                {crypto.price_change_percentage_24h.toFixed(1)}%
              </span>
              <span 
                  onClick={() => handleOpenModal(crypto.id)} 
                  className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ml-2 hover:text-blue-700 cursor-pointer" 
                  style={{ backgroundColor: '#f7931a', color: '#ffffff', borderColor: 'rgba(247,147,26,0.4)' }} 
                  >
                  Agregar
              </span>

            </div>
              ) : (
                <div className="status-online">
                  <div >
                    <div />
                  </div>
                  <p >Online</p>
                </div>
              )}

              </div>
            </li>
          ))}
        </ul>
      {showModal && (
        <Modal 
        onClose={() => setShowModal(false)}
        amount={amount}
        setAmount={setAmount}
        currentPrice={selectedCryptoPrice} // Pasa el precio actual al modal
        cryptoName={selectedCryptoId} // Asume que tienes una variable o estado para el nombre
        source={source} // Pasamos la fuente al Modal
        setSource={setSource} // Pasamos la función para actualizar la fuente
        onConfirm={handleAddToPortfolio}


      />
    )}
    </div>
  );
};

export default Portfolio;

