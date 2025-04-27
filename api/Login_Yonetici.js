// api/Login_Yonetici.js
import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;
const router = express.Router();

// DB bağlantısı
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

router.post('/', async (req, res) => {
  const { email, sifre } = req.body;

  try {
    const result = await db.query(
      'SELECT * FROM yonetici WHERE email = $1 AND sifre = $2',
      [email, sifre]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Giriş başarılı' });
    } else {
      res.status(401).json({ message: 'E-posta veya şifre yanlış' });
    }
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router;
