// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from '../Modal/Modal';
// import Header from '../../Header';
// import '../Portfolio/portfolio.css';

// const CACHE_TIME = 7 * 60 * 1000; // 7 minutos en milisegundos para la caché

// const Portfolio = () => {
//     const [cryptos, setCryptos] = useState([]);
//     const [filteredCryptos, setFilteredCryptos] = useState([]); // Estado para los cryptos filtrados
//     const [search, setSearch] = useState('');  // Estado para controlar el input del search bar
//     const [lastFetchTime, setLastFetchTime] = useState(0);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedCryptoId, setSelectedCryptoId] = useState('');
//     const [selectedCryptoPrice, setSelectedCryptoPrice] = useState(0);
//     const [amount, setAmount] = useState(1);
//     const [source, setSource] = useState('');

//     useEffect(() => {
//         const now = new Date().getTime();

//         if (now - lastFetchTime < CACHE_TIME && cryptos.length) {
//             return;  // Usa la caché si está disponible y es reciente
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             return;
//         }

//         const fetchData = async () => {
//             const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
//             try {
//                 const response = await axios.get(`${backendUrl}/portfolio/markets`, {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 setCryptos(response.data);
//                 setFilteredCryptos(response.data);  // Inicializa los cryptos filtrados con todos los cryptos
//                 setLastFetchTime(now);
//             } catch (error) {
//                 console.error('Error fetching data from the API', error);
//             }
//         };

//         fetchData();
//     }, [cryptos, lastFetchTime]);

//     useEffect(() => {
//         const results = cryptos.filter(crypto =>
//             crypto.name.toLowerCase().includes(search.toLowerCase())
//         );
//         setFilteredCryptos(results);
//     }, [search, cryptos]);

//     const handleOpenModal = (cryptoId) => {
//         const crypto = cryptos.find(c => c.id === cryptoId);
//         if (crypto) {
//             setSelectedCryptoId(cryptoId);
//             setSelectedCryptoPrice(crypto.current_price);
//             setShowModal(true);
//         }
//     };

//     const handleAddToPortfolio = async () => {
//         const userId = localStorage.getItem('userId');
//         const token = localStorage.getItem('token');
//         const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

//         try {
//             const response = await axios.post(`${backendUrl}/portfolio/add`, {
//                 userId,
//                 source,
//                 cryptoId: selectedCryptoId,
//                 dailyPrice: selectedCryptoPrice,
//                 amount,
//             }, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             console.log("Response from server:", response.data); // Aquí se muestra la respuesta del servidor en la consola
//             setShowModal(false);
//         } catch (error) {
//             console.error('Error adding to portfolio', error);
//         }
//     };

//     return (
//         <div className="portfolio-container">
//             <Header/>
//             <div className="search-bar">
//               <input
//                   type="text"
//                   placeholder="Search Cryptocurrency"
//                   value={search}
//                   onChange={e => setSearch(e.target.value)}                 
//               />
//             </div>


//             <ul className="crypto-list">
//                 {filteredCryptos.map((crypto, index) => (
//                     <li key={crypto.id} className="crypto-item">
//                         <span className="crypto-index">{index + 1} </span>
//                         <div className="crypto-info">
//                             <img className="crypto-image" src={crypto.image} alt={crypto.name} />
//                             <div className="all">
//                                 <p className="crypto-name">{crypto.name.slice(0, 10)}</p>
//                                 <p className="crypto-price">{crypto.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' })}</p>
//                             </div>
//                             <span  className='crypto-change' style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
//                               {crypto.price_change_percentage_24h.toFixed(2)}%
//                             </span> 
//                         </div>
//                         <div className="crypto-details">
//                             <p className="crypto-ath">ATH -{crypto.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
//                             <button onClick={() => handleOpenModal(crypto.id)} className="add-button">
//                                 Agregar
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>

//             {showModal && (
//                 <Modal
//                     onClose={() => setShowModal(false)}
//                     amount={amount}
//                     setAmount={setAmount}
//                     currentPrice={selectedCryptoPrice}
//                     cryptoName={selectedCryptoId}
//                     source={source}
//                     setSource={setSource}
//                     onConfirm={handleAddToPortfolio}
//                 />
//             )}
//         </div>
//     );
// };

