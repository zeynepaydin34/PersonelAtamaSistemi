import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Applications = () => {
  const [basvurular, setBasvurular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const juriEmail = localStorage.getItem('juriEmail'); // Getting email from localStorage

  console.log('Juri Email:', juriEmail); // Check if the email is retrieved from localStorage

  useEffect(() => {
    if (!juriEmail) {
      setLoading(false);
      setError('Giriş yapmadınız!'); // No email found in localStorage
      return;
    }

    const fetchData = async () => {
      try {
        console.log('Fetching data for email:', juriEmail); // Log the email used in the API request
        const response = await axios.get(`http://localhost:5001/api/juriBasvurular/${juriEmail}`);
        console.log('Response Data:', response.data); // Log the response data
        setBasvurular(response.data);
        setLoading(false); // Stop loading
      } catch (error) {
        setLoading(false);
        setError(error.response ? error.response.data.message : 'Veri alınırken hata oluştu!');
        console.error('Error while fetching data:', error); // Log the error
      }
    };

    fetchData();
  }, [juriEmail]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Sidebar />
      <div className="content">
        <h2>Size Atanan Başvurular</h2>
        {basvurular.length === 0 ? (
          <p>Atanan başvuru bulunamadı.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Soyad</th>
                <th>İlan</th>
                <th>Belge</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {basvurular.map((item, i) => (
                <tr key={i}>
                  <td>{item.aday_isim}</td>
                  <td>{item.aday_soyisim}</td>
                  <td>{item.ilan_baslik}</td>
                  <td>
                    {item.belge_dosya ? (
                      <a href={`http://localhost:5001/uploads/${item.belge_dosya}`} target="_blank" rel="noreferrer">Görüntüle</a>
                    ) : 'Belge Yok'}
                  </td>
                  <td>{item.basvuru_durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Applications;
