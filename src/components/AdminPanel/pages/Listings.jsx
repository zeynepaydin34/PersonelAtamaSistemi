import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css';
import Sidebar from './Sidebar';

const Listings = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [error, setError] = useState('');
  const [redirectStatus, setRedirectStatus] = useState({}); // Yönlendirme durumunu saklamak için

  useEffect(() => {
    // Başvuru verilerini çekiyoruz
    axios.get('http://localhost:5001/api/basvuruListesi')
      .then(response => {
        setBasvurular(response.data);
      })
      .catch(err => {
        setError('Veriler alınamadı.');
        console.error(err);
      });
  }, []);

  const handleRedirect = (basvuruId) => {
    // Yönlendirme işlemi burada
    setRedirectStatus(prevState => ({
      ...prevState,
      [basvuruId]: 'Yönlendirildi' // Yönlendirme mesajını ekliyoruz
    }));
  };

  return (
    <div>
      <Sidebar />
      {error && <p>{error}</p>}
      <table className='listings-table'>
        <thead>
          <tr>
            <th>Ad</th>
            <th>Soyad</th>
            <th>Başvuru Durumu</th>
            <th>Yönlendir</th>
          </tr>
        </thead>
        <tbody>
          {basvurular.map((basvuru) => (
            <tr key={basvuru.basvuru_id}>
              <td>{basvuru.aday_isim}</td>  {/* Ad */}
              <td>{basvuru.aday_soyisim}</td>  {/* Soyad */}
              <td>{basvuru.basvuru_durum}</td>
              <td>
                <button onClick={() => handleRedirect(basvuru.basvuru_id)}>
                  {redirectStatus[basvuru.basvuru_id] || 'Yönlendir'} {/* Yönlendirilmişse yazıyı değiştir */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listings;
