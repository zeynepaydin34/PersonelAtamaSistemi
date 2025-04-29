import React, { useState } from 'react';
import axios from 'axios';
import './AdayLogin.css';

function AdayLogin() {
  const [tcNo, setTcNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Yükleme durumu için state
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Yükleme başladığında loading'i true yapıyoruz
    setErrorMessage('');  // Önceki hataları temizle

    try {
      const response = await axios.post('http://localhost:5001/api/Login_Aday', {
        email: tcNo,
        sifre: password,
      });

      //  Aday ID'yi localStorage'a kaydet
      localStorage.setItem('aday_id', response.data.aday_id);

      // Başarı mesajı göster ve yönlendir
      alert(response.data.message);
      window.location.href = '/aday-panel/DuyuruDetay';
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Giriş başarısız');
    } finally {
      setLoading(false);  // Yükleme bittiğinde loading'i false yapıyoruz
    }
  };

  return (
    <div className="aday-giris-container">
      <div className="aday-giris-form">
        <img src="https://www.kocaeli.edu.tr/img/favicon.svg" alt="Logo" />
        <h2>Aday Girişi</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <input
              type="text"
              placeholder="TC Kimlik No"
              value={tcNo}
              onChange={(e) => setTcNo(e.target.value)}
              required
            />
          </div>

          <div className="form-input">
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Yükleniyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdayLogin;
