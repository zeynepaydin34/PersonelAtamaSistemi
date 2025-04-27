import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Şifreler uyuşmuyor!');
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setSuccess('');
      } else {
        setSuccess(data.message);
        setError('');
      }
    } catch (err) {
      setError("Sunucuya bağlanırken hata oluştu!");
      setSuccess('');
    }
  };

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="main-content">
        <div className="register-container">
          <div className="register-card">
            <h2>Yeni Admin Kaydı</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>E-posta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Şifreyi Onayla</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="register-button">
                Admin Ekle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
