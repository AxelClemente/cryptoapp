import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage2.css'; // Asegúrate de crear un archivo CSS para estilos



function HomePage2() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="top-bar">
        <img src="Logo.png" alt="Logo" className="logo" />
        <button className="menu-button" onClick={() => navigate('/signup')}>Signup</button>

      </header>

      <main className="content">
        <h1>Your Crypto Assistance</h1>
        <div className="info-box" onClick={() => {/* handle navigation to Markets Info */}}>
          <p>Portafolio</p>
        </div>
        <div className="info-box" onClick={() => {/* handle navigation to AI Assistance */}}>
          <p>Asistente AI</p>
        </div>
        <div className="info-box" onClick={() => navigate('/portfolio')}>
          <p>Mercado</p>
        </div>
      </main>
    </div>
  );
}

export default HomePage2;
