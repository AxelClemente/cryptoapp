import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // Asegúrate de crear este componente

// Supongamos que añadimos un tiempo de vida de la caché de 1 minuto
const CACHE_TIME = 7 * 60 * 1000; // 3 minutos en milisegundos

const Portfolio = () => {
  const [cryptos, setCryptos] = useState([]);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCryptoId, setSelectedCryptoId] = useState('');
  const [selectedCryptoPrice, setSelectedCryptoPrice] = useState(0);
  const [amount, setAmount] = useState(1); // Estado para almacenar la cantidad especificada
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date().getTime();

    // Verificamos si la caché aún es válida
    if (now - lastFetchTime < CACHE_TIME && cryptos.length) {
      console.log('Usando datos de caché');
      return; // Los datos son recientes, no necesitamos actualizarlos
    }

    // Si la caché no es válida o es la primera vez, hacemos la solicitud
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 150,
            page: 1
          }
        });
        setCryptos(response.data);
        setLastFetchTime(now); // Actualizamos el tiempo de la última solicitud
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
    console.log("El estado de showModal cambió a:", showModal);
  }, [showModal]);

  const handleAddToPortfolio = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.post('/portfolio/add', {
        userId,
        cryptoId: selectedCryptoId,
        amount,
      }, config);

      console.log("Cryptomonedas añadidas al portfolio", response.data);
      setShowModal(false); // Cierra el modal después de agregar
    } catch (error) {
      console.error('Error adding to portfolio', error);
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button>
      <h1>Mercados top 150 cryptomonedas</h1>
      <ul>
        {cryptos.map((crypto) => (
          <li key={crypto.id}>
            <img src={crypto.image} alt={crypto.name} style={{ width: '20px', height: '20px' }} />
            <span>{crypto.name}: ${crypto.current_price}</span>
            <button onClick={() => handleOpenModal(crypto.id)}>Agregar</button>
            
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal 
        onClose={() => setShowModal(false)}
        onConfirm={handleAddToPortfolio}
        amount={amount}
        setAmount={setAmount}
        currentPrice={selectedCryptoPrice} // Pasa el precio actual al modal
      />
    )}
    </div>
  );
};

export default Portfolio;

