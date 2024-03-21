import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate


function TestBackendConnection() {
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate(); // Instancia useNavigate


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

    // Función para manejar el evento de clic en el botón de retroceso
    const handleGoBack = () => {
      navigate(-1); // Navega hacia atrás en el historial del navegador
    };

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <button
          onClick={handleGoBack}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Volver atrás
        </button>
        <h2 className="mt-4 text-lg font-semibold text-gray-800">Respuesta del Backend:</h2>
        <p className="text-gray-600">{responseMessage}</p>
      </div>
  );
}

export default TestBackendConnection;
