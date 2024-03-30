// import React from 'react';

// const Modal = ({ onClose, onConfirm, amount, setAmount, currentPrice, cryptoName }) => {

//   // Función para capitalizar la primera letra
//   const capitalizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     onConfirm();
//   };

//   const totalPrice = currentPrice * amount;

//   return (
//     <div >
//       <div >
//         <div aria-hidden="true" onClick={onClose}>
//           <div ></div>
//         </div>

//         {/* This element is to trick the browser into centering the modal contents. */}
//         <span  aria-hidden="true">&#8203;</span>

//         <div >
//           <div>
//             <div >
//               <h3 >
//                 Add {capitalizeFirstLetter(cryptoName)}
//               </h3>
//               <div >
//                 <form onSubmit={handleSubmit}>
//                   <div >
//                     <label htmlFor="price" >Price per Coin</label>
//                     <input
//                       type="text"
//                       name="price"
//                       id="price"               
//                       placeholder={currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
//                       value={currentPrice}
//                       readOnly
//                     />
//                   </div>
//                   <div >
//                     <label htmlFor="quantity" >Quantity</label>
//                     <input
//                       type="number"
//                       name="quantity"
//                       id="quantity"
//                       placeholder={currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
//                       value={amount}
//                       onChange={(e) => setAmount(e.target.value)}
//                     />
//                   </div>
//                   <div >
//                     <label htmlFor="total" >Total Spent</label>
//                     <input
//                       type="text"
//                       name="total"
//                       id="total"                     
//                       placeholder={totalPrice.toFixed(2).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
//                       value={totalPrice.toFixed(2).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
//                       readOnly
//                     />
//                   </div>
//                   <div >
//                     <button type="button" onClick={onClose} >
//                       Cancel
//                     </button>
//                     <button type="submit" >
//                       Submit
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from 'react';
import '../Modal/modal.css'

const Modal = ({ onClose, onConfirm, amount, setAmount, currentPrice, cryptoName }) => {
  // Función para capitalizar la primera letra
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onConfirm();
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
                type="text"
                name="price"
                id="price"               
                placeholder={currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                value={currentPrice}
                readOnly
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
