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
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;


