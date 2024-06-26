// src/components/Signup/Signup.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup', {
        name: name,
        email: email,
        password: password,
      });

      // Guardar el token en localStorage o manejar como consideres apropiado
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user._id);
      console.log("Este es el localStorage del userid:", response.data.user._id)

      console.log("Nuevo usuario registrado",response.data);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito

      navigate('/');
    } catch (error) {
      console.error('Error en el registro:', error.response.data);
      // Aquí podrías manejar errores de registro, como mostrar un mensaje al usuario
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
       <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Signup;
