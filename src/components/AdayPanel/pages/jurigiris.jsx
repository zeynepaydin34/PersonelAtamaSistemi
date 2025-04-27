import React, { useState } from 'react';
import './jurigiris.css'; // Stil dosyanız

function JuriGiris() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada form gönderim işlemini yapabilirsiniz
    console.log('Kullanıcı Adı:', username);
    console.log('Şifre:', password);
    // Burada API'ye veri gönderebilir veya başka bir işlem gerçekleştirebilirsiniz
  };

  return (
    <>
      <h1>Kocaeli Üniversitesi</h1> {/* Başlık burada olacak */}
      <img src="/path/to/your-image.jpg" alt="Küçük Fotoğraf" className="small-image" />

      <div className="juri-giris-container">
        <div className="juri-giris-form">
          <img src="https://www.kocaeli.edu.tr/img/favicon.svg" alt="Logo" className="logo" />
          <h2>Jüri Girişi</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="E-Posta veya TC Kimlik No"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Giriş Yap
            </button>
          </form>
          <div className="footer-links">
            <a href="#">Şifremi Unuttum</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default JuriGiris;
