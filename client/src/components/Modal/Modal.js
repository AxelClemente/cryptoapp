import React from 'react';
import './modal.css';

const Modal = ({ onClose, onConfirm, amount, setAmount, currentPrice, currentDate }) => {

  

  // Gestiona el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes validar los datos si es necesario antes de llamar a onConfirm
    onConfirm();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="price">Price per coin *</label>
            <input
              id="price"
              type="text" // Cambiado a text para que sea de solo lectura
              value={currentPrice} // Utiliza el precio actual
              readOnly // Hace el campo de solo lectura
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              id="quantity"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
