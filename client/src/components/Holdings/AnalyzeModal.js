import React from 'react';
import '../Holdings/analyzemodal.css'

const AnalyzeModal = ({ onClose, averagePrice, crypto, sources, cryptos }) => {
  const aggregatedSources = sources.reduce((acc, source) => {
    const existingSource = acc.find(item => item.source === source.source);
    if (existingSource) {
      existingSource.amount += source.amount;  // Suma la cantidad si la fuente ya existe
    } else {
      acc.push({ ...source });  // Agrega la nueva fuente al acumulador
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
    if (priceChange > 0) {
      return <span style={{ color: 'green' }}>+{priceChange.toFixed(2)}%</span>;  // Mensaje si el rendimiento es positivo, en verde
    } else {
      return <span style={{ color: 'red' }}>-{Math.abs(priceChange.toFixed(2))}%</span>;  // Mensaje si el rendimiento es negativo, en rojo
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Analysis Result</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div>
          <div className='modal-body'>
            <p>Average {crypto.name}{averagePrice.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
            <p> {renderPerformanceMessage()}</p>
          </div>         
          <p>Wallet:</p>
          <ul>
            {aggregatedSources.map(source => (
              <li key={source.source}>
                {source.source.charAt(0).toUpperCase() + source.source.slice(1)}: {source.amount} {currentCrypto.symbol.toUpperCase()}
              </li>
            ))}
          </ul>
          <p>Inversión: {totalInvestmentValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
          <p>Valor Actual: {totalCurrentValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
          <p>(Ganancia/Pérdida): <span style={{ color: profitLoss >= 0 ? 'green' : 'red' }}>
            {profitLoss.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
          </span></p>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeModal;




