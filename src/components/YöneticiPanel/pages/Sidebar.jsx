import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, FaBullhorn, FaFileAlt, FaUserPlus, FaSignOutAlt, FaUser, 
  FaEdit, FaUsers // Yeni ikonlar eklendi
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Admin icon */}
      <div className="admin-icon">
        <FaUser size={30} color="white" />
        <span className="admin-text">Yönetici</span>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard Link */}
        <li className="menu-item">
          <NavLink 
            to="/yonetici-panel/dashboard" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>

        {/* Jüri Seçimi Link */}
        <li className="menu-item">
          <NavLink 
            to="/yonetici-panel/juriSelection" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaUsers /> Juri Seçimi
          </NavLink>
        </li>

        {/* Kriterleri Düzenle Link */}
        <li className="menu-item">
          <NavLink 
            to="/yonetici-panel/editCriteria" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaEdit /> Kriterleri Düzenle
          </NavLink>
        </li>

        {/* Aday Başvuruları Link */}
        <li className="menu-item">
          <NavLink 
            to="/yonetici-panel/candidateApplication" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaFileAlt /> Aday Başvuruları
          </NavLink>
        </li>

        {/* Jüri Ekle Link */}
        <li className="menu-item">
          <NavLink 
            to="/yonetici-panel/JuriRegistration" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaUserPlus /> Juri Ekle
          </NavLink>
        </li>

        {/* Çıkış Linki */}
        <li className="menu-item">
          <NavLink 
            to="/aday-panel/HomePage" 
            activeClassName="active" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaSignOutAlt /> Çıkış Yap
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
