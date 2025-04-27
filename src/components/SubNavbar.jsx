import React from "react";
import './SubNavbar.css'; 

const SubNavbar = () => {
  return (
    <div className="subnavbar">
      <ul>
        <li><a href="http://aperdb.kocaeli.edu.tr/hakkimizda.php" target="_blank" rel="noopener noreferrer">Başkanlığımız</a></li>
        <li><a href="http://aperdb.kocaeli.edu.tr/genel_bilgi_Akademik.php" target="_blank" rel="noopener noreferrer">Birimler</a></li>
        <li><a href="http://aperdb.kocaeli.edu.tr/yonetmelikler.php" target="_blank" rel="noopener noreferrer">Mevuzatlar</a></li>
        <li><a href="https://www.mevzuat.gov.tr/" target="_blank" rel="noopener noreferrer">Personel Bilgi Bankası</a></li>
        <li><a href="http://aperdb.kocaeli.edu.tr/iletisim.php" target="_blank" rel="noopener noreferrer">İletişim</a></li>
        <li><a href="#" target="_blank" rel="noopener noreferrer">APBS</a></li>
      </ul>
    </div>
  );
};

export default SubNavbar;
