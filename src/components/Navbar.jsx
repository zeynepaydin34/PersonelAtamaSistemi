import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/assets/kou_amblem.png" alt="KOÜ Logo" className="kou-logo" />
        <div className="site-name-container">
          <span className="site-name-top">Kocaeli Üniversitesi</span>
          <span className="site-name-bottom">Personel Daire Başkanlığı</span>
        </div>
      </div>
      <div className="navbar-right">
        <a href="https://x.com/kou92official" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com/kou92official/?locale=ky_KG" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.linkedin.com/school/kocaeli-university" target="_blank" rel="noopener noreferrer" className="social-icon">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
