import React, { useState } from 'react';
import axios from 'axios'; // Importing axios for API requests
import './YoneticiLogin.css';

function YoneticiLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/Login_Yonetici', {
        email: username,
        sifre: password,
      });

      // If the login is successful
      alert(response.data.message); // You can show a success message here
      window.location.href = '/yonetici-panel/dashboard'; // Redirecting to the dashboard after successful login
    } catch (error) {
      // Handle error if login fails
      alert(error.response?.data?.message || 'Giriş başarısız');
    }
  };

  return (
    <>
      <div className="yonetici-giris-container">
        <div className="yonetici-giris-form">
          <img src="https://www.kocaeli.edu.tr/img/favicon.svg" alt="Logo" />
          <h2>Yönetici Girişi</h2>
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
        </div>
      </div>
    </>
  );
}

export default YoneticiLogin;
