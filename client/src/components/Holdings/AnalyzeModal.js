import React from 'react';

const AnalyzeModal = ({ onClose, averagePrice, crypto }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Analysis Result</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Tu promedio de compra de {crypto.name} es {averagePrice.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeModal;

