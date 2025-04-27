import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // useNavLink ve useNavigate kullanıyoruz
import { FaTachometerAlt, FaFileAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'; // İkonlar
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate(); // useNavigate hook ile yönlendirme işlemi

  const handleLogout = () => {
    // Token'ı localStorage'dan kaldır
    localStorage.removeItem('token');

    // Kullanıcıyı login sayfasına veya ana sayfaya yönlendir
    navigate('/aday-panel/HomePage'); // Örneğin aday panelinin anasayfasına yönlendiriyoruz
  };

  return (
    <div className="sidebar">
      {/* Admin ikonu */}
      <div className="admin-icon">
        <FaUser size={30} color="white" />
        <span className="admin-text">JURİ</span>
      </div>

      <ul className="sidebar-menu">
        {/* Dashboard Link */}
        <li className="menu-item">
          <NavLink
            to="/juri-panel/dashboard"
            activeClassName="active"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaTachometerAlt /> Dashboard
          </NavLink>
        </li>

        {/* Applications Link */}
        <li className="menu-item">
          <NavLink
            to="/juri-panel/applications"
            activeClassName="active"
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <FaFileAlt /> İlan Başvuruları
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
