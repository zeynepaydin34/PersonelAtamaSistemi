import React from 'react';
import { Link } from 'react-router-dom';
import Navbar2 from './Navbar2';
import './DrOgrUyesiDuyuru.css';

const DocentDuyuru = () => {
  return (
    <>
      <Navbar2 />
      <div className="duyuru-detail-container">
        <h2 className="duyuru-detail-title">Doçent Alım İlanı Kriterleri</h2>

        {/* Criteria Section */}
        <div className="criteria-section">
          <h3 className="criteria-title">Başvuru Kriterleri</h3>
          <ul className="criteria-list">
            <li>A.1-A.2: 1 adet</li>
            <li>A.1-A.4: 2 adet</li>
            <li>A.1-A.5: 1 adet</li>
            <li>A.1-A.6: - adet</li>
            <li>A.1-A.8: - adet</li>
            <li>Başlıca Yazar: 2</li>
            <li>Toplam Makale: 7</li>
          </ul>
        </div>

        {/* Announcement Description */}
        <div className="announcement-description">
          <p>
          Doçent kadrolarına başvurabilmek için adayların yukarıda belirtilen kriterleri
            sağlıyor olmaları gerekmektedir.
          </p>
        </div>

        {/* Apply Button */}
        <div className="apply-button-container">
          <Link to="/aday-panel/BasvuruForm" state={{ kadro: 'Doçent' }}>
            <button className="apply-button">Başvuru Yap</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DocentDuyuru;
