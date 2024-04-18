import React from 'react';

const AnalyzeModal = ({ onClose, averagePrice, crypto, sources }) => {
  // Función para agrupar y sumar las cantidades de las sources duplicadas
  const aggregatedSources = sources.reduce((acc, source) => {
    const existingSource = acc.find(item => item.source === source.source);
    if (existingSource) {
      existingSource.amount += source.amount;  // Suma la cantidad si la fuente ya existe
    } else {
      acc.push({ ...source });  // Agrega la nueva fuente al acumulador
    }
    return acc;
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Analysis Result</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <p>Tu promedio de compra de {crypto.name} es {averagePrice.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
          <p>Están resguardados en:</p>
          <ul>
            {aggregatedSources.map(source => (
              <li key={source.source}>
                {source.source.charAt(0).toUpperCase() + source.source.slice(1)}: {source.amount} unidades
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeModal;




