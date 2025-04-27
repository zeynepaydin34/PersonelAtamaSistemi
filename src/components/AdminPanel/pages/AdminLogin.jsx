import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState(''); // Store username/email
  const [password, setPassword] = useState(''); // Store password

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending login credentials to the server
      const response = await axios.post('http://localhost:5001/api/Login_Admin', {
        email: username,
        sifre: password,
      });

      // If login is successful
      alert(response.data.message); // Show success message
      window.location.href = '/admin-panel/dashboard'; // Redirect to the dashboard after successful login
    } catch (error) {
      // If login fails
      alert(error.response?.data?.message || 'Giriş başarısız');
    }
  };

  return (
    <>
      <div className="admin-giris-container">
        <div className="admin-giris-form">
          <img src="https://www.kocaeli.edu.tr/img/favicon.svg" alt="Logo" />
          <h2>Admin Girişi</h2>
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

export default AdminLogin;
