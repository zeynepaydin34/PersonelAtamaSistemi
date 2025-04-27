import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './JuriSelection.css';

const JuriSelection = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState('');
  const [selectedJurors, setSelectedJurors] = useState([]);
  const [tcNo, setTcNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [jurors, setJurors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching announcements and jurors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [announcementResponse, jurorResponse] = await Promise.all([
          fetch('http://localhost:5001/api/ilan'),
          fetch('http://localhost:5001/api/juri'),
        ]);

        const [announcementData, jurorData] = await Promise.all([
          announcementResponse.json(),
          jurorResponse.json(),
        ]);

        setAnnouncements(announcementData.ilan || []);
        setJurors(jurorData.jury || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Veri alınırken bir hata oluştu:', error);
        setErrorMessage('Veri alınırken bir hata oluştu.');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Adding juror to selected list
  const handleAddJuror = () => {
    if (selectedJurors.length >= 5) {
      setErrorMessage('En fazla 5 jüri üyesi seçilebilir.');
      return;
    }

    if (selectedJurors.find(juror => juror.tcNo === tcNo)) {
      setErrorMessage('Bu jüri üyesi zaten seçildi.');
      return;
    }

    const juror = jurors.find(j => j.tc_no === tcNo);
    if (juror) {
      setSelectedJurors([...selectedJurors, { tcNo }]);
      setTcNo('');
      setErrorMessage('');
    } else {
      setErrorMessage('Bu TC Kimlik numarası ile jüri üyesi bulunamadı.');
    }
  };

  // Submitting selected jurors
  const handleSubmit = async () => {
    if (selectedJurors.length === 5) {
      try {
        const response = await fetch('http://localhost:5001/api/juri_ilan_atama', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ilanId: selectedAnnouncement,
            jurors: selectedJurors.map(juror => ({ tcNo: juror.tcNo })),
          }),
        });

        const result = await response.json();
        if (response.status === 200) {
          alert(result.message);
        } else {
          setErrorMessage(result.message);
        }
      } catch (error) {
        console.error('Jüri üyeleri kaydedilirken hata:', error);
        setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } else {
      setErrorMessage('Lütfen 5 jüri üyesi seçin.');
    }
  };

  return (
    <div className="juri-selection">
      <Sidebar />
      <div className="content">
        <h2>JÜRİ SEÇİMİ</h2>
        <div className="form-group">
          <label htmlFor="announcement">İlan Seçin</label>
          <select
            id="announcement"
            value={selectedAnnouncement}
            onChange={(e) => setSelectedAnnouncement(e.target.value)}
          >
            <option value="">İlan Seçin</option>
            {isLoading ? (
              <option disabled>Yükleniyor...</option>
            ) : (
              announcements.map(announcement => (
                <option key={announcement.ilan_id} value={announcement.ilan_id}>
                  {announcement.ilan_baslik}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tcNo">Jüri Üyesi TC No</label>
          <select
            id="tcNo"
            value={tcNo}
            onChange={(e) => setTcNo(e.target.value)}
          >
            <option value="">Jüri TC Kimlik Numarasını Seçin</option>
            {isLoading ? (
              <option disabled>Yükleniyor...</option>
            ) : (
              jurors.map(juror => (
                <option key={juror.tc_no} value={juror.tc_no}>
                  {juror.tc_no}
                </option>
              ))
            )}
          </select>
          <button type="button" onClick={handleAddJuror}>Jüri Ekle</button>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <h3>Seçilen Jüri Üyeleri</h3>
        <ul>
          {selectedJurors.map((juror, index) => (
            <li key={index}>{juror.tcNo}</li>
          ))}
        </ul>

        <button onClick={handleSubmit}>Jüriyi Kaydet</button>
      </div>
    </div>
  );
};

export default JuriSelection;
