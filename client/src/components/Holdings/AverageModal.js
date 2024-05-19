import React from 'react';
import '../Holdings/averageModal.css';

function AverageModal({ onClose, data }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className='titleModal'>Holdings Breakdown</h2>
        <ul>
          {data.map((crypto) => (
            <li key={crypto.id}>
              <img src={crypto.image} alt={crypto.id} className="crypto-imagens" />
              <span className="crypto-a"> {crypto.id}</span>

              <span>
                {crypto.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
                <span className="crypto-percentage"> {crypto.percentage.toFixed(2)}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AverageModal;
