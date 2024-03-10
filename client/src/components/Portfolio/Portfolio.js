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
  
    if (now - lastFetchTime < CACHE_TIME && cryptos.length) {
      console.log('Usando datos de caché');
      return;
    }

      // Obtén el token del almacenamiento local
    const token = localStorage.getItem('token');
    if (!token) {
    console.error('Token no encontrado');
    return;
  }
  
    // Actualiza la solicitud para obtener datos de tu backend
    const fetchData = async () => {
      try {
        // Asume que tienes un endpoint en tu backend /portfolio/markets
        const response = await axios.get('/portfolio/markets', { headers: { 'Authorization': `Bearer ${token}` } });
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

