import express from 'express';  // express modülünü doğru bir şekilde import ediyoruz
import pkg from 'pg';  // pg modülünü default olarak import ediyoruz
const { Pool } = pkg;  // 'Pool' nesnesini ayıklıyoruz

const router = express.Router();
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// İlan verisini almak için endpoint
router.get('/', async (req, res) => {
  try {
    const ilanResult = await db.query('SELECT * FROM ilan');
    res.json({ ilan: ilanResult.rows });
  } catch (error) {
    console.error('İlan verisi alınırken hata oluştu:', error);
    res.status(500).json({ message: 'İlan verisi alınırken bir hata oluştu.' });
  }
});

export default router;  // ES modülünde 'export default' kullanıyoruz
