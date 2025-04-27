import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JuriLogin.css';

function JuriLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Sayfa yönlendirmesi için hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/Login_Juri', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          sifre: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message); // Giriş başarılı mesajı

        // localStorage'a kullanıcı bilgilerini kaydediyoruz
        localStorage.setItem('juriEmail', username); // Kullanıcı email'i
        localStorage.setItem('jwtToken', data.token);  // Eğer JWT token kullanıyorsanız

        // Yönlendirme
        navigate('/juri-panel/dashboard'); // Yönlendirme
      } else {
        setMessage(data.message); // Hatalı giriş mesajı
      }
    } catch (error) {
      setMessage('Bir hata oluştu.');
      console.error('İstek hatası:', error);
    }
  };

  return (
    <div className="juri-giris-container">
      <div className="juri-giris-form">
        <img src="https://www.kocaeli.edu.tr/img/favicon.svg" alt="Logo" />
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
          <button type="submit" className="login-button">Giriş Yap</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default JuriLogin;
