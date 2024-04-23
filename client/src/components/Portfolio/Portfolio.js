import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import Header from '../../Header';
import '../Portfolio/portfolio.css';

const CACHE_TIME = 7 * 60 * 1000; // 7 minutos en milisegundos para la caché

const Portfolio = () => {
    const [cryptos, setCryptos] = useState([]);
    const [filteredCryptos, setFilteredCryptos] = useState([]); // Estado para los cryptos filtrados
    const [search, setSearch] = useState('');  // Estado para controlar el input del search bar
    const [lastFetchTime, setLastFetchTime] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedCryptoId, setSelectedCryptoId] = useState('');
    const [selectedCryptoPrice, setSelectedCryptoPrice] = useState(0);
    const [amount, setAmount] = useState(1);
    const [source, setSource] = useState('');

    useEffect(() => {
        const now = new Date().getTime();

        if (now - lastFetchTime < CACHE_TIME && cryptos.length) {
            return;  // Usa la caché si está disponible y es reciente
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
                setFilteredCryptos(response.data);  // Inicializa los cryptos filtrados con todos los cryptos
                setLastFetchTime(now);
            } catch (error) {
                console.error('Error fetching data from the API', error);
            }
        };

        fetchData();
    }, [cryptos, lastFetchTime]);

    useEffect(() => {
        const results = cryptos.filter(crypto =>
            crypto.name.toLowerCase().includes(search.toLowerCase())
        );
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
            console.log("Response from server:", response.data); // Aquí se muestra la respuesta del servidor en la consola
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
                  placeholder="Search Cryptocurrency"
                  value={search}
                  onChange={e => setSearch(e.target.value)}                 
              />
            </div>


            <ul className="crypto-list">
                {filteredCryptos.map((crypto, index) => (
                    <li key={crypto.id} className="crypto-item">
                        <span className="crypto-index">{index + 1}. </span>
                        <div className="crypto-info">
                            <img className="crypto-image" src={crypto.image} alt={crypto.name} />
                            <div className="all">
                                <p className="crypto-name">{crypto.name}</p>
                                <p className="crypto-price">{crypto.current_price.toLocaleString('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' })}</p>
                            </div>
                            <span  className='crypto-change' style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : 'green' }}>
                              {crypto.price_change_percentage_24h.toFixed(2)}%
                            </span> 
                        </div>
                        <div className="crypto-details">
                            <p className="crypto-ath">ATH - ${crypto.ath.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
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
