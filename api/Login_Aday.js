import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;
const router = express.Router();

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
    // Adayı email ve şifreye göre sorgula
    const result = await db.query(
      'SELECT aday_id, tc_no, sifre FROM aday WHERE tc_no = $1 AND sifre = $2',
      [email, sifre]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];

      // Aday giriş başarılıysa, aday_id ve mesajı döndür
      res.status(200).json({
        message: 'Giriş başarılı',
        aday_id: user.aday_id,  // Burada aday_id'yi döndürüyoruz
      });
    } else {
      res.status(401).json({ message: 'E-posta veya şifre yanlış' });
    }
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router;
