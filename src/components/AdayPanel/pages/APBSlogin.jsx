import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import "./APBSlogin.css"; // Stil dosyası

const APBSlogin = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="https://www.kocaeli.edu.tr/img/favicon.svg"
          alt="Logo"
          className="logo"
        />
        <h2>KOÜ Akdemik Personel Bilgi Sistemi</h2>

        {/* Butonlar */}
        <div className="button-group">
          {/* Aday Girişi */}
          <button type="button" className=" login-buttons aday-button">
            <Link
              to="/aday-panel/AdayLogin"  // Use `to` prop instead of `href`
              style={{ textDecoration: "none", color: "white" }}
            >
              Aday Girişi
            </Link>
          </button>

          {/* Jüri Girişi */}
          <button type="button" className="login-buttons juri-button">
            <Link
              to="/juri-panel/JuriLogin"  // Use `to` prop instead of `href`
              style={{ textDecoration: "none", color: "white" }}
            >
              Jüri Girişi
            </Link>
          </button>

          {/* Yönetici Girişi */}
          <button type="button" className="login-buttons yonetici-button">
            <Link
              to="/yonetici-panel/YoneticiLogin"  // Use `to` prop instead of `href`
              style={{ textDecoration: "none", color: "white" }}
            >
              Yönetici Girişi
            </Link>
          </button>

          {/* Admin Girişi */}
          <button type="button" className="login-buttons admin-button">
            <Link
              to="/admin-panel/AdminLogin"  // Use `to` prop instead of `href`
              style={{ textDecoration: "none", color: "white" }}
            >
              Admin Girişi
            </Link>
          </button>

           {/* Aday Üyelik Girişi */}
           <button type="button" className="login-buttons aday-giris-button">
            <Link
              to="/aday-panel/AdayRegister"  // Use `to` prop instead of `href`
              style={{ textDecoration: "none", color: "white" }}
            >
              Aday Üye Ol
            </Link>
           </button>
        </div>
      </div>
    </div>
  );
};

export default APBSlogin;
