import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage2.css'; // Asegúrate de crear un archivo CSS para estilos




// function HomePage2() {
//   const navigate = useNavigate();

//   return (
//     <div className="homepage">
//       <Header/>
//       <header className="top-bar">
//         {/* <img src="Logo.png" alt="Logo" className="logo" /> */}
//         {/* <button className="menu-button" onClick={() => navigate('/signup')}>Signup</button>
//         <button className="menu-button" onClick={() => navigate('/login')}>Login</button> */}

//       </header>

//       <main className="content">
        
//         <div className="info-box" onClick={() => navigate('/holdings')}>
//           <p>My Portfolio</p>
//         </div>
//         <div className="info-box" onClick={() => {/* handle navigation to AI Assistance */}}>
//           <p>Dummy Portfolio</p>
//         </div>
//         <div className="info-box" onClick={() => navigate('/test-backend')}>
//           <p>Test Cycli</p>
//         </div>
//         <div className="info-box" onClick={() => navigate('/portfolio')}>
//           <p>Markets</p>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default HomePage2;

const features = [
  { name: 'Markets', description: 'Access real-time data, market trends, and price updates across a wide range of cryptocurrencies.',href: '/portfolio' },
  { name: 'Portfolio', description: 'Easily create, track, and manage your crypto investments in one intuitive dashboard.', href: '/holdings' },
  { name: 'Insightful Analysis', description: 'Compare your portfolio against the all-time highs of your coins and potential value.' },
  { name: 'Coins Tracker', description: 'Choose where your cryptos are stored, whether on an exchange or a decentralized wallet, to easily track and manage their location' },
  { name: 'Alerts', description: 'Set up personalized notifications for price movements and market changes, staying ahead of the game.' },
  { name: 'Dummy Portfolio', description: 'Made from natural materials. Grain and color vary with each item.',href: '/samplePortfolio' },
]

export default function HomePage2() {
  const navigate = useNavigate();

  const handleNavigation = (href) => {
    // Función para manejar la navegación
    navigate(href);
  };



  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: '#fc9702' }}>
          Welcome to <span style={{ color: '#353630' }}>Bitforecast !</span>
        </h2>

          <p className="mt-4 text-gray-500">
          Experience real-time crypto market prices, manage your portfolio, and delve into price analysis with unique insights. Empower your investment decisions with Bitforecast.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
      {features.map((feature) => (
        <div 
          key={feature.id} 
          className="border-t border-gray-200 pt-4" 
          onClick={() => feature.href && handleNavigation(feature.href)} // Solo navegar si existe href
          role={feature.href ? 'button' : undefined} // Solo añadir rol de botón si existe href
          tabIndex={feature.href ? 0 : undefined} // Solo añadir tabIndex si existe href
          style={feature.href ? {cursor: 'pointer'} : undefined} // Estilo de cursor solo si existe href
        >
          <dt className="font-medium text-bitforecast">{feature.name}</dt>
          <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
        </div>
      ))}
    </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            src="markets8.png"
            alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
            className="rounded-lg bg-gray-100"
          />
          <img
            src="bolsa1.png"
            alt="Top down view of walnut card tray with embedded magnets and card groove."
            className="rounded-lg bg-gray-100"
          />
          {/* <img
            src="markets8.png"
            alt="Side of walnut card tray with card groove and recessed card area."
            className="rounded-lg bg-gray-100"
          /> */}
          {/* <img
            src="cointracker.png"
            alt="Walnut card tray filled with cards and card angled in dedicated groove."
            className="rounded-lg bg-gray-100"
          /> */}
        </div>
      </div>
    </div>
  )
}