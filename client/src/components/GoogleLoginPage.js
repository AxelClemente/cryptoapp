import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {
    console.log('Login exitoso con Google:', response);
    // Guardar el token en localStorage, si es necesario
    // localStorage.setItem('token', response.credential);
    
    // Redirigir al usuario a HomePage2
    navigate('/HomePage2');
  };

  const handleLoginFailure = (response) => {
    console.log('Error al iniciar sesión con Google:', response);
    // Manejo del error
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {/* Otros métodos de inicio de sesión */}
      <GoogleLogin 
        onSuccess={handleLoginSuccess}
        onError={handleLoginFailure}
        useOneTap
      />
    </div>
  );
}

export default GoogleLoginPage;


