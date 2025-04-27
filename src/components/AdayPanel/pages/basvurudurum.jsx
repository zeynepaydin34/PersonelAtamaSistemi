import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BasvuruDurum = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [error, setError] = useState('');
  const adayId = localStorage.getItem('aday_id');

  useEffect(() => {
    const fetchBasvuruData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/basvuruTakip', {
          params: { aday_id: adayId },
        });

        if (response.data.success) {
          setBasvurular(response.data.data);
        } else {
          setError('Başvuru bilgileri alınamadı.');
        }
      } catch (error) {
        setError('Başvuru bilgileri alınamadı.');
        console.error(error);
      }
    };

    if (adayId) {
      fetchBasvuruData();
    } else {
      setError('Aday ID bulunamadı.');
    }
  }, [adayId]);

  return (
    <div className="basvuru-takip-container">
      <h2>Başvuru Takibi</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="basvuru-listesi">
        {basvurular.length > 0 ? (
          basvurular.map((basvuru, index) => (
            <div key={index} className="basvuru-item">
              <h3>{basvuru.ad} {basvuru.soyad}</h3>
              <div>
                <strong>Belge Adı:</strong> {basvuru.belge_ad}
              </div>
              <div>
                <strong>Belge Dosyası:</strong>{' '}
                <a href={`http://localhost:5001/${basvuru.belge_dosya}`} target="_blank" rel="noopener noreferrer">
                  Dosyayı Görüntüle
                </a>
              </div>
            </div>
          ))
        ) : (
          <div>Başvuru bulunamadı.</div>
        )}
      </div>
    </div>
  );
};

export default BasvuruDurum;
