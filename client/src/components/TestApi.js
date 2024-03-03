import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TestApi() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('/api/ping')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error al llamar al API:', error));
  }, []);

  return (
    <div>
      <h2>Respuesta del API:</h2>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

export default TestApi;
