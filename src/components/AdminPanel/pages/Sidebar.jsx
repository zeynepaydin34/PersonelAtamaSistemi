import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Use useNavigate to handle redirection
import { FaTachometerAlt, FaBullhorn, FaFileAlt, FaUser, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa'; // Removed unused icons
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleLogout = () => {
    // Perform any logout logic like clearing JWT from localStorage
    localStorage.removeItem('jwtToken');
    
    // Redirect to the HomePage of aday-panel
    navigate('/aday-panel/HomePage');
  };

  return (
    <div className="sidebar">
      {/* Admin icon */}
      <div className="admin-icon">
        <FaUser size={30} color="white" />
        <span className="admin-text">Admin</span>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard Link */}
        <li className="menu-item">
          <NavLink 
            to="/admin-panel/dashboard" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>

        {/* Listings Link */}
        <li className="menu-item">
          <NavLink 
            to="/admin-panel/show-announcement" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaBullhorn /> İlanlar
          </NavLink>
        </li>

        {/* Add Listing Link */}
        <li className="menu-item">
          <NavLink 
            to="/admin-panel/add-announcement" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaPlusCircle /> İlan Ekle
          </NavLink>
        </li>

        {/* Applications Link */}
        <li className="menu-item">
          <NavLink 
            to="/admin-panel/listings" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaFileAlt /> İlan Başvuruları
          </NavLink>
        </li>

        {/* Logout Link */}
        <li className="menu-item" onClick={handleLogout}>
          <div 
            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          >
            <FaSignOutAlt /> Çıkış Yap
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
