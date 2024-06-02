import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import './components/Header/header.css'; // Asegúrate que la ruta es correcta

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`header ${isOpen ? 'open' : ''}`}>
      <div className='header-content'>
        <div className="icons">
          <Bars3Icon className="icon bars-icon" onClick={() => setIsOpen(true)} aria-hidden="true" />
          <XMarkIcon className="icon x-icon" onClick={() => setIsOpen(false)} aria-hidden="true" />
        </div>
      </div>
      <div className="menu">
        {/* <a href="/HomePage2" className="menu-item">Home</a> */}
        <a href="/holdings" className="menu-item">Holdings</a>
        <a href="/portfolio" className="menu-item">Markets</a>
        {/* <a href="/samplePortfolio" className="menu-item">Test Portfolio</a> */}
      </div>
    </nav>
  );
}
