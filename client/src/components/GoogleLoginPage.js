import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function GoogleLoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    console.log('Login exitoso con Google:', response);
    const token = response.credential; // El JWT está en la propiedad `credential` de la respuesta
    console.log('JWT:', token); // Confirma el JWT en la consola

    // Almacenar el token en localStorage para mantener la sesión
    localStorage.setItem('token', token);

    // Opcionalmente enviar el token a tu servidor backend para validar y crear una sesión de usuario
    // Ejemplo comentado previamente

    navigate('/HomePage2'); // Redirige al usuario a la página deseada tras el login
  };

  const handleLoginFailure = (error) => {
    console.error('Error al iniciar sesión con Google:', error);
    // Manejo del error
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


// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios'; // Asegúrate de haber instalado axios

// function GoogleLoginPage() {
//   const navigate = useNavigate();
//   const backendUrl = process.env.REACT_APP_URL || 'http://localhost:3000';


//   const handleLoginSuccess = async (response) => {
//     console.log('Login exitoso con Google:', response);
//     // El JWT obtenido de Google
//     const token = response.credential;
//     console.log('JWT:', token);
  
//     // Intenta enviar el JWT a tu servidor backend
//     try {
//       const backendResponse = await axios.post(`${backendUrl}/auth/google`, {
//         token: token,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       // Aquí se maneja la respuesta del backend
//       console.log('Respuesta del backend:', backendResponse.data);
  
//       // Opcional: Almacenar el token JWT devuelto por tu backend en localStorage
//       localStorage.setItem('backendToken', backendResponse.data.token);
  
//       // Redirecciona al usuario a HomePage2 o cualquier otra ruta deseada después del login exitoso
//       navigate('/HomePage2');
//     } catch (error) {
//       console.error('Error al enviar información al backend:', error);
//       // Aquí manejas el error
//     }
//   };
  

//   const handleLoginFailure = (error) => {
//     console.error('Error al iniciar sesión con Google:', error);
//     // Manejo del error
//   };

//   return (
//     <div>
//       <h2>Iniciar sesión con Google</h2>
//       <GoogleLogin
//         onSuccess={handleLoginSuccess}
//         onError={handleLoginFailure}
//         useOneTap
//       />
//     </div>
//   );
// }

// export default GoogleLoginPage;

