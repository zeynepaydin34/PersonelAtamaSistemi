import React from "react";
import './Home.css';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import SubNavbar from "./SubNavbar.jsx";
import { useNavigate } from "react-router-dom"; 

const jobListings = [
  { id: 1, title: "Dr. Öğretim Üyesi", description: "Alanında deneyimli ve akademik kadroda yer alacak bir Dr. Öğretim Üyesi arıyoruz." },
  { id: 2, title: "Doçent", description: "Üniversitemizde araştırma ve eğitim faaliyetlerini yönlendirecek, deneyimli bir Doçent arıyoruz." },
  { id: 3, title: "Profesör", description: "Kocaeli Üniversitesi'nde akademik faaliyetleri yönlendirecek, alanında uzman bir Profesör arıyoruz." }
];

const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div className="home-page">
      <Navbar />
      <SubNavbar />

      <div className="banner-background">
        <div className="left-banner"></div>
        <div className="right-banner"></div>
      </div>

      <div className="home-content">
        <div className="job-listings">
          {jobListings.map((job) => (
            <div key={job.id} className="job-listing">
              <h2>{job.title}</h2>
              <p>{job.description}</p>
              <button
                className="apply-button ilan-basvuru-button"
                onClick={() => navigate("/aday-panel/APBSlogin")}
              >
                Başvuru Yap
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
