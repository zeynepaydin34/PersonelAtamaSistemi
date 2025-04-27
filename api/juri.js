import express from 'express';
import pkg from 'pg';  // 'pg' modülünü default olarak import et
const { Pool } = pkg;  // 'Pool' objesini default export'tan alıyoruz

const router = express.Router();
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// Jüri verisini almak için endpoint
router.get('/', async (req, res) => {
  try {
    const juriResult = await db.query('SELECT tc_no FROM juri');
    res.json({ jury: juriResult.rows });
  } catch (error) {
    console.error('Jüri üyeleri alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Jüri verisi alınırken bir hata oluştu.' });
  }
});

// Jüri doğrulama endpoint'i
router.post('/verify', async (req, res) => {
  const { tc_no } = req.body;
  try {
    const juriCheck = await db.query('SELECT * FROM juri WHERE tc_no = $1', [tc_no]);
    if (juriCheck.rows.length > 0) {
      res.json({ valid: true });
    } else {
      res.json({ valid: false });
    }
  } catch (error) {
    console.error('Jüri doğrulama sırasında hata oluştu:', error);
    res.status(500).json({ message: 'Jüri doğrulama sırasında bir hata oluştu.' });
  }
});

export default router;  // ESM'de 'export default' kullanıyoruz
