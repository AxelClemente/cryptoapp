import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import SellModal from '../SellModal/SellModal';
import AnalyzeModal from '../Holdings/AnalyzeModal';
import '../Holdings/holdings.css';

// function Holdings() {
//   const [cryptos, setCryptos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalHoldings, setTotalHoldings] = useState(0);
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
//   const [selectedCrypto, setSelectedCrypto] = useState({});
//   const [averagePrice, setAveragePrice] = useState(0);

//   useEffect(() => {
//     const fetchPortfolioAndMarketData = async () => {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         setIsLoading(false);
//         return;
//       }
//       const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       try {
//         const [portfolioRes, marketRes] = await Promise.all([
//           axios.get(`${backendUrl}/api/holdings`, config),
//           axios.get(`${backendUrl}/portfolio/markets`, config)
//         ]);
//         const cryptosData = portfolioRes.data.cryptos.reduce((acc, crypto) => {
//           const marketCrypto = marketRes.data.find(m => m.id === crypto.id);
//           const existing = acc.find(c => c.id === crypto.id);
//           if (existing) {
//             existing.amount += crypto.amount;
//             existing.total_value += crypto.amount * (marketCrypto ? marketCrypto.current_price : 0);
//           } else {
//             acc.push({
//               ...crypto,
//               ...marketCrypto,
//               total_value: crypto.amount * (marketCrypto ? marketCrypto.current_price : 0)
//             });
//           }
//           return acc;
//         }, []);

//         setCryptos(cryptosData);
//         setTotalHoldings(cryptosData.reduce((acc, crypto) => acc + crypto.total_value, 0));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPortfolioAndMarketData();
//   }, []);

//   const handleOpenSellModal = (crypto) => {
//     setSelectedCrypto(crypto);
//     setShowSellModal(true);
//   };

//   const handleOpenAnalyzeModal = (crypto) => {
//     setSelectedCrypto(crypto);
//     const relevantEntries = cryptos.filter(c => c.id === crypto.id);
//     const totalPaid = relevantEntries.reduce((acc, curr) => acc + (curr.dailyPrice * curr.amount), 0);
//     const totalAmount = relevantEntries.reduce((acc, curr) => acc + curr.amount, 0);
//     const average = totalAmount > 0 ? (totalPaid / totalAmount) : 0;
//     setAveragePrice(average);
//     setShowAnalyzeModal(true);
//   };

//   const handleSellCrypto = async (amountToSell) => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');
//     const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

//     try {
//       await axios.delete(`${backendUrl}/portfolio/sell`, {
//         data: { userId, cryptoId: selectedCrypto.id, amount: amountToSell },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCryptos(cryptos.map(crypto => {
//         if (crypto.id === selectedCrypto.id) {
//           const newAmount = crypto.amount - amountToSell;
//           return { ...crypto, amount: newAmount, total_value: newAmount * crypto.current_price };
//         }
//         return crypto;
//       }).filter(crypto => crypto.amount > 0));
//       setShowSellModal(false);
//     } catch (error) {
//       console.error('Error selling crypto:', error);
//       alert("Failed to sell crypto: " + error.response.data.message);
//     }
//   };

//   if (isLoading) {
//     return <div className="loading">Cargando...</div>;
//   }

//   return (
//     <div className="container">
//       <Header/>
//       <div className="total-holdings">
//         <img className="holdings-image" src="logo1.png" alt="Holdings" />
//         <div className="total-value">
//           Total: {totalHoldings.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
//         </div>
//       </div>
//       <ul className="crypto-list">
//         {cryptos.map((crypto) => (
//           <li key={crypto.id} className="crypto-item">
//             <div>
//               <img className="crypto-image" src={crypto.image} alt={crypto.name} />
//               <div className="crypto-info">
//                 <p className="crypto-name">{crypto.name}</p>
//                 <p className="crypto-details">
//                   {crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
//                   <span className="crypto-qty"> QTY: {crypto.amount}</span>
//                 </p>
//                 <p className="crypto-value">Total: ${crypto.total_value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
//               </div>
//             </div>
//             <div>
//               <button className="sell-button" onClick={() => handleOpenSellModal(crypto)}>Vender</button>
//               <button className="analyze-button" onClick={() => handleOpenAnalyzeModal(crypto)}>Analizar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {showSellModal && (
//         <SellModal
//           onClose={() => setShowSellModal(false)}
//           onConfirm={handleSellCrypto}
//           crypto={selectedCrypto}
//         />
//       )}
//       {showAnalyzeModal && (
//         <AnalyzeModal
//           onClose={() => setShowAnalyzeModal(false)}
//           averagePrice={averagePrice}
//           crypto={selectedCrypto}
//         />
//       )}
//     </div>
//   );
// }

