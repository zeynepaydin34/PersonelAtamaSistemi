import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar2.css';

const Navbar2 = () => {
  return (
    <div className="navbar2">
      <div className="navbar-left">
        {/* Wrap the logo with Link to make it clickable */}
        <Link to="/aday-panel/DuyuruDetay">
          <img src="/assets/kou_amblem.png" alt="KOÜ Logo" className="navbar-logo" />
        </Link>
        <span className="navbar-title">Aday Bilgi Sistemi</span>
      </div>

      <div className="navbar-right">
        <div className="dropdown">
          <FaUserCircle className="profile-icon" />
          <div className="dropdown-content">
            <Link to="/aday-panel/BasvuruDurum">Başvuru Durumum</Link>
            <Link to="/aday-panel/HomePage">Çıkış Yap</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
