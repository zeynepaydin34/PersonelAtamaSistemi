import React, { useState } from 'react';
import Sidebar from './Sidebar';  // Import Sidebar component
import './JuriRegistration.css';

const JuriRegistration = () => {
  const [tcNo, setTcNo] = useState('');  // TC Kimlik Numarası
  const [email, setEmail] = useState('');  // E-posta
  const [sifre, setSifre] = useState('');  // Şifre
  const [confirmSifre, setConfirmSifre] = useState('');  // Şifre Tekrarı
  const [errorMessage, setErrorMessage] = useState('');  // Hata mesajı
  const [successMessage, setSuccessMessage] = useState('');  // Başarı mesajı

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form doğrulama
    if (!tcNo || !email || !sifre || !confirmSifre) {
      setErrorMessage('Lütfen tüm alanları doldurun!');
      return;
    }

    // Şifrelerin eşleşip eşleşmediğini kontrol et
    if (sifre !== confirmSifre) {
      setErrorMessage('Şifreler eşleşmiyor!');
      return;
    }

    // Veriyi backend'e gönder
    try {
      const response = await fetch('http://localhost:5001/api/juriEkle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tcNo, email, sifre }),  // Veriyi backend'e gönderiyoruz
      });

      // Yanıtı kontrol et
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Kayıt işlemi başarısız oldu.');
      } else {
        const data = await response.json();
        console.log('Jüri Kaydı Başarılı:', data);
        setTcNo('');
        setEmail('');
        setSifre('');
        setConfirmSifre('');
        setErrorMessage('');
        setSuccessMessage('Jüri kaydınız başarıyla tamamlandı!');
      }
    } catch (err) {
      setErrorMessage('Sunucu hatası: ' + err.message);
    }
  };

  return (
    <div className="juri-registration-page">
      <Sidebar />  {/* Sidebar component is added here */}
      <div className="juri-registration">
        <div className="content">
          <h2>Jüri Üyesi Kayıt Formu</h2>

          {/* Hata ve başarı mesajları */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          {/* Kayıt formu */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="tcNo">TC Kimlik Numarası</label>
              <input
                type="text"
                id="tcNo"
                value={tcNo}
                onChange={(e) => setTcNo(e.target.value)}
                placeholder="TC Kimlik Numarasını Girin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta Adresinizi Girin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sifre">Şifre</label>
              <input
                type="password"
                id="sifre"
                value={sifre}
                onChange={(e) => setSifre(e.target.value)}
                placeholder="Şifrenizi Girin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmSifre">Şifre Tekrarı</label>
              <input
                type="password"
                id="confirmSifre"
                value={confirmSifre}
                onChange={(e) => setConfirmSifre(e.target.value)}
                placeholder="Şifrenizi Tekrar Girin"
                required
              />
            </div>

            <button type="submit" className="submit-btn">Kaydet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JuriRegistration;
