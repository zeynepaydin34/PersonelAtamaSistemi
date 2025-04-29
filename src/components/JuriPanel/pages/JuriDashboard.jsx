// frontend: Dashboard.jsx
import React, { useState } from 'react';
import { FaBell, FaSignOutAlt, FaHome } from 'react-icons/fa'; // Keep only the icons for the header
import Sidebar from './Sidebar'; // Sidebar bileşenini doğru şekilde import edin
import './JuriDashboard.css';

const Dashboard = () => {
    const [activeMenu, setActiveMenu] = useState('dashboard'); // Aktif menü durumu
    const [jurorName, setJurorName] = useState(''); // State to store the juror's name

    // Example function to handle login (replace with actual login logic)
    const login = async (email, sifre) => {
        try {
            const response = await fetch('/api/Login_Juri', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, sifre }),
            });

            const data = await response.json();
            if (response.ok) {
                setJurorName(data.juri_ad); // Set the juror's name after successful login
            } else {
                alert(data.message); // Show error message if login fails
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    // Example juror login (replace with actual logic)
    // login('juri@example.com', 'password');

    // Example ilan data
    const ilanlar = [
        { id: 1, name: "Öğretim Üyesi Alımı", startDate: "2025-03-01", endDate: "2025-03-10", applicationCount: 20, remainingDays: 5 },
        { id: 2, name: "Doçent Alımı", startDate: "2025-03-05", endDate: "2025-03-12", applicationCount: 15, remainingDays: 8 },
        { id: 3, name: "Profesör Alımı", startDate: "2025-03-10", endDate: "2025-03-15", applicationCount: 30, remainingDays: 2 },
    ];

    return (
        <div className="dashboard-container">
            {/* Sol Menü */}
            <Sidebar /> {/* Import edilen Sidebar komponenti */}
            <div className="main-content">
                {/* Merhaba Admin başlığı */}
                <div className="welcome-message">
                    <h1>Hoş Geldin, {jurorName ? jurorName : 'JURİ'}!</h1> {/* Display the juror's name */}
                </div>

                <div className="stats-cards">
                    <div className="card">
                        <h3>Toplam İlanlar</h3>
                        <p>25</p>
                    </div>
                    <div className="card">
                        <h3>Onay Bekleyen İlanlar</h3>
                        <p>100</p>
                    </div>
                    <div className="card">
                        <h3>Bana Atanan İlanlar</h3>
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
                                    <td>{ilan.name}</td>
                                    <td>{ilan.startDate}</td>
                                    <td>{ilan.endDate}</td>
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
