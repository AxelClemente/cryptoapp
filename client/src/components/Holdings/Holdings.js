// import React, { useState, useEffect } from 'react';
// import './holdings.css';
// import axios from 'axios';
// import Header from '../../Header'
// import { useNavigate } from 'react-router-dom';

// function Holdings() {
//   const [cryptos, setCryptos] = useState([]);
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     navigate(-1); // Navega hacia atrás en el historial del navegador
//   };

//   useEffect(() => {
//     const fetchPortfolio = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           return;
//         }
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//         };
//         const response = await axios.get('/api/holdings', config);
//         setCryptos(response.data.cryptos);
//         console.log("1- quiero saber cual es esta respuesta",response.data.cryptos)
//       } catch (error) {
//         console.error('Error fetching portfolio:', error);
//       }
//     };

//     fetchPortfolio();
//   }, []);


//   useEffect(() => {
//     const fetchMarketData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           return;
//         }
//         const config = {
//           headers: { Authorization: `Bearer ${token}` },
//         };
//         // Actualiza la solicitud para obtener datos de tu backend
//         const marketResponse = await axios.get(`${process.env.REACT_APP_URL}/portfolio/markets`, config);
//         console.log("3- Información de la API en Holdings.js", marketResponse.data);
        
//         // Asume que tu backend devuelve los datos en un formato directamente comparable con tu lista de cryptos
//         const enrichedCryptos = cryptos.map(crypto => {
//           const marketCrypto = marketResponse.data.find(marketCrypto => marketCrypto.id === crypto.id);
//           return {
//             ...crypto,
//             name: marketCrypto?.name || 'Nombre no disponible',
//             image: marketCrypto?.image || 'URL de imagen predeterminada',
//             current_price: marketCrypto?.current_price || 0,
//           };
//         });

//         setCryptos(enrichedCryptos);
//       } catch (error) {
//         console.error('Error fetching market data from backend:', error);
//       }
//     };

//     if (cryptos.length > 0) {
//       fetchMarketData();
//     }
//   }, [cryptos]);

  



//   return (
//     <div className="mx-[210px]">
//       <Header handleGoback={handleGoBack}/>
//       <ul className="divide-y divide-gray-100">
//           {cryptos.map((crypto) => (
//             <li key={crypto.id} className="flex justify-between gap-x-6 py-5">
//               <div className="flex min-w-0 gap-x-4">
//                 <img className="h-12 w-12 flex-none rounded-full" src={crypto.image} alt={crypto.name} />
//                 <div className="min-w-0 flex-auto">
//                   <p className="text-sm font-semibold leading-6 text-gray-900">{crypto.name}</p>
//                   <p className="mt-1 truncate text-s leading-5 text-gray-500">
//                     {crypto.current_price > 0 
//                       ? crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
//                       : 'Precio no disponible'} - Cantidad: {crypto.amount}
//                   </p>
//                 </div>
//               </div>
//               <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
//                 {/* Aquí puedes añadir más información o acciones relacionadas con cada criptomoneda si es necesario */}
//               </div>
//             </li>
//           ))}
//         </ul>
//     </div>
//   );
  
  
// }

// export default Holdings;

import React, { useState, useEffect } from 'react';
import './holdings.css';
import axios from 'axios';
import Header from '../../Header';
import { useNavigate } from 'react-router-dom';

function Holdings() {
  const [cryptos, setCryptos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado para controlar la carga
  const [totalHoldings, setTotalHoldings] = useState(0);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchPortfolioAndMarketData = async () => {
      setIsLoading(true); // Inicia la carga
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const portfolioResponse = await axios.get(`${process.env.REACT_APP_URL}/api/holdings`, config);
        console.log("2- Información del backend en Holdings.js", portfolioResponse);
    
        if (portfolioResponse.data.cryptos && portfolioResponse.data.cryptos.length > 0) {
          const marketResponse = await axios.get(`${process.env.REACT_APP_URL}/portfolio/markets`, config);
          console.log("3- Información de la API en Holdings.js", marketResponse.data);
  
          // Filtra la respuesta de la API para incluir solo las criptomonedas en el portafolio del usuario
          const portfolioIDs = portfolioResponse.data.cryptos.map(crypto => crypto.id);
          const filteredMarketData = marketResponse.data.filter(crypto => portfolioIDs.includes(crypto.id));
  
          // Enriquece los datos del portafolio del usuario con la información filtrada de la API
          const enrichedCryptos = portfolioResponse.data.cryptos.map(crypto => {
            const marketCrypto = filteredMarketData.find(marketCrypto => marketCrypto.id === crypto.id);
            return {
              ...crypto,
              name: marketCrypto?.name || 'Nombre no disponible',
              image: marketCrypto?.image || 'URL de imagen predeterminada',
              current_price: marketCrypto?.current_price || 0,
            };
          });

          const total = enrichedCryptos.reduce((acc, crypto) => {
            return acc + (crypto.current_price * crypto.amount);
          }, 0);
  
          setTotalHoldings(total); // Guarda el total en el estado
          setCryptos(enrichedCryptos); // Actualiza el estado con los datos enriquecidos y filtrados
  
          setCryptos(enrichedCryptos); // Actualiza el estado con los datos enriquecidos y filtrados
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };
    
    fetchPortfolioAndMarketData();
  }, []);
  
  
  if (isLoading) {
    return <div className="loading">Cargando...</div>; // O cualquier otro indicador de carga
  }

  return (
    <div className="mx-[210px]">
      <Header handleGoback={handleGoBack}/>
      <ul className="divide-y divide-gray-100">
      <li className="flex justify-end gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-16 w-16 flex-none rounded-full" src="logo1.png" alt="Holdings" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">Holdings</p>
              <p className="mt-1 truncate text-s leading-5 text-gray-500">
                {totalHoldings.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
              </p>
            </div>
          </div>
        </li>
        {cryptos.map((crypto) => (
          <li key={crypto.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full" src={crypto.image} alt={crypto.name} />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{crypto.name}</p>
                <p className="mt-1 truncate text-s leading-5 text-gray-500">
                  {crypto.current_price > 0 
                    ? crypto.current_price.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })
                    : 'Precio no disponible'} - Cantidad: {crypto.amount}
                </p>
              </div>

            </div>
            
            <div className="mt-1 text-s leading-5 text-gray-500">
              <span>               
                <span style={{ color: crypto.price_change_percentage_24h < 0 ? 'red' : '#009393' }}>
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

export default Holdings;

