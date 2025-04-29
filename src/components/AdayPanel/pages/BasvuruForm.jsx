import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BasvuruForm.css';
import Navbar2 from './Navbar2';

const BasvuruForm = () => {
  const navigate = useNavigate();

  // Aday ID'sini localStorage'dan alıyoruz
  const [adayId] = useState(localStorage.getItem('aday_id') || '');
  const [ilanlar, setIlanlar] = useState([]);
  const [selectedIlanId, setSelectedIlanId] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Belge isimleri listesi
  const belgeAdlari = [
    'A.1-A.2', 'A.1-A.4', 'A.1-A.5', 'A.1-A.6', 'A.1-A.8', 'Başlıca Yazar',
    'Toplam Makale', 'Kişisel ve Karma Etkinlik', 'F.1 veya F.2',
    'H.1-12 veya H.13-17', 'H.1-12 veya H.13-22', 'İndeksli Yayın',
    'Atıf Belgesi', 'Konferans Yayını'
  ];

  // İlanları API'den al
  useEffect(() => {
    axios.get('http://localhost:5001/api/ilan')
      .then((res) => {
        console.log('İlanlar:', res.data);
        setIlanlar(res.data.ilan);
        if (res.data.ilan.length > 0) {
          setSelectedIlanId(res.data.ilan[0].id.toString()); // İlk ilanı varsayılan olarak seçiyoruz
        }
      })
      .catch((err) => {
        console.error('İlanlar alınamadı:', err);
        setError('İlan verileri alınamadı.');
      });
  }, []);

  // Dosya input değişikliklerini yönetme
  const handleFileChange = (e, kriterId) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => ({
      ...prev,
      [kriterId]: [...(prev[kriterId] || []), ...files]
    }));
  };

  // Formu gönderme ve başvuru işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!adayId || !selectedIlanId) {
      setError('Aday ID veya İlan ID eksik.');
      setMessage('');
      return;
    }
  
    try {
      // FormData oluşturuyoruz
      const formData = new FormData();
      formData.append('aday_id', adayId);
      formData.append('ilan_id', selectedIlanId);  // İlan ID'sini FormData'ya ekliyoruz
  
      // Belgeleri FormData'ya ekliyoruz
      Object.keys(uploadedFiles).forEach((kriterId) => {
        uploadedFiles[kriterId].forEach((file) => {
          formData.append('belgeler', file);
        });
      });
  
      // Başvuruyu API'ye gönderiyoruz
      const createRes = await axios.post('http://localhost:5001/api/basvuru', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      setMessage('Başvuru başarıyla tamamlandı!');
      setError('');
      navigate('/aday-panel/Success'); // Başarıyla tamamlanınca başarı sayfasına yönlendir
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Başvuru sırasında bir hata oluştu.');
      setMessage('');
    }
  };

  return (
    <div className="basvuru-page">
      <Navbar2 />
      <div className="form-container">
        <h2 className="form-title">Başvuru Formu</h2>

        <form onSubmit={handleSubmit} className="form-wrapper">
          {/* İlan Seçimi */}
          <div className="form-group">
            <label htmlFor="ilanSecimi">Başvuru Yapılacak İlan:</label>
            <select
              id="ilanSecimi"
              value={selectedIlanId}
              onChange={(e) => setSelectedIlanId(e.target.value)} // Seçilen ilan ID'sini güncelliyoruz
            >
              <option value="">Seçiniz</option>
              {ilanlar.map((ilan) => (
                <option key={ilan.id} value={ilan.id}>
                  {ilan.ilan_baslik}
                </option>
              ))}
            </select>
          </div>

          {/* Dosya Yükleme */}
          <div className="belge-listesi">
            {belgeAdlari.map((belgeAd, idx) => (
              <div key={idx} className="belge-item">
                <label>{belgeAd}</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, idx)}
                />
                {uploadedFiles[idx] && (
                  <div className="dosya-listesi">
                    {uploadedFiles[idx].map((file, fileIdx) => (
                      <p key={fileIdx} className="dosya-adi">{file.name}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Gönderme Butonu */}
          <button type="submit" className="submit-button">Başvuru Yap</button>

          {/* Başarı ve Hata Mesajları */}
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default BasvuruForm;
