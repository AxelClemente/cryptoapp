import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestBackendConnection() {
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/`);
        setResponseMessage(response.data);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setResponseMessage('No se pudo conectar con el backend.');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h2>Respuesta del Backend:</h2>
      <p>{responseMessage}</p>
    </div>
  );
}

export default TestBackendConnection;
