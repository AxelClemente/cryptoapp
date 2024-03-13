import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './components/HomePage';
import HomePage2 from './components/HomePage2/HomePage2';
import PortfolioPage from './components/Portfolio/Portfolio';
import Signup from './components/Singup/Singup'
import Holdings from './components/Holdings/Holdings';
import LoginPage from './components/Login/LoginPage';
import TestBackendConnection from './components/TestBackendConnection';


function App() {
  return (
    <Router>
      <div>
        {/* Define routes */}
        <Routes>
          
          <Route exact path="/" element={<HomePage2 />} />
          <Route exact path="/" element={<TestBackendConnection />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/holdings" element={<Holdings/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

