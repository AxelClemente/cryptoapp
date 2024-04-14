// import React, { useState } from 'react';
// import '../SellModal/sellModal.css'

// const SellModal = ({ onClose, onConfirm, crypto }) => {
//   const [amount, setAmount] = useState(crypto.amount);  // Estado inicial igual a la cantidad total disponible

//   const handleSell = () => {
//     // Lógica para vender la criptomoneda
//     onConfirm(amount);
//     onClose();  // Cierra el modal tras confirmar
//   };

//   const handleChange = (e) => {
//     const sellAmount = Math.min(crypto.amount, e.target.value);  // No permitir vender más de lo disponible
//     setAmount(sellAmount);
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">Sell {crypto.name}</h3>
//           <button className="close-button" onClick={onClose}>&times;</button>
//         </div>
//         <div className="modal-body">
//           <form onSubmit={(e) => e.preventDefault()}>
//             <div className="form-group">
//               <label htmlFor="amount">Amount to sell</label>
//               <input
//                 type="number"
//                 id="amount"
//                 value={amount}
//                 onChange={handleChange}
//                 max={crypto.amount}  // Máximo establecido como la cantidad poseída
//                 min="1"  // Mínimo establecido como 1 para evitar valores no válidos
//                 step="1"
//                 required
//               />
//             </div>
//             <p>Total: {(amount * crypto.current_price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
//             <button type="button" onClick={handleSell} className="button submit">Confirm</button>
//             <button type="button" onClick={onClose} className="button cancel">Cancel</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellModal;

import React, { useState } from 'react';
import '../SellModal/sellModal.css';

const SellModal = ({ onClose, onConfirm, crypto }) => {
  const [amount, setAmount] = useState(crypto.total_amount);  // Usa total_amount para inicializar

  const handleSell = () => {
    onConfirm(amount);  // Confirma la venta con la cantidad especificada
    onClose();  // Cierra el modal tras confirmar
  };

  const handleChange = (e) => {
    const sellAmount = Math.min(crypto.total_amount, e.target.value);  // Asegura no exceder el total disponible
    setAmount(sellAmount);  // Actualiza la cantidad a vender
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Sell {crypto.name}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="amount">Amount to sell</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleChange}
                max={crypto.total_amount}  // Usa total_amount como el máximo
                min="1"
                step="1"
                required
              />
            </div>
            <p>Total: {(amount * crypto.current_price).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
            <button type="button" onClick={handleSell} className="button submit">Confirm</button>
            <button type="button" onClick={onClose} className="button cancel">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellModal;

