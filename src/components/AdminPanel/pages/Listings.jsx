import React, { useState, useEffect } from 'react';
import './Listings.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/basvuruListesi');
        setListings(response.data);
      } catch (error) {
        console.error('Veri alınırken bir hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="listings">
      <Sidebar />
      <div className="content-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Soyad</th>
              <th>İlan Başlığı</th>
              <th>Belge</th>
              <th>Başvuru Durumu</th>
              <th>Yönlendir</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing, index) => (
              <tr key={index}>
                <td>{listing.aday_isim}</td>
                <td>{listing.aday_soyisim}</td>
                <td>{listing.ilan_baslik}</td>
                <td>
                  {listing.belge_dosya ? (
                    <a href={`http://localhost:5001/uploads/${listing.belge_dosya}`} target="_blank" rel="noopener noreferrer">
                      Belgeyi Görüntüle
                    </a>
                  ) : (
                    'Belge Yok'
                  )}
                </td>
                <td>{listing.basvuru_durum}</td>
                <td>
                  <button className="redirect-button" onClick={() => handleRedirect(listing.aday_id)}>Yönlendir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const handleRedirect = (adayId) => {
  console.log(`Aday ID: ${adayId}`);
};

export default Listings;
