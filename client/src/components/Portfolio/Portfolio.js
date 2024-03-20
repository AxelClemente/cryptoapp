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
        cryptoId: selectedCryptoId,
        amount,
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      console.log("Cryptomonedas añadidas al portfolio", response.data);
      setShowModal(false); // Cierra el modal después de agregar
    } catch (error) {
      console.error('Error adding to portfolio', error);
    }
  };
  
      // Función para manejar el evento de clic en el botón de retroceso
      const handleGoBack = () => {
        navigate(-1); // Navega hacia atrás en el historial del navegador
      };


  return (
    <div>
      <button onClick={handleGoBack}>Volver atrás</button> {/* Botón para ir hacia atrás */}
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

