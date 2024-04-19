// import React from 'react';
// // import '../Holdings/totalmodal.css';  // Asegúrate de tener los estilos apropiados

// const TotalModal = ({ onClose, cryptos, totalHoldings }) => {
//   const sortedCryptos = cryptos.map(crypto => ({
//     ...crypto,
//     value: crypto.current_price * crypto.total_amount,
//     percentage: (crypto.current_price * crypto.total_amount / totalHoldings * 100)
//   })).sort((a, b) => b.percentage - a.percentage);  // Ordenando de mayor a menor porcentaje

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">Total Holdings Breakdown</h3>
//           <button className="close-button" onClick={onClose}>&times;</button>
//         </div>
//         <div className="modal-body">
//           <ul>
//             {sortedCryptos.map(crypto => (
//               <li key={crypto.id}>
//                 {crypto.name} ({crypto.symbol.toUpperCase()}) - {crypto.percentage.toFixed(2)}%: 
//                 ${(crypto.value).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalModal;

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// // import '../Holdings/totalmodal.css';

// const TotalModal = ({ onClose, cryptos, totalHoldings }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);  // Ref para guardar la instancia del gráfico

//   useEffect(() => {
//     const sortedCryptos = cryptos.map(crypto => ({
//       ...crypto,
//       value: crypto.current_price * crypto.total_amount,
//       percentage: (crypto.current_price * crypto.total_amount / totalHoldings * 100)
//     })).sort((a, b) => b.percentage - a.percentage);

//     const ctx = chartRef.current.getContext('2d');

//     // Destruye la instancia anterior del gráfico si existe
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     // Crea una nueva instancia del gráfico
//     chartInstance.current = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: sortedCryptos.map(crypto => crypto.name + ` (${crypto.symbol.toUpperCase()})`),
//         datasets: [{
//           label: 'Portfolio Distribution',
//           data: sortedCryptos.map(crypto => crypto.value),
//           backgroundColor: sortedCryptos.map(crypto => '#' + Math.floor(Math.random()*16777215).toString(16)), // Colores aleatorios
//           hoverOffset: 4
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//         }
//       }
//     });

//     // Cleanup function para destruir el gráfico cuando el componente se desmonte
//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [cryptos, totalHoldings]);  // Dependencias del useEffect

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <h3 className="modal-title">Total Holdings Breakdown</h3>
//           <button className="close-button" onClick={onClose}>&times;</button>
//         </div>
//         <div className="modal-body">
//           <canvas ref={chartRef} aria-label="Portfolio Distribution" role="img"></canvas>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TotalModal;

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';
// // import '../Holdings/totalmodal.css';

// const TotalModal = ({ onClose, cryptos, totalHoldings }) => {
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);
  
//     useEffect(() => {
//       if (cryptos.length === 0) return;  // Asegura que no intentamos construir el gráfico sin datos.
  
//       const sortedCryptos = cryptos
//         .map(crypto => ({
//           ...crypto,
//           value: crypto.current_price * crypto.total_amount,
//           percentage: (crypto.current_price * crypto.total_amount / totalHoldings * 100)
//         }))
//         .sort((a, b) => b.percentage - a.percentage);
  
//       const ctx = chartRef.current.getContext('2d');
//       const data = sortedCryptos.map(crypto => crypto.value);
//       const labels = sortedCryptos.map(crypto => `${crypto.id} (${crypto.symbol.toUpperCase()}) - ${crypto.percentage.toFixed(2)}% `);
  
//       if (chartInstance.current) {
//         chartInstance.current.destroy();  // Destruye la instancia anterior si existe
//       }
  
//       chartInstance.current = new Chart(ctx, {
//         type: 'pie',
//         data: {
//           labels: labels,
//           datasets: [{
//             label: 'Portfolio Distribution',
//             data: data,
//             backgroundColor: sortedCryptos.map(crypto => '#' + Math.floor(Math.random() * 16777215).toString(16)), // Colores aleatorios
//             hoverOffset: 4
//           }]
//         },
//         options: {
//           responsive: true,
//           plugins: {
//             legend: {
//               position: 'top',
//             },
//             tooltip: {
//               callbacks: {
//                 label: function(tooltipItem) {
//                   let label = chartInstance.current.data.labels[tooltipItem.dataIndex];
//                   let value = chartInstance.current.data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
//                   return `${label}: $${value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}`;
//                 }
//               }
//             }
//           }
//         }
//       });
  
//       return () => {
//         if (chartInstance.current) {
//           chartInstance.current.destroy();  // Limpia el gráfico si el componente se desmonta
//         }
//       };
//     }, [cryptos, totalHoldings]);  // Asegura que el efecto se re-ejecuta si cryptos o totalHoldings cambian
  
//     return (
//       <div className="modal-overlay" onClick={onClose}>
//         <div className="modal-content" onClick={e => e.stopPropagation()}>
//           <div className="modal-header">
//             <h3 className="modal-title">Total Holdings Breakdown</h3>
//             <button className="close-button" onClick={onClose}>&times;</button>
//           </div>
//           <div className="modal-body">
//             <canvas ref={chartRef} aria-label="Portfolio Distribution" role="img"></canvas>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default TotalModal;

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
// import '../Holdings/totalmodal.css';

const TotalModal = ({ onClose, cryptos, totalHoldings }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (cryptos.length === 0) return;  // Asegura que no intentamos construir el gráfico sin datos.
  
      const sortedCryptos = cryptos
        .map(crypto => ({
          ...crypto,
          value: crypto.current_price * crypto.total_amount,
          percentage: (crypto.current_price * crypto.total_amount / totalHoldings * 100)
        }))
        .sort((a, b) => b.percentage - a.percentage);
  
      const ctx = chartRef.current.getContext('2d');
      const data = sortedCryptos.map(crypto => crypto.value);
      const labels = sortedCryptos.map(crypto => 
        `${crypto.id} (${crypto.symbol.toUpperCase()}) - ${crypto.percentage.toFixed(2)}% - ${crypto.value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}`
      );
  
      if (chartInstance.current) {
        chartInstance.current.destroy();  // Destruye la instancia anterior si existe
      }
  
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Portfolio Distribution',
            data: data,
            backgroundColor: sortedCryptos.map(crypto => '#' + Math.floor(Math.random() * 16777215).toString(16)), // Colores aleatorios
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem) {
                  let label = chartInstance.current.data.labels[tooltipItem.dataIndex];
                  let value = chartInstance.current.data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
                  return `${label}: $${value.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}`;
                }
              }
            }
          }
        }
      });
  
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();  // Limpia el gráfico si el componente se desmonta
        }
      };
    }, [cryptos, totalHoldings]);  // Asegura que el efecto se re-ejecuta si cryptos o totalHoldings cambian
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3 className="modal-title">Total Holdings Breakdown</h3>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <canvas ref={chartRef} aria-label="Portfolio Distribution" role="img"></canvas>
          </div>
        </div>
      </div>
    );
  };
  
  export default TotalModal;
  