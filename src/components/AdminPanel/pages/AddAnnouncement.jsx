import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './AddAnnouncement.css';

const AddAnnouncement = () => {
  // State'ler: İlan başlık, açıklama, tarihler ve mesajlar
  const [ilanBaslik, setIlanBaslik] = useState('');
  const [ilanAciklama, setIlanAciklama] = useState('');
  const [baslangicTarih, setBaslangicTarih] = useState('');
  const [bitisTarih, setBitisTarih] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    if (!ilanBaslik || !ilanAciklama || !baslangicTarih || !bitisTarih) {
      setErrorMessage('Lütfen tüm alanları doldurun!');
      return;
    }

    // Tarih doğrulama (Bitiş tarihi başlangıç tarihinden sonra olmalı)
    if (new Date(baslangicTarih) >= new Date(bitisTarih)) {
      setErrorMessage('Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.');
      return;
    }

    setLoading(true);
    setErrorMessage(''); // Önceki hataları temizle

    try {
      // API isteği
      const response = await fetch('http://localhost:5001/api/adminIlanEkle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ilan_baslik: ilanBaslik,
          ilan_aciklama: ilanAciklama,
          baslangic_tarih: baslangicTarih,
          bitis_tarih: bitisTarih,
        }),
      });

      const responseText = await response.text();
      console.log(responseText); // Burada yanıtı logluyoruz

      try {
        const data = JSON.parse(responseText);
        if (!response.ok) {
          setErrorMessage(data?.message || 'İlan eklenirken bir hata oluştu.');
          setSuccessMessage('');
        } else {
          setSuccessMessage(data?.message || 'İlan başarıyla kaydedildi!');
          setIlanBaslik('');
          setIlanAciklama('');
          setBaslangicTarih('');
          setBitisTarih('');
        }
      } catch (err) {
        setErrorMessage('Sunucu hatası: Yanıt JSON formatında değil');
        setSuccessMessage('');
      }
    } catch (err) {
      setErrorMessage('Sunucu hatası: ' + err.message);
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <h2>Yeni İlan Ekle</h2>
        
        {/* Hata ve başarı mesajları */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* Yükleniyor durumu */}
        {loading && <div className="loading-message">Yükleniyor...</div>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>İlan Başlık:</label>
            <input
              type="text"
              value={ilanBaslik}
              onChange={(e) => setIlanBaslik(e.target.value)}
              placeholder="İlan Başlığını Girin"
            />
          </div>
          
          <div className="form-group">
            <label>Açıklama:</label>
            <textarea 
              value={ilanAciklama}
              onChange={(e) => setIlanAciklama(e.target.value)}
              rows="5"
              placeholder="İlan hakkında detaylı açıklama giriniz"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>İlan Başlangıç Tarihi:</label>
              <input
                type="date"
                value={baslangicTarih}
                onChange={(e) => setBaslangicTarih(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>İlan Bitiş Tarihi:</label>
              <input
                type="date"
                value={bitisTarih}
                onChange={(e) => setBitisTarih(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">İlanı Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncement;
