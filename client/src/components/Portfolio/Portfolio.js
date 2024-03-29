/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal'; // Asegúrate de crear este componente
import Header from '../../Header'

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
    <div className="mx-[210px]">
      {/* <button onClick={handleGoBack}>Volver atrás</button> Botón para ir hacia atrás */}
      <Header handleGoback={handleGoBack}/>


      <ul role="list" className="divide-y divide-gray-100">
          {cryptos.map((crypto) => (
            <li key={crypto.name} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={crypto.image} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{crypto.name}</p>
                  <p className="mt-1 truncate text-s leading-5 text-gray-500">{crypto.current_price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })} $</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              {/* <p className="text-sm leading-6 text-gray-900">ATH {crypto.ath.toLocaleString()} $</p> */}
              {/* <p className="text-sm leading-6 text-gray-900">{crypto.ath.toLocaleString('es-ES')}$</p> */}
              <p className="text-sm leading-6 text-gray-900">ATH - {crypto.ath.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}$</p>

{crypto.ath ? (
  <div className="mt-1 text-s leading-5 text-gray-500">
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
  <div className="mt-1 flex items-center gap-x-1.5">
    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
    </div>
    <p className="text-xs leading-5 text-gray-500">Online</p>
  </div>
)}

              </div>
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
        cryptoName={selectedCryptoId} // Asume que tienes una variable o estado para el nombre

      />
    )}
    </div>
  );
};

export default Portfolio;

