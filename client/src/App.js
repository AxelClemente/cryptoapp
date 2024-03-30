import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage2 from './components/HomePage2/HomePage2';
import PortfolioPage from './components/Portfolio/Portfolio';
import Signup from './components/Singup/Singup'
import Holdings from './components/Holdings/Holdings';
import LoginPage from './components/Login/LoginPage';
import TestBackendConnection from './components/TestBackendConnection';
import GoogleLogIn from './components/GoogleLoginPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SamplePortfolio from './components/samplePortfolio/Sample';

function App() {
  return (
    <GoogleOAuthProvider clientId="370792705312-r3kqiff5m1tcau3p76dkujoe27t26kja.apps.googleusercontent.com">
      <Router>
        <div>
          {/* Define routes */}
          <Routes>
            <Route exact path="/" element={<GoogleLogIn />} />
            <Route exact path="/HomePage2" element={<HomePage2 />} />
            <Route exact path="/test-backend" element={<TestBackendConnection />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/holdings" element={<Holdings />} />
            <Route path="/samplePortfolio" element={<SamplePortfolio />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;


// ath
// : 
// 73738
// ath_change_percentage
// : 
// -5.09047
// ath_date
// : 
// "2024-03-14T07:10:36.635Z"
// atl
// : 
// 67.81
// atl_change_percentage
// : 
// 103108.01974
// atl_date
// : 
// "2013-07-06T00:00:00.000Z"
// circulating_supply
// : 
// 19668325
// current_price
// : 
// 70032
// fully_diluted_valuation
// : 
// 1469430201129
// high_24h
// : 
// 70556
// id
// : 
// "bitcoin"
// image
// : 
// "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
// last_updated
// : 
// "2024-03-30T09:17:18.574Z"
// low_24h
// : 
// 69197
// market_cap
// : 
// 1376249083839
// market_cap_change_24h
// : 
// -515614036.0617676
// market_cap_change_percentage_24h
// : 
// -0.03745
// market_cap_rank
// : 
// 1
// max_supply
// : 
// 21000000
// name
// : 
// "Bitcoin"
// price_change_24h
// : 
// 111.03
// price_change_percentage_24h
// : 
// 0.1588
// roi
// : 
// null
// symbol
// : 
// "btc"
// total_supply
// : 
// 21000000
// total_volume
// : 
// 23373672295