import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Sidebar bileşenini doğru şekilde import edin
import './YöneticiDashboard.css';

const Dashboard = () => {
  const [ilanlar, setIlanlar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/ilan');
        const data = await response.json();
        console.log('Alınan İlanlar:', data); // Verileri konsola yazdırıyoruz
        setIlanlar(data.ilan);
        setIsLoading(false);
      } catch (error) {
        console.error('Veri alınırken bir hata oluştu:', error);
        setErrorMessage('Veri alınırken bir hata oluştu.');
        setIsLoading(false);
      }
    };

    fetchIlanlar();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="welcome-message">
          <h1>Hoş Geldin, YÖNETİCİ !</h1>
        </div>

        <div className="stats-cards">
          <div className="card">
            <h3>Toplam Atanmış Juriler</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>Karar Bekleyen Başvurular</h3>
            <p>100</p>
          </div>
          <div className="card">
            <h3>Juride Bekleyen Başvurular</h3>
            <p>5</p>
          </div>
        </div>

        {/* İlanlar Tablosu */}
        {isLoading ? (
          <p>Yükleniyor...</p>
        ) : errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          <div className="ilanlar-table">
            <table>
              <thead>
                <tr>
                  <th>İlan Adı</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {ilanlar.map((ilan) => (
                  <tr key={ilan.ilan_id}>
                    <td>{ilan.ilan_baslik}</td>
                    <td>{new Date(ilan.baslangic_tarih).toLocaleDateString()}</td>
                    <td>{new Date(ilan.bitis_tarih).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
