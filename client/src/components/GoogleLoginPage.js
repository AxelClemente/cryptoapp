import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GoogleLoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    const token = response.credential; // JWT proporcionado por Google
  
    try {
      // Usando una URL predeterminada en caso de que REACT_APP_URL no esté disponible
      const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

      // Envía el JWT directamente al backend
      const backendResponse = await axios.post(`${backendUrl}/auth/google`, { token });

      // Almacenamiento del token propio del backend y userId en localStorage
      localStorage.setItem('userId', backendResponse.data.user._id);
      localStorage.setItem('token', backendResponse.data.token);

      navigate('/HomePage2'); // Redirecciona a la página de inicio tras el login exitoso
    } catch (error) {
      console.error('Error al enviar información al backend:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Error al iniciar sesión con Google:', error);
  };

  return (
    <div>
      <h2>Iniciar sesión con Google</h2>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap
      />
    </div>
  );
}

export default GoogleLoginPage;



