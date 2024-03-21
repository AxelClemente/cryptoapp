// import React from 'react';
// import './modal.css';

// const Modal = ({ onClose, onConfirm, amount, setAmount, currentPrice, currentDate }) => {

  

//   // Gestiona el envío del formulario
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Aquí puedes validar los datos si es necesario antes de llamar a onConfirm
//     onConfirm();
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close-button" onClick={onClose}>&times;</span>
//         <h2>Add Transaction</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="price">Price per coin *</label>
//             <input
//               id="price"
//               type="text" // Cambiado a text para que sea de solo lectura
//               value={currentPrice} // Utiliza el precio actual
//               readOnly // Hace el campo de solo lectura
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="quantity">Quantity *</label>
//             <input
//               id="quantity"
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-actions">
//             <button type="button" onClick={onClose}>Cancel</button>
//             <button type="submit" className="submit-button">Submit</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from 'react';

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
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Add {capitalizeFirstLetter(cryptoName)}
              </h3>
              <div className="mt-2">
                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per Coin</label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      placeholder={currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                      value={currentPrice}
                      readOnly
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      placeholder={currentPrice.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <label htmlFor="total" className="block text-sm font-medium text-gray-700">Total Spent</label>
                    <input
                      type="text"
                      name="total"
                      id="total"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                      placeholder={totalPrice.toFixed(2).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                      value={totalPrice.toFixed(2).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
                      readOnly
                    />
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button type="button" onClick={onClose} className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Cancel
                    </button>
                    <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
