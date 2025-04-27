import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router kullanıyoruz
import axios from "axios"; // API çağrıları için Axios
import "./Login.css"; // Stiller

function Login() {
  const [email, setEmail] = useState(""); // E-posta durumu
  const [sifre, setSifre] = useState(""); // Şifre durumu
  const navigate = useNavigate(); // sayfa yönlendirmeleri için

  const handleLogin = async () => {
    try {
      // API'ye giriş isteği gönderiyoruz
      const response = await axios.post("http://localhost:5001/api/Login_Yonetici", {
        email,
        sifre,
      });

      // Giriş başarılıysa
      alert(response.data.message); // Kullanıcıya mesaj göster
      navigate("/yonetici-panel/dashboard"); // Başarılıysa yönlendir
    } catch (error) {
      // Hata durumunda
      alert(error.response?.data?.message || "Giriş başarısız");
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src="/assets/kou_amblem.png" alt="Kocaeli Amblem" className="kou-logo" />
      </div>
      <div className="right-side">
        <div className="login-box">
          <h2>Admin Girişi</h2>
          <div className="input-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="sifre">Şifre</label>
            <input
              type="password"
              id="sifre"
              placeholder="Şifre"
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>Giriş Yap</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
