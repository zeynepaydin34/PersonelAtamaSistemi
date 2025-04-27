import React, { useState, useEffect } from 'react';
import { FaBell, FaSignOutAlt, FaHome } from 'react-icons/fa'; // Keep only the icons for the header
import Sidebar from './Sidebar';
import axios from 'axios'; // axios import ediyoruz
import './Dashboard.css';

const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard'); // Aktif menü durumu
    const [ilanlar, setIlanlar] = useState([]); // İlan verilerini tutacak state
    const [loading, setLoading] = useState(true); // Yükleniyor durumu
    const [error, setError] = useState(null); // Hata durumu

    // API'den ilanları çekmek için useEffect
    useEffect(() => {
        const fetchIlanlar = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/ilan'); // API'den veri çekiyoruz
                setIlanlar(response.data.ilan); // İlanları state'e atıyoruz
                setLoading(false); // Yükleme bitiyor
            } catch (err) {
                setError('Veri yüklenirken bir hata oluştu.'); // Hata durumu
                setLoading(false); // Yükleme bitiyor
            }
        };

        fetchIlanlar(); // useEffect çalıştığında ilanları çekiyoruz
    }, []);

    // Yükleniyor ise mesaj göster
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    // Hata durumu
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            {/* Sol Menü */}
            <Sidebar /> {/* Import edilen Sidebar komponenti */}
            <div className="main-content">
                {/* Merhaba Admin başlığı */}
                <div className="welcome-message">
                    <h1>Hoş Geldin, ADMİN !</h1>
                </div>

                <div className="stats-cards">
                    <div className="card">
                        <h3>Toplam İlanlar</h3>
                        <p>{ilanlar.length}</p> {/* Toplam ilan sayısını dinamik olarak göster */}
                    </div>
                    <div className="card">
                        <h3>Onay Bekleyen İlanlar</h3>
                        <p>{ilanlar.filter(ilan => ilan.onayDurum === 'Beklemede').length}</p> {/* Örnek: Beklemede olan ilanlar */}
                    </div>
                    <div className="card">
                        <h3>Yeni Kayıtlar</h3>
                        <p>5</p>
                    </div>
                </div>

                {/* İlanlar Tablosu */}
                <div className="ilanlar-table">
                    <table>
                        <thead>
                            <tr>
                                <th>İlan Adı</th>
                                <th>Başlangıç Tarihi</th>
                                <th>Bitiş Tarihi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ilanlar.map((ilan) => (
                                <tr key={ilan.id}>
                                    <td>{ilan.ilan_baslik}</td>
                                    <td>{new Date(ilan.baslangic_tarih).toLocaleDateString()}</td>
                                    <td>{new Date(ilan.bitis_tarih).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
