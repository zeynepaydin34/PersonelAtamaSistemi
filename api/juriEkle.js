import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();

// PostgreSQL bağlantı ayarları
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// Bağlantı kontrolü
db.connect()
  .then(() => console.log('PostgreSQL veritabanına bağlanıldı!'))
  .catch(err => console.error('Bağlantı hatası:', err));

// Jüri kayıt işlemi (POST)
router.post('/', async (req, res) => {
  const { tcNo, email, sifre } = req.body;

  // Girdi kontrolü
  if (!tcNo || !email || !sifre) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  try {
    // Daha önce kayıtlı mı?
    const checkQuery = 'SELECT * FROM juri WHERE tc_no = $1 OR email = $2';
    const checkResult = await db.query(checkQuery, [tcNo, email]);

    if (checkResult.rows.length > 0) {
      return res.status(409).json({ message: 'Bu TC veya E-posta zaten kayıtlı.' });
    }

    // Kayıt ekle
    const insertQuery = 'INSERT INTO juri (tc_no, email, sifre) VALUES ($1, $2, $3)';
    await db.query(insertQuery, [tcNo, email, sifre]);

    res.status(201).json({ message: 'Jüri kaydı başarılı.' });
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

export default router;
