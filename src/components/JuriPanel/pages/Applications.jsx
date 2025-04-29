import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a general approach, no need for the jury email in this case
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/juriBasvurular');
        setApplications(response.data);
      } catch (err) {
        console.error('Veri çekme hatası:', err);
        setError(err.response?.data?.message || 'Veri alınırken hata oluştu!');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="content" style={{ padding: '20px', flex: 1 }}>
        <h2>Başvurular</h2>
        {applications.length === 0 ? (
          <p>Başvuru bulunamadı.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>İlan</th>
                <th>Belge</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.aday_isim}</td>
                  <td>{app.aday_soyisim}</td>
                  <td>{app.ilan_baslik}</td>
                  <td>
                    {app.belge_dosya ? (
                      <a href={`http://localhost:5001/uploads/${app.belge_dosya}`} target="_blank" rel="noopener noreferrer">
                        Görüntüle
                      </a>
                    ) : (
                      'Belge Yok'
                    )}
                  </td>
                  <td>{app.basvuru_durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Applications;
