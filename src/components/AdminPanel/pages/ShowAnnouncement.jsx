import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Sidebar'ı import ettik
import axios from 'axios';

const ShowAnnouncement = () => {
    const [ilanlar, setIlanlar] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIlan, setSelectedIlan] = useState(null); // Seçilen ilan için state
    const [newBaslik, setNewBaslik] = useState('');
    const [newAciklama, setNewAciklama] = useState('');
    const [newBaslangicTarih, setNewBaslangicTarih] = useState('');
    const [newBitisTarih, setNewBitisTarih] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchIlanlar = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/ilan');
                setIlanlar(response.data.ilan);  // 'ilan' dizisini alıyoruz
                setIsLoading(false);
            } catch (err) {
                setError('Veri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
                setIsLoading(false);
            }
        };

        fetchIlanlar();
    }, []);

    const handleEditClick = (ilan) => {
        setSelectedIlan(ilan);
        setNewBaslik(ilan.ilan_baslik);
        setNewAciklama(ilan.ilan_aciklama);
        setNewBaslangicTarih(ilan.baslangic_tarih);
        setNewBitisTarih(ilan.bitis_tarih);
        setShowModal(true);
    };

    const handleSaveChanges = async () => {
        try {
          const updatedIlan = {
            ...selectedIlan,
            ilan_baslik: newBaslik,
            ilan_aciklama: newAciklama,
            baslangic_tarih: newBaslangicTarih,
            bitis_tarih: newBitisTarih,
          };
      
          // İlanı güncelliyoruz
          const response = await axios.put(`http://localhost:5001/api/adminIlanDegistirme/${selectedIlan.ilan_id}`, updatedIlan);


          // Yeni ilan listesiyle state güncellemesi
          setIlanlar(ilanlar.map((ilan) => (ilan.ilan_id === selectedIlan.ilan_id ? updatedIlan : ilan)));

      
          setShowModal(false); // Modalı kapatıyoruz
        } catch (err) {
          setError('İlan güncellenirken bir hata oluştu.');
        }
      };
      
    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar'ı burada ekliyoruz */}
            <Sidebar />

            <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
                <h2>İlan Listesi</h2>
                <table className="announcement-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>İlan Başlık</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Açıklama</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Başlangıç Tarihi</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Bitiş Tarihi</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Düzenle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ilanlar.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '8px' }}>Hiç ilan yok.</td>
                            </tr>
                        ) : (
                            ilanlar.map((ilan, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ilan.ilan_baslik}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{ilan.ilan_aciklama}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        {new Date(ilan.baslangic_tarih).toLocaleDateString()}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        {new Date(ilan.bitis_tarih).toLocaleDateString()}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <button
                                            onClick={() => handleEditClick(ilan)}
                                            style={{
                                                padding: '6px 12px',
                                                backgroundColor: '#f0ad4e',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Düzenle
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" style={modalStyles.overlay}>
                    <div className="modal" style={modalStyles.modal}>
                        <div className="modal-header">
                            <h3>İlan Düzenle</h3>
                            <button className="close-btn" onClick={handleCloseModal} style={modalStyles.closeBtn}>
                                X
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <label htmlFor="baslik">Başlık:</label>
                                <input
                                    type="text"
                                    id="baslik"
                                    value={newBaslik}
                                    onChange={(e) => setNewBaslik(e.target.value)}
                                    style={modalStyles.input}
                                />
                            </div>
                            <div>
                                <label htmlFor="aciklama">Açıklama:</label>
                                <textarea
                                    id="aciklama"
                                    value={newAciklama}
                                    onChange={(e) => setNewAciklama(e.target.value)}
                                    style={modalStyles.input}
                                />
                            </div>
                            <div>
                                <label htmlFor="baslangicTarih">Başlangıç Tarihi:</label>
                                <input
                                    type="date"
                                    id="baslangicTarih"
                                    value={newBaslangicTarih}
                                    onChange={(e) => setNewBaslangicTarih(e.target.value)}
                                    style={modalStyles.input}
                                />
                            </div>
                            <div>
                                <label htmlFor="bitisTarih">Bitiş Tarihi:</label>
                                <input
                                    type="date"
                                    id="bitisTarih"
                                    value={newBitisTarih}
                                    onChange={(e) => setNewBitisTarih(e.target.value)}
                                    style={modalStyles.input}
                                />
                            </div>
                            <button
                                onClick={handleSaveChanges}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginTop: '10px',
                                }}
                            >
                                Kaydet
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '450px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        fontSize: '18px',
        color: '#888',
        cursor: 'pointer',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
    },
};

export default ShowAnnouncement;
