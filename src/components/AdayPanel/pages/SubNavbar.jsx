import React from "react";
import './SubNavbar.css'; 
import { Link } from "react-router-dom";


const SubNavbar = () => {
  return (
    <div className="subnavbar">
      <ul>
      <li><a href="https://www.kocaeli.edu.tr/" target="_blank" rel="noopener noreferrer">Ana Sayfa</a></li>
        <li><a href="https://www.kocaeli.edu.tr/hakkinda.php" target="_blank" rel="noopener noreferrer">Hakkımızda</a></li>
        <li><a href="https://www.kocaeli.edu.tr/hizmetler.php" target="_blank" rel="noopener noreferrer">Hizmetler</a></li>
        <li><a href="https://www.kocaeli.edu.tr/iletisim.php" target="_blank" rel="noopener noreferrer">İletişim</a></li>
        <li><Link to="/aday-panel/APBSlogin">APBS Giriş</Link></li>
      </ul>
    </div>
  );
};

export default SubNavbar;
