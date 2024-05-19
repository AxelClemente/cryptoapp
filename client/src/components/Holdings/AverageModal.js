// import React from 'react';
// import '../Holdings/averageModal.css';

// function AverageModal({ onClose, data }) {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2 className='titleModal'>Holdings Breakdown</h2>
//         <ul>
//           {data.map((crypto) => (
//             <li key={crypto.id}>
//               <img src={crypto.image} alt={crypto.id} className="crypto-imagens" />
//               <span className="crypto-a"> {crypto.id}</span>

//               <span>
//                 {crypto.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
//                 <span className="crypto-percentage"> {crypto.percentage.toFixed(2)}%</span>
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AverageModal;


import React from 'react';
import '../Holdings/averageModal.css';

function AverageModal({ onClose, data }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className='titleModal'>Initial Investement </h2>
        <table className="average-table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>USD</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {data.map((crypto) => (
              <tr key={crypto.id}>
                <td><img src={crypto.image} alt={crypto.id} className="crypto-imagens" /></td>
                <td>{crypto.id}</td>
                <td>{crypto.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{crypto.percentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AverageModal;
