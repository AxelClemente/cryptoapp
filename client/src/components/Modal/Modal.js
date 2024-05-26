import React from 'react';
import '../Modal/modal.css'

const Modal = ({ onClose, onConfirm, amount, setAmount, currentPrice, cryptoName,source,setSource,setSelectedCryptoPrice }) => {
  // Función para capitalizar la primera letra NUEVO CODIGO!
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setSelectedCryptoPrice(value === '' ? '' : parseFloat(value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
  };

  const handleSourceChange = (event) => {
    setSource(event.target.value); // Actualiza el estado 'source' con el nuevo valor seleccionado
  };

  const totalPrice = currentPrice * amount;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Este div sirve como fondo del modal y cerrará el modal si se hace clic fuera de .modal-content */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            Add {capitalizeFirstLetter(cryptoName)}
          </h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="price">Price per Coin</label>
              <input
                type="number"
                name="price"
                id="price"               
                placeholder={currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                value={currentPrice}
                onChange={handlePriceChange}
                step="0.01"

              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="total">Total Spent $</label>
              <input
                type="text"
                name="total"
                id="total"                     
                placeholder={totalPrice.toFixed(2).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                value={totalPrice.toFixed(2).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="source">Source</label>
              <select name="source" id="source" value={source} onChange={handleSourceChange}>
                <option value=""></option>
                <option value="binance">Binance</option>
                <option value="bybit">Bybit</option>
                <option value="crypto.com">Crypto.com</option>
                <option value="gateio">Gateio</option>
                <option value="metamask">Metamask</option>
                

                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="modal-actions">
              <button type="button" className="button cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="button submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
