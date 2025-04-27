import React from "react";
import { Link } from "react-router-dom"; // Link bileşenini import ediyoruz
import './Home.css';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubNavbar from "../components/SubNavbar";

const jobListings = [
  { id: 1, title: "Dr. Öğretim Üyesi Alımı", date: "20.03.2025" },
  { id: 2, title: "Psikolojik Danışmanlık ve Rehberlik Merkezi Seminerleri", date: "18.03.2025" },
  { id: 3, title: "Erasmus+ Karma Yoğun Programı Başvurusu", date: "15.03.2025" },
  { id: 4, title: "Doçent Alımı", date: "12.03.2025" },
  { id: 5, title: "Edebiyat Fakültesi Seminerleri", date: "10.03.2025" },
  { id: 6, title: "Uluslararası Değişim Programları için Yabancı Dil Sınavı", date: "08.03.2025" },
  { id: 7, title: "İŞKUR Gençlik Programı Kapsamında Üniversitemizde Çalışacak Öğrenci Listesi", date: "06.03.2025" },
  { id: 8, title: "Profesör Alımı", date: "05.03.2025" },
  { id: 9, title: "Lisansüstü Koordinatörü", date: "03.03.2025" },
  { id: 10, title: "Akademik Danışman", date: "01.03.2025" },
];

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      <SubNavbar />

      <div className="banner-background"></div>

      <h2 className="announcement-title">Kurum İçi Duyurular</h2>

      <div className="job-grid">
        {jobListings.map((job) => (
          <div key={job.id} className="job-box">
            <span className="job-date">{job.date}</span>
            {/* Link ile duyuru detay sayfasına yönlendirme */}
            <Link to={`/duyuru/${job.id}`} className="job-title">
              {job.title}
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
