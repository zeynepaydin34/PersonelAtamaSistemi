import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BasvuruForm.css';
import Navbar2 from './Navbar2';

const BasvuruForm = () => {
  const navigate = useNavigate();

  const [adayId] = useState(localStorage.getItem('aday_id') || '');
  const [basvuruTipi, setBasvuruTipi] = useState('');  // Default to empty string
  const [uploadedFiles, setUploadedFiles] = useState({}); // Store uploaded files
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [ilanlar, setIlanlar] = useState([]);  // Store ilan data

  useEffect(() => {
    // Fetch ilan data from backend
    axios.get('http://localhost:5001/api/ilan')
      .then((response) => {
        setIlanlar(response.data.ilan);  // Store ilan data from response
        
        // Check if ilan data exists and set default basvuruTipi based on ilan type
        if (response.data.ilan.length > 0) {
          // Assume the ilan that was clicked has a specific type (prof, docent, etc.)
          const defaultBasvuruTipi = response.data.ilan.find(ilan => ilan.basvuru_tipi);
          if (defaultBasvuruTipi) {
            setBasvuruTipi(defaultBasvuruTipi.basvuru_tipi);  // Set default basvuruTipi based on ilan
          }
        }
      })
      .catch((err) => {
        setError('İlan verileri alınamadı.');
        console.error(err);
      });
  }, []);

  const handleBasvuruTipiChange = (e) => {
    setBasvuruTipi(e.target.value);
    setUploadedFiles({});
  };

  const handleFileChange = (e, kriterId) => {
    const files = Array.from(e.target.files);
    setUploadedFiles((prev) => ({
      ...prev,
      [kriterId]: [...(prev[kriterId] || []), ...files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adayId) {
      setError('Aday ID bulunamadı. Lütfen tekrar giriş yapınız.');
      setMessage('');
      return;
    }

    const formData = new FormData();
    formData.append('aday_id', adayId);
    Object.keys(uploadedFiles).forEach(kriterId => {
      uploadedFiles[kriterId].forEach(file => {
        formData.append('belgeler', file);
      });
    });

    try {
      const res = await axios.post('http://localhost:5001/api/basvuru', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(res.data.message);
      setError('');
      navigate('/aday-panel/Success');
    } catch (err) {
      setError(err.response?.data?.message || 'Başvuru sırasında bir hata oluştu.');
      setMessage('');
    }
  };

  // Dynamic list of documents
  const belgeAdlari = [
    'A.1-A.2', 'A.1-A.4', 'A.1-A.5', 'A.1-A.6', 'A.1-A.8', 'Başlıca Yazar',
    'Toplam Makale', 'Kişisel ve Karma Etkinlik', 'F.1 veya F.2 ', 'H.1-12 veya H.13-17 ', 'H.1-12 veya H.13-22', 'İndeksli Yayın', 
    'Atıf Belgesi','Konferans Yayını'
  ];

  return (
    <div className='basvuru-page'>
      <Navbar2 /> {/* Navbar2 at the top */}

      <div className="form-container">
        <h2 className="form-title">Başvuru Formu</h2>

        <form onSubmit={handleSubmit} className="form-wrapper">
          
          <div className="form-group">
            <label htmlFor="basvuruTipi">Başvuru Türü:</label>
            <select 
              id="basvuruTipi" 
              value={basvuruTipi} 
              onChange={handleBasvuruTipiChange}
            >
              <option value="">Seçiniz</option>
              {ilanlar.map((ilan) => (
                <option key={ilan.id} value={ilan.basvuru_tipi}>
                  {ilan.ilan_baslik}
                </option>
              ))}
            </select>
          </div>

          <div className="belge-listesi">
            {/* Dynamic document list */}
            {belgeAdlari.map((belgeAd, idx) => (
              <div key={idx} className="belge-item">
                <label>{belgeAd}</label> {/* Document name */}
                <input 
                  type="file" 
                  multiple 
                  onChange={(e) => handleFileChange(e, idx)} 
                />
                {uploadedFiles[idx] && (
                  <div className="dosya-listesi">
                    {uploadedFiles[idx].map((file, fileIdx) => (
                      <p key={fileIdx} className="dosya-adi">{file.name}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">Başvuru Yap</button>

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default BasvuruForm;
