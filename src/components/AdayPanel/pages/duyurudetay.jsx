import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './duyurudetay.css';
import Navbar2 from './Navbar2';

const Duyurudetay = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Backend'den duyuru verilerini çek
    axios.get('http://localhost:5001/api/ilan')
      .then((response) => {
        setAnnouncements(response.data.ilan);
      })
      .catch((error) => {
        console.error('Duyurular alınırken hata oluştu:', error);
      });
  }, []);

  return (
    <>
      <Navbar2 />
      <div className="announcement-container">
        {/*<h1 className="announcement-title-main">DUYURULAR</h1>*/}

        <div className="announcement-list">
          {announcements.map((announcement) => {
            const { ilan_id, ilan_baslik, ilan_aciklama } = announcement;

            // ilan_id'ye göre yönlendirme
            let linkTo = `/aday-panel/DuyuruDetay/`;
            if (ilan_id === 1) {
              linkTo = `/aday-panel/DocentDuyuru/`;
            } else if (ilan_id === 2) {
              linkTo = `/aday-panel/ProfDuyuru/`;
            }else if (ilan_id === 3) {
              linkTo = `/aday-panel/DrOgrUyesiDuyuru/`;
            }

            return (
              <Link key={ilan_id} to={linkTo} style={{ textDecoration: 'none' }}>
                <div className="announcement-box">
                  <h3 className="announcement-title">{ilan_baslik}</h3>
                  <p className="announcement-description">{ilan_aciklama}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Duyurudetay;
