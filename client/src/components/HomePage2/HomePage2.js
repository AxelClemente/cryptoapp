import React from 'react';
import './HomePage2.css'; // Asegúrate de crear un archivo CSS para estilos

function HomePage2() {
  return (
    <div className="homepage">
      <header className="top-bar">
        <img src="Logo.png" alt="Logo" className="logo" />
        <button className="menu-button">Menu</button>
      </header>

      <main className="content">
        <h1>Your Crypto Assistance</h1>
        <div className="info-box" onClick={() => {/* handle navigation to Markets Info */}}>
          <p>Markets Info</p>
        </div>
        <div className="info-box" onClick={() => {/* handle navigation to AI Assistance */}}>
          <p>AI Assistance</p>
        </div>
        <div className="info-box" onClick={() => {/* handle navigation to Portfolio */}}>
          <p>Portfolio</p>
        </div>
      </main>
    </div>
  );
}

export default HomePage2;
