import React, { useState, useEffect } from 'react';
import './holdings.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Añade esta línea




function Holdings() {
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate()


  // Esta función se ejecutará al montar el componente
  useEffect(() => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Configurar los headers de la solicitud para incluir el token de autenticación
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    axios.get('/api/holdings', config)
      .then(response => {
        // Guarda los datos del portafolio en el estado del componente
        setPortfolio(response.data.cryptos);
      })
      
      .catch(error => console.error('Error fetching portfolio data:', error));
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button> {/* Añade este botón */}
      <h1>Mi Portafolio</h1>
      <ul>
        {portfolio.map((crypto) => (
          <li key={crypto.id}>
            Crypto ID: {crypto.id}, Amount: {crypto.amount}
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default Holdings;
