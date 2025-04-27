import React from 'react';
import { useParams } from 'react-router-dom'; // URL parametrelerini almak için

const AnnouncementDetails = () => {
  // Parametre olarak duyuru id'sini almak
  const { id } = useParams();
  

  // ID'ye göre duyuru bilgilerini bulalım
  const announcement = announcements.find(item => item.id === parseInt(id));

  return (
    <div>
      <h2>{announcement ? announcement.title : "Duyuru Bulunamadı"}</h2>
      <p><strong>Tarih:</strong> {announcement ? announcement.date : ""}</p>
      <p><strong>Açıklama:</strong> {announcement ? announcement.details : "Detaylar bulunamadı"}</p>
    </div>
  );
};

export default AnnouncementDetails;