// export default Holdings;


// function Holdings() {
//   const [cryptos, setCryptos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalHoldings, setTotalHoldings] = useState(0);
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
//   const [selectedCrypto, setSelectedCrypto] = useState({});
//   const [averagePrice, setAveragePrice] = useState(0);

//   useEffect(() => {
//     const fetchPortfolioAndMarketData = async () => {
//       setIsLoading(true);
//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('No token found');
//         setIsLoading(false);
//         return;
//       }
//       const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
//       const config = { headers: { Authorization: `Bearer ${token}` } };

//       try {
//         const [portfolioRes, marketRes] = await Promise.all([
//           axios.get(`${backendUrl}/api/holdings`, config),
//           axios.get(`${backendUrl}/portfolio/markets`, config)
//         ]);
//         const cryptosData = portfolioRes.data.cryptos.reduce((acc, crypto) => {
//           const marketCrypto = marketRes.data.find(m => m.id === crypto.id);
//           const existing = acc.find(c => c.id === crypto.id);
//           if (existing) {
//             existing.amount += crypto.amount;
//             existing.total_value += crypto.amount * (marketCrypto ? marketCrypto.current_price : 0);
//           } else {
//             acc.push({
//               ...crypto,
//               ...marketCrypto,
//               total_value: crypto.amount * (marketCrypto ? marketCrypto.current_price : 0),
//               source: crypto.source  // Asegúrate de incluir 'source' aquí
//             });
//           }
//           return acc;
//         }, []);

//         setCryptos(cryptosData);
//         setTotalHoldings(cryptosData.reduce((acc, crypto) => acc + crypto.total_value, 0));
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPortfolioAndMarketData();
//   }, []);

//   const handleOpenSellModal = (crypto) => {
//     setSelectedCrypto(crypto);
//     setShowSellModal(true);
//   };

//   const handleOpenAnalyzeModal = (crypto) => {
//     setSelectedCrypto(crypto);
//     const relevantEntries = cryptos.filter(c => c.id === crypto.id);
//     const totalPaid = relevantEntries.reduce((acc, curr) => acc + (curr.dailyPrice * curr.amount), 0);
//     const totalAmount = relevantEntries.reduce((acc, curr) => acc + curr.amount, 0);
//     const average = totalAmount > 0 ? (totalPaid / totalAmount) : 0;
//     setAveragePrice(average);
//     setShowAnalyzeModal(true);
//   };

//   const handleSellCrypto = async (amountToSell) => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId');
//     const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

