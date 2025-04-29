// JuriLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JuriLogin.css'; // Add your CSS

function JuriLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Hook for page navigation

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
        setMessage(data.message); // Display success message

        // Save user data in localStorage
        localStorage.setItem('juriEmail', username);
        localStorage.setItem('juriAd', data.juri_ad);

        // Redirect to the dashboard after successful login
        navigate('/juri-panel/dashboard');
      } else {
        setMessage(data.message); // Show error message
      }
    } catch (error) {
      setMessage('Bir hata oluştu.');
      console.error('Error occurred:', error);
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
