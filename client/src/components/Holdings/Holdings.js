import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import SellModal from '../SellModal/SellModal';
import AnalyzeModal from '../Holdings/AnalyzeModal';
import TotalModal from '../Holdings/TotalModal';
import AlertModal from '../Holdings/AlertModal'
import '../Holdings/holdings.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faChartLine, faBell, faChartPie } from '@fortawesome/free-solid-svg-icons';


function Holdings() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalHoldings, setTotalHoldings] = useState(0);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [showTotalModal, setShowTotalModal] = useState(false);  // Estado para controlar la visibilidad del TotalModal
  const [showAlertModal, setShowAlertModal] = useState(false);  
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [averagePrice, setAveragePrice] = useState(0);
  const [sourceDetails, setSourceDetails] = useState([]);
  const [totalHoldingsAverage, setTotalHoldingsAverage] = useState(0); // Estado para el total a precio promedio


  useEffect(() => {
    const fetchPortfolioAndMarketData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
      const config = { headers: { Authorization: `Bearer ${token}` } };
  
      if (!token) {
        console.error('No token found');
        setIsLoading(false);
        return;
      }
  
      try {
        const [portfolioRes, marketRes] = await Promise.all([
          axios.get(`${backendUrl}/api/holdings`, config),
          axios.get(`${backendUrl}/portfolio/markets`, config)
        ]);
  
        const marketDataById = new Map(marketRes.data.map(item => [item.id, item]));
  
        const cryptosData = portfolioRes.data.cryptos.reduce((acc, crypto) => {
          const marketCrypto = marketDataById.get(crypto.id);
          if (marketCrypto) {
            const existing = acc.find(c => c.id === crypto.id);
            if (existing) {
              existing.total_amount += crypto.amount;
              existing.sources.push({ source: crypto.source, amount: crypto.amount });
            } else {
              acc.push({
                ...crypto,
                current_price: marketCrypto.current_price || 0,
                image: marketCrypto.image || 'path/to/default/image',
                symbol: marketCrypto.symbol || 'N/A',
                total_amount: crypto.amount,
                sources: [{ source: crypto.source, amount: crypto.amount }]
              });
            }
          }
          return acc;
        }, []);
  
        const totalHoldings = cryptosData.reduce((acc, crypto) => acc + (crypto.current_price * crypto.total_amount), 0);
  
        const totalHoldingsAverage = cryptosData.reduce((acc, crypto) => {
          const totalPaid = crypto.sources.reduce((sum, source) => sum + (source.amount * crypto.dailyPrice), 0);
          const averagePrice = totalPaid / crypto.total_amount;
          return acc + (averagePrice * crypto.total_amount);
        }, 0);
  
        setCryptos(cryptosData);
        setTotalHoldings(totalHoldings);
        setTotalHoldingsAverage(totalHoldingsAverage);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPortfolioAndMarketData();
  }, []);
  
  
  const handleOpenSellModal = (crypto) => {
    const relevantEntries = cryptos.filter(c => c.id === crypto.id);
    const totalAmount = relevantEntries.reduce((acc, curr) => acc + curr.total_amount, 0);
  
    console.log("Total Amount for selling: ", totalAmount);  // Verifica que este mostrando el total correcto
  
    setSelectedCrypto({
      ...crypto,
      total_amount: totalAmount,  // Usa total_amount para reflejar la cantidad total correcta
    });
  
    setShowSellModal(true);  // Asegúrate de que esto está estableciendo correctamente el estado a true
  };
  
  
  

  const handleOpenAnalyzeModal = (crypto) => {
    setSelectedCrypto(crypto);
    const relevantEntries = cryptos.filter(c => c.id === crypto.id);
    const totalPaid = relevantEntries.reduce((acc, curr) => acc + (curr.dailyPrice * curr.amount), 0);
    const totalAmount = relevantEntries.reduce((acc, curr) => acc + curr.amount, 0);
    const average = totalAmount > 0 ? (totalPaid / totalAmount) : 0;
    setAveragePrice(average);
    setSourceDetails(relevantEntries.flatMap(c => c.sources));
    setShowAnalyzeModal(true);
  };

  const handleOpenAlertModal = (crypto) => {
    setSelectedCrypto(crypto);
    setShowAlertModal(true);
  };

  const handleSellCrypto = async (amountToSell) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

    try {
      await axios.delete(`${backendUrl}/portfolio/sell`, {
        data: { userId, cryptoId: selectedCrypto.id, amount: amountToSell },
        headers: { Authorization: `Bearer ${token}` }
      });

      setCryptos(cryptos.map(crypto => {
        if (crypto.id === selectedCrypto.id) {
          const newTotalAmount = crypto.total_amount - amountToSell;
          return { ...crypto, 
                   total_amount: newTotalAmount, 
                   total_value: newTotalAmount * crypto.current_price
                 };
        }
        return crypto;
      }).filter(crypto => crypto.total_amount > 0));

      setShowSellModal(false);
    } catch (error) {
      console.error('Error selling crypto:', error);
      alert("Failed to sell crypto: " + error.response.data.message);
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }


  return (
    <div className="holdings-container">
      <Header />
      <div className="header-controls">
        <img className="logo-image" src="logo1.png" alt="Logo" />
        <p className="total-holdings-value">
          {totalHoldings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
        </p>
        <button className="chart-button" onClick={() => setShowTotalModal(true)}>
          <FontAwesomeIcon icon={faChartPie} />
        </button>
      </div>

      <table className="crypto-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <img className="crypto-imagen" src={crypto.image} alt={crypto.name} />
              </td>
              <td>{crypto.id}</td>
              <td>{crypto.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="crypto-amount">{crypto.total_amount}</td>
              <td className="crypto-pricee">{(crypto.current_price * crypto.total_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              <td className="crypto-actions">
                <button className="icon-button" onClick={() => handleOpenSellModal(crypto)}>
                  <FontAwesomeIcon icon={faDollarSign} />
                </button>
                <button className="icon-button" onClick={() => handleOpenAnalyzeModal(crypto)}>
                  <FontAwesomeIcon icon={faChartLine} />
                </button>
                <button className="icon-button" onClick={() => handleOpenAlertModal(crypto)}>
                  <FontAwesomeIcon icon={faBell} />
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4"><hr /></td>
            <td className="total-amount">
              {totalHoldings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </td>


            <td></td>
          </tr>
          <tr>
            <td colSpan="4"><hr /></td>
            <td className="total-amount">
              {totalHoldingsAverage.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}            </td>
            <td></td>
          </tr>
          <tr>
            <td colSpan="4"><hr /></td>
            <td className="total-amount" style={{ color: totalHoldings > totalHoldingsAverage ? 'green' : 'red' }}>
            {(totalHoldings - totalHoldingsAverage).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

    {showSellModal && (
      <SellModal
        onClose={() => setShowSellModal(false)}
        onConfirm={handleSellCrypto}
        crypto={selectedCrypto}
        cryptos={cryptos}
        sources={sourceDetails}
        averagePrice={averagePrice}
      />
    )}
    {showAnalyzeModal && (
      <AnalyzeModal
        onClose={() => setShowAnalyzeModal(false)}
        averagePrice={averagePrice}
        crypto={selectedCrypto}
        sources={sourceDetails}
        cryptos={cryptos}
      />
    )}
    {showTotalModal && (
      <TotalModal
        onClose={() => setShowTotalModal(false)}
        cryptos={cryptos}
        totalHoldings={totalHoldings}
      />
    )}
    {showAlertModal && (
      <AlertModal
        onClose={() => setShowAlertModal(false)}
        crypto={selectedCrypto}
      />
    )}
  </div>
);
}

export default Holdings;