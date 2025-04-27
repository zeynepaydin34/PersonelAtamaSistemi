import React from 'react';
import { FaHome, FaBell, FaSignOutAlt } from 'react-icons/fa';
import './Header.css'; // Stil dosyanızı burada import ettiğinizden emin olun

const Header = () => {
  return (
    <header className="header">
      {/* Header Left */}
      <div className="header-left">
        <h2>Merhaba, Admin !</h2>
        <p className="breadcrumb">
          <FaHome size={16} color="#7f8c8d" />
          <span> / Dashboard</span>
        </p>
      </div>

      {/* Header Right - Notification and Logout */}
      <div className="header-right">
        <div className="notification-icon">
          <FaBell size={24} />
        </div>
        <div className="logout-icon">
          <FaSignOutAlt size={24} />
        </div>
      </div>
    </header>
  );
};

export default Header;
