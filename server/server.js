import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

// Rotaları içeri aktar
import ilanRoutes from '../api/ilan.js';
import juriRoutes from '../api/juri.js';
import adayBasvuruRoutes from '../api/adayBasvuru.js';
import kriterRoutes from '../api/kriter.js';
import juriIlanAtamaRoutes from '../api/juri_ilan_atama.js';
import juriKayitRoutes from '../api/juriEkle.js';
import kriterDegistirmeRoutes from '../api/kriterDegistirme.js';
import adminIlanEkle from '../api/adminIlanEkle.js';
import adminIlanDegistirme from '../api/adminIlanDegistirme.js';
import loginJuri from '../api/Login_Juri.js';
import loginYonetici from '../api/Login_Yonetici.js';
import loginAdmin from '../api/Login_Admin.js';
import loginAday from '../api/Login_Aday.js';
import nviRouter from '../api/nvi.js';
import registerRouter from '../api/register.js';
import basvuruRouter from '../api/basvuru.js';
import basvuruTakipRouter from '../api/basvuruTakip.js';
import basvuruListesiRouter from '../api/basvuruListesi.js';
import juriBasvurularRouter from '../api/juriBasvurular.js';
import adayRegisterRouter from '../api/adayEkle.js';
const app = express();
const port = 5001;

// Middleware: CORS ve JSON
app.use(cors());
app.use(express.json());

// Tüm Rotalar (Artık Token gerektirmez)
app.use('/api/Login_Admin', loginAdmin);
app.use('/api/Login_Yonetici', loginYonetici);
app.use('/api/Login_Juri', loginJuri);
app.use('/api/Login_Aday', loginAday);
app.use('/api/ilan', ilanRoutes);
app.use('/api/juri', juriRoutes);
app.use('/api/adayBasvuru', adayBasvuruRoutes);
app.use('/api/juri_ilan_atama', juriIlanAtamaRoutes);
app.use('/api/juriEkle', juriKayitRoutes);
app.use('/api/kriter',kriterRoutes)
app.use('/api/kriterDegistirme', kriterDegistirmeRoutes);
app.use('/api/adminIlanEkle', adminIlanEkle);
app.use('/api/adminIlanDegistirme', adminIlanDegistirme);
app.use('/api/nvi', nviRouter);
app.use('/api/register', registerRouter);
app.use('/api/basvuru', basvuruRouter);
app.use('/api/basvuruTakip', basvuruTakipRouter);
app.use('/api/basvuruListesi', basvuruListesiRouter);
app.use('/api/juriBasvurular', juriBasvurularRouter);
app.use('/api/adayEkle', adayRegisterRouter);
app.use('/uploads', express.static('uploads'));
// Daha önce korunan örnek rota da serbest hale getirilebilir veya kaldırılabilir
// app.get('/api/protected/admin', (req, res) => { ... }) // Sil veya token olmadan erişilebilir hale getir

// Sunucuyu başlat
app.listen(port, () => {
  console.log(` Sunucu http://localhost:${port} adresinde çalışıyor.`);
});
