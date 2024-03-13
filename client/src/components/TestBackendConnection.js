import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TestBackendConnection() {
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    // Asegúrate de actualizar la URL según tu configuración y entorno
    const testBackendUrl = `${process.env.REACT_APP_URL}/test-backend`;

    const fetchMessage = async () => {
      try {
        const response = await axios.get(testBackendUrl);
        setResponseMessage(response.data.message); // Asume que el backend envía un objeto JSON con una propiedad 'message'
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
