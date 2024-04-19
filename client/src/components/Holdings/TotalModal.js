// import React from 'react';
// // import '../Holdings/totalmodal.css';  // Asegúrate de tener los estilos apropiados

// const TotalModal = ({ onClose, cryptos, totalHoldings }) => {
//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">Total Holdings Breakdown</h3>
//           <button className="close-button" onClick={onClose}>&times;</button>
//         </div>
//         <div className="modal-body">
//           <ul>
//             {cryptos.map(crypto => {
//               const percentage = (crypto.current_price * crypto.total_amount / totalHoldings * 100).toFixed(2);
//               return (
//                 <li key={crypto.id}>
//                   {crypto.name} ({crypto.symbol.toUpperCase()}) {percentage}%  
//                   {((crypto.current_price * crypto.total_amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' }))}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
// import '../Holdings/totalmodal.css';  // Asegúrate de tener los estilos apropiados

const TotalModal = ({ onClose, cryptos, totalHoldings }) => {
  const sortedCryptos = cryptos.map(crypto => ({
    ...crypto,
    value: crypto.current_price * crypto.total_amount,
    percentage: (crypto.current_price * crypto.total_amount / totalHoldings * 100)
  })).sort((a, b) => b.percentage - a.percentage);  // Ordenando de mayor a menor porcentaje

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Total Holdings Breakdown</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <ul>
            {sortedCryptos.map(crypto => (
              <li key={crypto.id}>
                {crypto.name} ({crypto.symbol.toUpperCase()}) - {crypto.percentage.toFixed(2)}%: 
                ${(crypto.value).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TotalModal;


