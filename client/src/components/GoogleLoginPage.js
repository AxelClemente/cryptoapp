import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function GoogleLoginPage() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    console.log('Login exitoso con Google:', response);
    const token = response.credential; // JWT proporcionado por Google
  
    try {
      // Extracción de datos del token aquí (si es necesario, depende de tu implementación en el backend)
      const { email, name } = decodeToken(token); // Asume que tienes una función decodeToken para decodificar el JWT y extraer email y name
  
      // Envía los datos al backend
      const backendResponse = await axios.post(`${process.env.REACT_APP_URL="https://bitforecast.cyclic.app"
        }/auth/google`, {
        email,
        name,
      });
  
      // Almacenamiento del token propio del backend en localStorage
      localStorage.setItem('token', backendResponse.data.token);
  
      navigate('/HomePage2');
    } catch (error) {
      console.error('Error al enviar información al backend:', error);
    }
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

