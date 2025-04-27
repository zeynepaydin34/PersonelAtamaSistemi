import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import AnnouncementDetail from './components/AnnouncementDetail';
import AdminPanel from './components/AdminPanel/pages';
import Dashboard from './components/AdminPanel/pages/Dashboard';
import Listings from './components/AdminPanel/pages/Listings';
import AdminLogin from './components/AdminPanel/pages/AdminLogin';
import Register from './components/AdminPanel/pages/Register';
import AddAnnouncement from './components/AdminPanel/pages/AddAnnouncement'; 
import ShowAnnouncement from './components/AdminPanel/pages/ShowAnnouncement';

// Juri Paneli İmportları
import JuriDashboard from "./components/JuriPanel/pages/JuriDashboard";
import Applications from "./components/JuriPanel/pages/Applications";
import JuriLogin from "./components/JuriPanel/pages/JuriLogin";

//Yonetici Paneli İmportları
import YöneticiDashboard from './components/YöneticiPanel/pages/YöneticiDashboard';
import JuriRegistration from './components/YöneticiPanel/pages/JuriRegistration';
import JuriSelection from './components/YöneticiPanel/pages/JuriSelection';
import CandidateApplication from './components/YöneticiPanel/pages/CandidateApplication';
import EditCriteria from './components/YöneticiPanel/pages/EditCriteria';
import YoneticiLogin from './components/YöneticiPanel/pages/YoneticiLogin';
/*Yönetici Paneli İmportaları
import ApplicationList from './components/YöneticiPanel/pages/ApplicationList';
import EditCriteria from './components/YöneticiPanel/pages/EditCriteria';


*/
//Aday Panel
import Footer from "./components/AdayPanel/pages/Footer";
import Navbar from "./components/AdayPanel/pages/Navbar";
import Navbar2 from "./components/AdayPanel/pages/Navbar2";
import SubNavbar from "./components/AdayPanel/pages/SubNavbar";
import HomePage from "./components/AdayPanel/pages/Home";
import BasvuruForm from "./components/AdayPanel/pages/BasvuruForm";
import KisiselBilgiler from "./components/AdayPanel/pages/KisiselBilgiler";
import APBSlogin from "./components/AdayPanel/pages/APBSlogin";
import BasvuruDurum from "./components/AdayPanel/pages/basvurudurum";
import DocentDuyuru from "./components/AdayPanel/pages/docentduyuru";
import DrOgrUyesiDuyuru from "./components/AdayPanel/pages/DrOgrUyesiDuyuru";
import DuyuruDetay from "./components/AdayPanel/pages/duyurudetay";
import DuyuruKriter from "./components/AdayPanel/pages/DuyuruKriter";
import ProfDuyuru from "./components/AdayPanel/pages/profduyuru";
import JuriGiris from "./components/AdayPanel/pages/jurigiris";
import AdayLogin from "./components/AdayPanel/pages/AdayLogin";
import AdayRegister from "./components/AdayPanel/pages/AdayRegistration";
import Success from "./components/AdayPanel/pages/Success";


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/duyuru/:id" element={<AnnouncementDetail />} />
          <Route path="/show-announcement" element={<ShowAnnouncement />} /> 

          {/* Admin Paneli */}
          <Route path="/admin-panel/AdminLogin" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-panel/dashboard" element={<Dashboard />} />
          <Route path="/admin-panel/listings" element={<Listings />} />
          <Route path="/admin-panel/register" element={<Register />} />
          <Route path="/admin-panel/add-announcement" element={<AddAnnouncement />} />
          <Route path="/admin-panel/show-announcement" element={<ShowAnnouncement />} />

          {/* Juri Paneli */}
          <Route path="/juri-panel/dashboard" element={<JuriDashboard />} />
          <Route path="/juri-panel/applications" element={<Applications />} />
          <Route path="/juri-panel/JuriLogin" element={<JuriLogin />} />

          {/* Yonetici Paneli */}
          <Route path="/yonetici-panel/dashboard" element={<YöneticiDashboard />} />
          <Route path="/yonetici-panel/juriRegistration" element={<JuriRegistration />} />
          <Route path="/yonetici-panel/juriSelection" element={<JuriSelection />} />
          <Route path="/yonetici-panel/candidateApplication" element={<CandidateApplication />} />
          <Route path="/yonetici-panel/editCriteria" element={<EditCriteria />} />
          <Route path="/yonetici-panel/YoneticiLogin" element={<YoneticiLogin />} />

           {/* Aday Paneli */}
          <Route path="/aday-panel/HomePage" element={<HomePage />} />
          <Route path="/aday-panel/BasvuruForm" element={<BasvuruForm />} />
          <Route path="/aday-panel/KisiselBilgiler" element={<KisiselBilgiler/>} />
          <Route path="/aday-panel/APBSlogin" element={<APBSlogin />} />
          <Route path="/aday-panel/BasvuruDurum" element={<BasvuruDurum/>} />
          <Route path="/aday-panel/DocentDuyuru" element={<DocentDuyuru/>} />
          <Route path="/aday-panel/DuyuruDetay" element={<DuyuruDetay/>} />
          <Route path="/aday-panel/DuyuruKriter/:id" element={<DuyuruKriter />} />
          <Route path="/aday-panel/ProfDuyuru" element={<ProfDuyuru/>} />
          <Route path="/aday-panel/DrOgrUyesiDuyuru" element={<DrOgrUyesiDuyuru/>} />
          <Route path="/aday-panel/JuriGiris" element={<JuriGiris/>} />
          <Route path="/aday-panel/AdayLogin" element={<AdayLogin/>} />
          <Route path="/aday-panel/AdayRegistration" element={<AdayRegister/>} />
          <Route path="/aday-panel/Success" element={<Success/>} />
  

          {/*Yönetici Paneli
          <Route path="/yonetici-panel/dashboard" element={<YöneticiDashboard />} />
          <Route path="/yonetici-panel/applicationList" element={<ApplicationList />} />
          <Route path="/yonetici-panel/editCriteria" element={<EditCriteria />} />
          
       
          */}
        </Routes>

          
      </div>
    </Router>
  );
}

export default App;
