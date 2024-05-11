import React, { useState } from 'react';
import axios from 'axios';
import '../Holdings/alertmodal.css'; // Asegúrate de tener estilos básicos para el modal

const AlertModal = ({ onClose, crypto }) => {
    const [priceThreshold, setPriceThreshold] = useState('');
  
    if (!crypto) return null;  // Retorna null si no hay crypto seleccionado
  
    const setPriceAlert = async () => {
      if (!priceThreshold) {
        alert('Please enter a valid price threshold.');
        return;
      }
  
      const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
      const email = localStorage.getItem('email');  // Obtener el email directamente desde el localStorage
  
      try {
        // Realiza la solicitud y maneja la respuesta dentro del try
        await axios.post(`${backendUrl}/api/setPriceAlert`, {
          cryptoId: crypto.id,
          targetPrice: priceThreshold,
          email  // Enviar email como parte de la solicitud
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
  
        // Si llegas a este punto, la solicitud fue exitosa
        alert('Alert set successfully!');
        onClose();
      } catch (error) {
        console.error('Failed to set price alert:', error);
        alert('Failed to set price alert. Please try again.');
      }
    };
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
        <img src={crypto.image || 'path/to/default/image.jpg'} alt={crypto.name} className="crypto-image" />
        <p>{crypto.id}</p>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {/* <p>{crypto.name} ({crypto.symbol.toUpperCase()}).</p> */}
          <div className="alerts-info">
            <p><strong>Current Price:</strong> {crypto.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            <p><strong>Total Holdings:</strong> {crypto.total_amount} {crypto.symbol.toUpperCase()}</p>
            <p><strong>Value:</strong> {(crypto.current_price * crypto.total_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          </div>
          <div className="form-group">
            {/* <label htmlFor="price-threshold">Set Price Alert ($)</label> */}
            <input type="number" id="price-threshold" name="price-threshold" placeholder="Set Price Alert" 
                   value={priceThreshold} onChange={e => setPriceThreshold(e.target.value)} />
          </div>
          <button className="buttonAlert" onClick={setPriceAlert}>Set Alert</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
