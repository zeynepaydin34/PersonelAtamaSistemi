import React, { useState } from 'react';

const Register = () => {
  const [tc_no, setTcNo] = useState('');
  const [sifre, setSifre] = useState('');
  const [aday_isim, setAdayIsim] = useState('');
  const [aday_soyisim, setAdaySoyisim] = useState('');
  const [dogum_tarihi, setDogumTarihi] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      tc_no,
      sifre,
      aday_isim,
      aday_soyisim,
      dogum_tarihi,
    };

    try {
      const response = await fetch('http://localhost:5001/api/nvi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Başvuru başarılı!');
      } else {
        setMessage(data.message || 'Bir hata oluştu!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Sunucu hatası');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="TC Kimlik No"
        value={tc_no}
        onChange={(e) => setTcNo(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={sifre}
        onChange={(e) => setSifre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ad"
        value={aday_isim}
        onChange={(e) => setAdayIsim(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Soyad"
        value={aday_soyisim}
        onChange={(e) => setAdaySoyisim(e.target.value)}
        required
      />
      <input
        type="date"
        value={dogum_tarihi}
        onChange={(e) => setDogumTarihi(e.target.value)}
        required
      />
      <button type="submit">Başvur</button>
      <p>{message}</p>
    </form>
  );
};

export default Register;
