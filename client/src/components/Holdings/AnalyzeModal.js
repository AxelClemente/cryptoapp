// import React from 'react';
// import '../Holdings/analyzemodal.css'

// const AnalyzeModal = ({ onClose, averagePrice, crypto, sources, cryptos }) => {
//   const aggregatedSources = sources.reduce((acc, source) => {
//     const existingSource = acc.find(item => item.source === source.source);
//     if (existingSource) {
//       existingSource.amount += source.amount;  // Suma la cantidad si la fuente ya existe
//     } else {
//       acc.push({ ...source });  // Agrega la nueva fuente al acumulador
//     }
//     return acc;
//   }, []);

//   const currentCrypto = cryptos.find(c => c.id === crypto.id);
//   const totalUnits = aggregatedSources.reduce((acc, source) => acc + source.amount, 0);
//   const totalInvestmentValue = totalUnits * averagePrice;
//   const totalCurrentValue = totalUnits * currentCrypto.current_price;
//   const profitLoss = totalCurrentValue - totalInvestmentValue;
//   const priceChange = ((totalCurrentValue - totalInvestmentValue) / totalInvestmentValue) * 100;

//   const renderPerformanceMessage = () => {
//     if (priceChange > 0) {
//       return <span style={{ color: 'green' }}>+{priceChange.toFixed(2)}%</span>;  // Mensaje si el rendimiento es positivo, en verde
//     } else {
//       return <span style={{ color: 'red' }}>-{Math.abs(priceChange.toFixed(2))}%</span>;  // Mensaje si el rendimiento es negativo, en rojo
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">Analysis Result</h3>
//           <button className="close-button" onClick={onClose}>&times;</button>
//         </div>
//         <div>
//           <div className='modal-body'>
//             <p>Average {crypto.name}{averagePrice.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
//             <p> {renderPerformanceMessage()}</p>
//           </div>         
//           <p>Wallet:</p>
//           <ul>
//             {aggregatedSources.map(source => (
//               <li key={source.source}>
//                 {source.source.charAt(0).toUpperCase() + source.source.slice(1)}: {source.amount} {currentCrypto.symbol.toUpperCase()}
//               </li>
//             ))}
//           </ul>
//           <p>Inversión: {totalInvestmentValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
//           <p>Valor Actual: {totalCurrentValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
//           <p>(Ganancia/Pérdida): <span style={{ color: profitLoss >= 0 ? 'green' : 'red' }}>
//             {profitLoss.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
//           </span></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyzeModal;

import React from 'react';
import '../Holdings/analyzemodal.css';

const AnalyzeModal = ({ onClose, averagePrice, crypto, sources, cryptos }) => {
  const aggregatedSources = sources.reduce((acc, source) => {
    const existingSource = acc.find(item => item.source === source.source);
    if (existingSource) {
      existingSource.amount += source.amount;
    } else {
      acc.push({ ...source });
    }
    return acc;
  }, []);

  const currentCrypto = cryptos.find(c => c.id === crypto.id);
  const totalUnits = aggregatedSources.reduce((acc, source) => acc + source.amount, 0);
  const totalInvestmentValue = totalUnits * averagePrice;
  const totalCurrentValue = totalUnits * currentCrypto.current_price;
  const profitLoss = totalCurrentValue - totalInvestmentValue;
  const priceChange = ((totalCurrentValue - totalInvestmentValue) / totalInvestmentValue) * 100;

  const renderPerformanceMessage = () => {
    return priceChange > 0 ?
      <span style={{ color: 'green' }}>+{priceChange.toFixed(2)}%</span> :
      <span style={{ color: 'red' }}>-{Math.abs(priceChange.toFixed(2))}%</span>;
  };

  const getSourceImage = (source) => {
    switch (source.toLowerCase()) {
      case 'metamask':
        return 'metamask.png';
      case 'crypto.com':
        return 'crypto.png';
      case 'binance':
        return 'binance.jpg';
      default:
        return 'public/default.png';  // Asigna una imagen predeterminada si no coincide ninguna
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{capitalizeFirstLetter(crypto.id)} Analysis</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Average {crypto.name} {averagePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          <p>{renderPerformanceMessage()}</p>
          <div className="wallet-container">
            <p className="modal-wallet">Wallet:</p>
            <ul>
              {aggregatedSources.map(source => (
                <li key={source.source}>
                  <img src={getSourceImage(source.source)} alt={source.source} style={{ width: '20px', marginRight: '10px' }} />
                  {source.source.charAt(0).toUpperCase() + source.source.slice(1)}: {source.amount} {currentCrypto.symbol.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
          <p className="financial-summary">Inversión: {totalInvestmentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          <p className="financial-summary">Valor Actual: {totalCurrentValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
          <div className="value-difference-indicator"></div>
          <p className="financial-summary">(Ganancia/Pérdida): <span style={{ color: profitLoss >= 0 ? 'green' : 'red' }}>
            {profitLoss.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
          </span></p>
        </div>
      </div>
    </div>
  );
  
};

export default AnalyzeModal;