// export default Portfolio;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Header from '../../Header';
import '../Portfolio/portfolio.css';

const CACHE_TIME = 7 * 60 * 1000; // 7 minutos en milisegundos para la caché

const Portfolio = () => {
    const [cryptos, setCryptos] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([]);
    const [search, setSearch] = useState('');
    const [lastFetchTime, setLastFetchTime] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedCryptoId, setSelectedCryptoId] = useState('');
    const [selectedCryptoPrice, setSelectedCryptoPrice] = useState(0);
    const [amount, setAmount] = useState(1);
    const [source, setSource] = useState('');
    const [marketCap, setMarketCap] = useState('Loading...'); // Estado para almacenar el Market Cap

    useEffect(() => {
        const now = new Date().getTime();
        if (now - lastFetchTime < CACHE_TIME && cryptos.length) {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const fetchData = async () => {
            const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";
            try {
                const response = await axios.get(`${backendUrl}/portfolio/markets`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCryptos(response.data);
                setFilteredCryptos(response.data);
                setLastFetchTime(now);

                // Obtener Market Cap global
                const marketCapResponse = await axios.get(`${backendUrl}/portfolio/global-market-cap`);
                console.log("Market Cap data received:", marketCapResponse.data); // Aquí se registra la respuesta del Market Cap
                setMarketCap(marketCapResponse.data.marketCap);
            } catch (error) {
                console.error('Error fetching data from the API', error);
                setMarketCap('Failed to load');
            }
        };

        fetchData();
    }, [cryptos, lastFetchTime]);

    useEffect(() => {
        const results = cryptos.filter(crypto => crypto.name.toLowerCase().includes(search.toLowerCase()));
        setFilteredCryptos(results);
    }, [search, cryptos]);

    const handleOpenModal = (cryptoId) => {
        const crypto = cryptos.find(c => c.id === cryptoId);
        if (crypto) {
            setSelectedCryptoId(cryptoId);
            setSelectedCryptoPrice(crypto.current_price);
            setShowModal(true);
        }
    };

    const handleAddToPortfolio = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const backendUrl = process.env.REACT_APP_URL || "http://localhost:3000";

        try {
            const response = await axios.post(`${backendUrl}/portfolio/add`, {
                userId,
                source,
                cryptoId: selectedCryptoId,
                dailyPrice: selectedCryptoPrice,
                amount,
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log("Response from server:", response.data);
            setShowModal(false);
        } catch (error) {
            console.error('Error adding to portfolio', error);
        }
    };

    return (
        <div className="portfolio-container">
            <Header/>
        <div className="search-bar">
            <input
                type="text"
                placeholder=""
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '30px' }}  // Deja espacio para el ícono
            />
            <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </span>
        </div>
            <div className="market-cap-container">
                <img src="world.png" alt="Global Market" className="market-cap-icon"/>
                <div>
                    <p className="market-cap-title">Market Cap</p>
                    <p className="market-cap-value">{marketCap}</p> {/* Mostrar el Market Cap aquí */}
                </div>
            </div>
            <ul className="crypto-list">
                {filteredCryptos.map((crypto, index) => (
                    <li key={crypto.id} className="crypto-item">
                        <span className="crypto-index">{index + 1} </span>
                        <div className="crypto-info">
                            <img className="crypto-image" src={crypto.image} alt={crypto.name} />
                            <div className="all">
                                <p className="crypto-name">{crypto.name.slice(0, 10)}</p>
                                <p className="crypto-price">{crypto.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' })}</p>
                            </div>
                            <span className='crypto-change' style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                              {crypto.price_change_percentage_24h.toFixed(2)}%
                            </span> 
                        </div>
                        <div className="crypto-details">
                            <p className="crypto-ath">ATH -{crypto.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                            <button onClick={() => handleOpenModal(crypto.id)} className="add-button">
                                Agregar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {showModal && (
                <Modal
                    onClose={() => setShowModal(false)}
                    amount={amount}
                    setAmount={setAmount}
                    currentPrice={selectedCryptoPrice}
                    cryptoName={selectedCryptoId}
                    source={source}
                    setSource={setSource}
                    onConfirm={handleAddToPortfolio}
                />
            )}
        </div>
    );
};

export default Portfolio;
