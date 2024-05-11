import React, { useState } from 'react';
import '../SellModal/sellModal.css';

const SellModal = ({ onClose, onConfirm, crypto, averagePrice, sources, cryptos }) => {
  const [amount, setAmount] = useState(crypto.total_amount);  // Inicializa con el total disponible
  
  const aggregated = sources.reduce((acc, source) => {
    const existing = acc.find(item => item.source === source.source);
    if (existing) {
      existing.amount += source.amount;
    } else {
      acc.push({ ...source });
    }
    return acc;
  }, []);

  const currentCryptos = cryptos.find(c => c.id === crypto.id);
  const totalUnitss = aggregated.reduce((acc, source) => acc + source.amount, 0);
  const totalInvestmentValuee = totalUnitss * averagePrice;
  const totalCurrentValuee = totalUnitss * currentCryptos.current_price;
  // const profitLoss = totalCurrentValuee - totalInvestmentValuee;
  const priceChange = ((totalCurrentValuee - totalInvestmentValuee) / totalInvestmentValuee) * 100;

  const PerformanceMessage = () => {
    return priceChange > 0 ?
      <span style={{ color: 'green' }}>+{priceChange.toFixed(2)}%</span> :
      <span style={{ color: 'red' }}>-{Math.abs(priceChange.toFixed(2))}%</span>;
  };

  const handleSell = () => {
    onConfirm(amount);
    onClose();
  };

  const handleChange = (e) => {
    const sellAmount = Math.min(crypto.total_amount, e.target.value);
    setAmount(sellAmount);
  };

  // const getSourceImage = (source) => {
  //   switch (source.toLowerCase()) {
  //     case 'metamask':
  //       return 'metamask.png';
  //     case 'crypto.com':
  //       return 'crypto.png';
  //     case 'binance':
  //       return 'binance.jpg';
  //     default:
  //       return 'public/default.png';  // Asigna una imagen predeterminada si no coincide ninguna
  //   }
  // };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

      
          <div className='tituloEImagen'>
            <img src={crypto.image || 'path/to/default/image.jpg'} alt={crypto.name} className="crypto-image" />
            <div>
              <p className='youAreAboutToSell'>You're about to sell {capitalizeFirstLetter(crypto.id)}</p>
              <p>with a average cost of {averagePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
            
          </div>
          <div className='rectangulo-curvo'>
            <div className='insideRectangulo'>
              <p>{crypto.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
              <p className='text'>Current Price</p>
            </div>
            <div>
              <p>Dropdown menu</p>
            </div>
            <div className='insideRectangulo'>
              {amount}
              <p className='text'>Available</p>
            </div>
          </div>
          
          <div>
            
            <p className='textoGanancia'>Tu Ganancia/Perdida sera del <span> {PerformanceMessage()}</span> respecto al precio de compra</p>
            
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              {/* <label htmlFor="amount">Amount to sell</label> */}
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={handleChange}
                max={crypto.total_amount}
                min="0"
                step="1"
                required
              />
            </div>
            <div className='sellAndTotal'>
              <span className="totalValue">{(amount * crypto.current_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
              <button type="button" onClick={handleSell} className="button submit">Sell</button>
              {/* <button type="button" onClick={onClose} className="button cancel">Cancel</button> */}
            </div>
              
          </form>

        </div>
    </div>
  );
};

export default SellModal;
