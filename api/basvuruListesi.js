import express from 'express';
import { Pool } from 'pg';

const router = express.Router();

// PostgreSQL connection settings
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// Başvuruları görüntüleme işlemi
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT aday.aday_isim, aday.aday_soyisim, basvuru.basvuru_durum, basvuru.basvuru_id 
       FROM basvuru
       JOIN aday ON basvuru.aday_id = aday.aday_id`
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router;
