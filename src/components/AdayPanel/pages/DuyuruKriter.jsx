import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from './Navbar2';

const DuyuruKriter = () => {
  const { id } = useParams(); // URL'den id'yi alıyoruz
  const [announcement, setAnnouncement] = useState(null); // Gelen duyuruyu tutacağız

  useEffect(() => {
    axios.get(`http://localhost:5001/api/ilan/${id}`)
      .then((response) => {
        setAnnouncement(response.data); // Backend'den tek duyuru verisi geldi
      })
      .catch((error) => {
        console.error('Duyuru kriter bilgisi alınamadı:', error);
      });
  }, [id]);

  if (!announcement) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <Navbar2 />
      <div className="announcement-detail">
        <h2>{announcement.ilan_baslik}</h2>
        <p>{announcement.ilan_aciklama}</p>
        <p>Başlangıç Tarihi: {announcement.baslangic_tarihi}</p>
        <p>Bitiş Tarihi: {announcement.bitis_tarihi}</p>
        {/* Buraya istersen kriterleri de ekleyebiliriz */}
      </div>
    </>
  );
};

export default DuyuruKriter;
