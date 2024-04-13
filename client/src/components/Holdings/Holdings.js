// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Header from '../../Header';
// import SellModal from '../SellModal/SellModal'; // Importamos el componente modal de venta
// import '../Holdings/holdings.css'


// function Holdings() {
//   const [cryptos, setCryptos] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalHoldings, setTotalHoldings] = useState(0);
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [selectedCrypto, setSelectedCrypto] = useState({});

//   useEffect(() => {
//     const fetchPortfolioAndMarketData = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           setIsLoading(false);
//           return;
//         }
//         const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
//         const config = { headers: { Authorization: `Bearer ${token}` } };
        
//         const portfolioResponse = await axios.get(`${backendUrl}/api/holdings`, config);
//         if (portfolioResponse.data.cryptos && portfolioResponse.data.cryptos.length > 0) {
//           const marketResponse = await axios.get(`${backendUrl}/portfolio/markets`, config);
//           const portfolioIDs = portfolioResponse.data.cryptos.map(crypto => crypto.id);
//           const filteredMarketData = marketResponse.data.filter(crypto => portfolioIDs.includes(crypto.id));
//           const enrichedCryptos = portfolioResponse.data.cryptos.map(crypto => {
//             const marketCrypto = filteredMarketData.find(m => m.id === crypto.id);
//             return { ...crypto, ...marketCrypto };
//           });

//           setTotalHoldings(enrichedCryptos.reduce((acc, crypto) => acc + (crypto.current_price * crypto.amount), 0));
//           setCryptos(enrichedCryptos);
//         }
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

//   const handleSellCrypto = async (amountToSell) => {
//     const token = localStorage.getItem('token');
//     const userId = localStorage.getItem('userId'); // Asegúrate de que el userId se almacena en localStorage al iniciar sesión
//     const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

//     try {
//         await axios.delete(`${backendUrl}/portfolio/sell`, {
//             data: { userId, cryptoId: selectedCrypto.id, amount: amountToSell },
//             headers: { Authorization: `Bearer ${token}` }
//         });

//         setShowSellModal(false);
//         // Actualizar el estado local para reflejar el cambio
//         setCryptos(cryptos.map(crypto => {
//             if (crypto.id === selectedCrypto.id) {
//                 const updatedAmount = crypto.amount - amountToSell;
//                 return { ...crypto, amount: updatedAmount > 0 ? updatedAmount : 0 };
//             }
//             return crypto;
//         }));
//     } catch (error) {
//         console.error('Error selling crypto:', error);
//         alert("Failed to sell crypto: " + error.response.data.message);
//     }
// };


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
//                   {crypto.current_price > 0 
//                     ? crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
//                     : 'Precio no disponible'}
//                   <span className="crypto-qty"> QTY: {crypto.amount}</span>
//                 </p>
//               </div>
//             </div>
//             <div>
//               <span className="rounded-md px-2 py-1 text-xs font-medium ml-2  hover:text-blue-700 cursor-pointer"
//                     style={{ backgroundColor: '#f7931a', color: '#ffffff', borderColor: 'rgba(247,147,26,0.4)' }}
//                     onClick={() => handleOpenSellModal(crypto)}>
//                 Vender
//               </span>
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
//     </div>
//   );
  
// }

// export default Holdings;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import SellModal from '../SellModal/SellModal';
import AnalyzeModal from '../Holdings/AnalyzeModal';
import '../Holdings/holdings.css';

function Holdings() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalHoldings, setTotalHoldings] = useState(0);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showAnalyzeModal, setShowAnalyzeModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState({});
  const [averagePrice, setAveragePrice] = useState(0);

  useEffect(() => {
    const fetchPortfolioAndMarketData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setIsLoading(false);
        return;
      }
      const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const portfolioResponse = await axios.get(`${backendUrl}/api/holdings`, config);
      if (portfolioResponse.data.cryptos && portfolioResponse.data.cryptos.length > 0) {
        const marketResponse = await axios.get(`${backendUrl}/portfolio/markets`, config);
        const portfolioIDs = portfolioResponse.data.cryptos.map(crypto => crypto.id);
        const filteredMarketData = marketResponse.data.filter(crypto => portfolioIDs.includes(crypto.id));
        const enrichedCryptos = portfolioResponse.data.cryptos.map(crypto => {
          const marketCrypto = filteredMarketData.find(m => m.id === crypto.id);
          return { ...crypto, ...marketCrypto };
        });

        setTotalHoldings(enrichedCryptos.reduce((acc, crypto) => acc + (crypto.current_price * crypto.amount), 0));
        setCryptos(enrichedCryptos);
      }
      setIsLoading(false);
    };

    fetchPortfolioAndMarketData();
  }, []);

  const handleOpenSellModal = (crypto) => {
    setSelectedCrypto(crypto);
    setShowSellModal(true);
  };

  const handleOpenAnalyzeModal = (crypto) => {
    setSelectedCrypto(crypto);
    calculateAveragePrice(crypto.id);
    setShowAnalyzeModal(true);
  };

  const calculateAveragePrice = (cryptoId) => {
    const relevantEntries = cryptos.filter(c => c.id === cryptoId);
    const totalPaid = relevantEntries.reduce((acc, curr) => acc + (curr.dailyPrice * curr.amount), 0);
    const totalAmount = relevantEntries.reduce((acc, curr) => acc + curr.amount, 0);
    const average = totalAmount > 0 ? (totalPaid / totalAmount) : 0;
    setAveragePrice(average);
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

      setShowSellModal(false);
      setCryptos(cryptos.map(crypto => {
        if (crypto.id === selectedCrypto.id) {
          const updatedAmount = crypto.amount - amountToSell;
          return { ...crypto, amount: updatedAmount > 0 ? updatedAmount : 0 };
        }
        return crypto;
      }));
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
          <li key={crypto._id} className="crypto-item">
            <div>
              <img className="crypto-image" src={crypto.image} alt={crypto.name} />
              <div className="crypto-info">
                <p className="crypto-name">{crypto.name}</p>
                <p className="crypto-details">
                  {crypto.current_price > 0 
                    ? crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
                    : 'Precio no disponible'}
                  <span className="crypto-qty"> QTY: {crypto.amount}</span>
                </p>
              </div>
            </div>
            <div>
              <span className="sell-button" onClick={() => handleOpenSellModal(crypto)}>Vender</span>
              <span className="analyze-button" onClick={() => handleOpenAnalyzeModal(crypto)}>Analizar</span>
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
        />
      )}
    </div>
  );
}

export default Holdings;