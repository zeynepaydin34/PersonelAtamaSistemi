import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import './CandidateApplication.css';

const CandidateApplication = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/adayBasvuru');
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (basvuru_id, yeniDurum) => {
    try {
      const response = await fetch(`http://localhost:5001/api/adayBasvuru/${basvuru_id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basvuru_durum: yeniDurum }),
      });

      if (response.ok) {
        fetchApplications(); // Yeniden veri al
      } else {
        console.error('Durum güncellenemedi');
      }
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  };

  return (
    <div className="candidate-applications">
      <Sidebar />
      <div className="content">
        <h2>Aday Başvuruları</h2>
        <table class>
          <thead>
            <tr>
              <th>İlan Başlığı</th>
              <th>Aday İsim</th>
              <th>Aday Soyisim</th>
              <th>Başvuru Durumu</th>
              <th>Rapor</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={index}>
                <td>{application.ilan_baslik}</td>
                <td>{application.aday_isim}</td>
                <td>{application.aday_soyisim}</td>
                <td>{application.basvuru_durum || 'Belirtilmemiş'}</td>
                <td>{application.rapor || 'Yok'}</td>
                <td>
                  <button onClick={() => handleStatusChange(application.basvuru_id, 'Olumlu')}>ONAY</button>
                  <button onClick={() => handleStatusChange(application.basvuru_id, 'Olumsuz')}>RED</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateApplication;
