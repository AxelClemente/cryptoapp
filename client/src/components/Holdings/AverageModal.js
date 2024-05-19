// import React from 'react';
// import '../Holdings/averageModal.css';

// function AverageModal({ onClose, data }) {
//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <span className="close" onClick={onClose}>&times;</span>
//         <h2 className='titleModal'>Holdings Breakdown</h2>
//         <ul>
//           {data.map((crypto) => (
//             <li key={crypto.id}>
//               <img src={crypto.image} alt={crypto.id} className="crypto-imagens" />
//               <span className="crypto-a"> {crypto.id}</span>

//               <span>
//                 {crypto.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
//                 <span className="crypto-percentage"> {crypto.percentage.toFixed(2)}%</span>
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default AverageModal;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../Holdings/averageModal.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AverageModal({ onClose, data }) {
  // Configuración de los datos para el gráfico de barras
  const chartData = {
    labels: data.map(crypto => crypto.id),
    datasets: [
      {
        label: 'Value in USD',
        data: data.map(crypto => crypto.value),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configuración de opciones para el gráfico
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Cryptocurrency',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value (USD)',
        },
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          }
        }
      },
    },
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className='titleModal'>Holdings Breakdown</h2>
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <ul>
          {data.map((crypto) => (
            <li key={crypto.id}>
              <img src={crypto.image} alt={crypto.id} className="crypto-imagens" />
              <span className="crypto-a"> {crypto.id}</span>
              <span>
                {crypto.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} 
                <span className="crypto-percentage"> {crypto.percentage.toFixed(2)}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AverageModal;