//     try {
//       await axios.delete(`${backendUrl}/portfolio/sell`, {
//         data: { userId, cryptoId: selectedCrypto.id, amount: amountToSell },
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setCryptos(cryptos.map(crypto => {
//         if (crypto.id === selectedCrypto.id) {
//           const newAmount = crypto.amount - amountToSell;
//           return { ...crypto, amount: newAmount, total_value: newAmount * crypto.current_price };
//         }
//         return crypto;
//       }).filter(crypto => crypto.amount > 0));
//       setShowSellModal(false);
//     } catch (error) {
//       console.error('Error selling crypto:', error);
//       alert("Failed to sell crypto: " + error.response.data.message);
//     }
//   };

//   if (isLoading) {
//     return <div className="loading">Cargando...</div>;
//   }

//   return (
//     <div className="container">
//       <Header/>
//       <div className="total-holdings">
//         <img className="holdings-image" src="logo1.png" alt="Holdings" />
//         <div className="total-value">
//           Total: {totalHoldings.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
//         </div>
//       </div>
//       <ul className="crypto-list">
//         {cryptos.map((crypto) => (
//           <li key={crypto.id} className="crypto-item">
//             <div>
//               <img className="crypto-image" src={crypto.image} alt={crypto.name} />
//               <div className="crypto-info">
//                 <p className="crypto-name">{crypto.name}</p>
//                 <p className="crypto-details">
//                   {crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
//                   <span className="crypto-qty"> QTY: {crypto.amount}</span>
//                 </p>
//                 <p className="crypto-value">Total: ${crypto.total_value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
//               </div>
//             </div>
//             <div>
//               <button className="sell-button" onClick={() => handleOpenSellModal(crypto)}>Vender</button>
//               <button className="analyze-button" onClick={() => handleOpenAnalyzeModal(crypto)}>Analizar</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {showSellModal && (
//         <SellModal
//           onClose={() => setShowSellModal(false)}
//           onConfirm={handleSellCrypto}
//           crypto={selectedCrypto}
//         />
//       )}
//       {showAnalyzeModal && (
//         <AnalyzeModal
//           onClose={() => setShowAnalyzeModal(false)}
//           averagePrice={averagePrice}
//           crypto={selectedCrypto}
//         />
//       )}
//     </div>
//   );
// }

// export default Holdings;

function Holdings() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalHoldings, setTotalHoldings] = useState(0);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [averagePrice, setAveragePrice] = useState(0);
  const [sourceDetails, setSourceDetails] = useState([]);

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
        const cryptosData = portfolioRes.data.cryptos.reduce((acc, crypto) => {
          const marketCrypto = marketRes.data.find(m => m.id === crypto.id) || {};
          const existing = acc.find(c => c.id === crypto.id);
          if (existing) {
            existing.total_amount += crypto.amount;
            existing.sources.push({ source: crypto.source, amount: crypto.amount });
          } else {
            acc.push({
              ...crypto,
              current_price: marketCrypto.current_price || 0,
              image: marketCrypto.image || 'path/to/default/image',
              total_amount: crypto.amount,
              sources: [{ source: crypto.source, amount: crypto.amount }]
            });
          }
          return acc;
        }, []);

        setCryptos(cryptosData);
        setTotalHoldings(cryptosData.reduce((acc, crypto) => acc + (crypto.current_price * crypto.total_amount), 0));
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
    <div className="container">
      <Header/>
      <div className="total-holdings">
        <img className="holdings-image" src="logo1.png" alt="Holdings" />
        <div className="total-value">
          Total: {totalHoldings.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
        </div>
      </div>
      <ul className="crypto-list">
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="crypto-item">
            <div>
              <img className="crypto-image" src={crypto.image} alt={crypto.name} />
              <div className="crypto-info">
                <p className="crypto-name">{crypto.name}</p>
                <p className="crypto-details">
                  {crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                  <span className="crypto-qty"> QTY: {crypto.total_amount}</span>
                </p>
                <p className="crypto-value">Total: ${(crypto.current_price * crypto.total_amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}</p>
              </div>
            </div>
            <div>
              <button className="sell-button" onClick={() => handleOpenSellModal(crypto)}>Vender</button>
              <button className="analyze-button" onClick={() => handleOpenAnalyzeModal(crypto)}>Analizar</button>
            </div>
          </li>
        ))}
      </ul>
      {showSellModal && (
        <SellModal
          onClose={() => setShowSellModal(false)}
          onConfirm={handleSellCrypto}
          crypto={selectedCrypto}
        />
      )}
      {showAnalyzeModal && (
        <AnalyzeModal
          onClose={() => setShowAnalyzeModal(false)}
          averagePrice={averagePrice}
          crypto={selectedCrypto}
          sources={sourceDetails}
        />
      )}
    </div>
  );
}

export default Holdings;
