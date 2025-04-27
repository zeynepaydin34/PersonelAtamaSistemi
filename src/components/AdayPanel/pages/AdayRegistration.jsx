import React, { useState } from 'react';
import { Link } from "react-router-dom";  // Import Link from react-router-dom
const AdayRegistration = () => {
  const [tcNo, setTcNo] = useState('');
  const [isim, setIsim] = useState('');
  const [soyisim, setSoyisim] = useState('');
  const [sifre, setSifre] = useState('');
  const [confirmSifre, setConfirmSifre] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tcNo || !isim || !soyisim || !sifre || !confirmSifre) {
      setErrorMessage('Lütfen tüm alanları doldurun!');
      return;
    }

    if (sifre !== confirmSifre) {
      setErrorMessage('Şifreler eşleşmiyor!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/adayEkle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tcNo, isim, soyisim, sifre }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Kayıt işlemi başarısız oldu.');
      } else {
        const data = await response.json();
        console.log('Aday Kaydı Başarılı:', data);
        setTcNo('');
        setIsim('');
        setSoyisim('');
        setSifre('');
        setConfirmSifre('');
        setErrorMessage('');
        setSuccessMessage('Aday kaydınız başarıyla tamamlandı!');
      }
    } catch (err) {
      setErrorMessage('Sunucu hatası: ' + err.message);
    }
  };

  return (
    <div className="juri-registration-page">
      <div className="juri-registration">
        <div className="content">
          <h2>Aday Kayıt Formu</h2>

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

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
              <label htmlFor="isim">İsim</label>
              <input
                type="text"
                id="isim"
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
                placeholder="İsminizi Girin"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="soyisim">Soyisim</label>
              <input
                type="text"
                id="soyisim"
                value={soyisim}
                onChange={(e) => setSoyisim(e.target.value)}
                placeholder="Soyisminizi Girin"
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

export default AdayRegistration;
