import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Navbar2 from './Navbar2'; // Import Navbar2 for the navigation bar
import './Success.css'; // Make sure to include your custom styles

const Success = () => {
  return (
    <>
      <Navbar2 /> {/* Importing Navbar2 so it appears at the top */}
      <div className="success-container">
        <div className="success-message">
          <div className="success-icon">
            <i className="fa fa-check-circle" aria-hidden="true"></i> {/* Checkmark icon */}
          </div>
          <h2 className="success-title">Başvuru Başarıyla Gönderildi!</h2>
          <p className="success-subtitle">
            Başvurunuz başarıyla alındı. Profil sayfanıza yönlendiriliyorsunuz.
          </p>
          <Link to="/aday-panel/BasvuruDurum">
            <button className="go-to-profile-button show-application">
              Başvuruyu Görüntüle
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
