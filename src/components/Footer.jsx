// components/Footer.jsx
import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-info">
          <h3>İletişim</h3>
          <p>
            <FaMapMarkerAlt className="icon" /> Kocaeli Üniversitesi Personel Daire Başkanlığı, 41380 İzmit / KOCAELİ
          </p>
          <p>
            <FaPhoneAlt className="icon" /> (0262) 303 10 00
          </p>
          <p>
            <FaEnvelope className="icon" />
            <a href="mailto:kocaeli@kou.edu.tr">kocaeli@kou.edu.tr</a>
          </p>
        </div>
      </div>
      <div className="rights">
        <p>&copy; 2025 Kocaeli Üniversitesi - Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}

export default Footer;
