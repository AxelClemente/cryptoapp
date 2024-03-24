import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';

function SamplePortfolio() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0); // Estado para almacenar el valor total


  const sampleData = [
    { id: 'bitcoin', name: 'Bitcoin', amount: 0.1321 },
    { id: 'ronin', name: 'Ronin', amount: 3732 },
    { id: 'ethereum', name: 'Ethereum', amount: 2.067 },
    { id: 'usd-coin', name: 'USDC', amount: 2864 },
    { id: 'pixel', name: 'Pixel', amount: 1157 },
    { id: 'matic-network', name: 'Polygon', amount: 794 },
    { id: 'crypto-com-chain', name: 'Cronos', amount: 5093 },
    { id: 'avalanche-2', name: 'Avalanche', amount: 12.898 },
    { id: 'solana', name: 'Solana', amount: 2.25 },
    { id: 'looks', name: 'Looks', amount: 2720 },
    { id: 'shiba-inu', name: 'Shiba Inu', amount: 8131357 },
    { id: 'the-sandbox', name: 'The Sandbox', amount: 331 },
    { id: 'tether', name: 'Tether', amount: 84 },
    { id: 'binancecoin', name: 'BNB', amount: 0.5 },
    { id: 'pepe', name: 'Pepe', amount: 4591446.167 },
    { id: 'decentraland', name: 'Decentraland', amount: 27 },
    { id: 'apecoin', name: 'Apecoin', amount: 5.56 },
    // Agrega más criptomonedas de ejemplo aquí
  ];
  
  
  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const marketResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: sampleData.map(crypto => crypto.id).join(','),
            order: 'market_cap_desc',
            per_page: sampleData.length,
            page: 1,
          },
        });
        
        const updatedCryptos = sampleData.map(crypto => {
          const marketInfo = marketResponse.data.find(item => item.id === crypto.id);
          return {
            ...crypto,
            current_price: marketInfo ? marketInfo.current_price : 0,
            image: marketInfo ? marketInfo.image : 'path/to/default/image',
          };
        });
  
        // Calcula el valor total aquí, después de formar updatedCryptos y antes de llamar a setCryptos
        const total = updatedCryptos.reduce((acc, crypto) => acc + (crypto.current_price * crypto.amount), 0);
        setTotalValue(total); // Actualiza el estado totalValue con el valor calculado
  
        setCryptos(updatedCryptos); // Ahora actualiza el estado cryptos con los datos actualizados
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchMarketData();
    // eslint-disable-next-line
  }, []); // Asegúrate de que sampleData no cambie, de lo contrario, deberías incluirlo en el array de dependencias
  

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="mx-[210px]">
      <Header />
      {/* Muestra el valor total */}
      <div className="flex justify-end items-center mb-4">
        <img className="h-16 w-16 flex-none rounded-full" src="/bolsa1.png" alt="Total Holdings" />
        <div className="text-lg font-semibold">
          Total: {totalValue.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
        </div>
      </div>
      <ul className="divide-y divide-gray-100">
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full" src={crypto.image} alt={crypto.name} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{crypto.name}</p>
                <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                  {crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })} - Amount: {crypto.amount}
                </p>
              </div>
            </div>
            <div className="mt-1 text-s leading-5 text-gray-500">
              <span>
                {/* Aquí implementas la lógica para cambiar el color basado en alguna condición, si es necesario */}
                <span>
                  ${(crypto.current_price * crypto.amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SamplePortfolio;
