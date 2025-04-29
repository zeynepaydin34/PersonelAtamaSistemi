import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();

// Veritabanı bağlantısı
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// TÜM JÜRİLER İÇİN TÜM BAŞVURULARI GETİR
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        aday.aday_isim, 
        aday.aday_soyisim, 
        basvuru.basvuru_id,
        belge.belge_dosya
      FROM 
        basvuru
      JOIN aday ON basvuru.aday_id = aday.aday_id
      LEFT JOIN basvuru_belge belge ON belge.basvuru_id = basvuru.basvuru_id
    `);

    res.json(result.rows); // result.rows şeklinde dönüyoruz!
  } catch (error) {
    console.error('Başvurular alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Başvurular alınamadı.' });
  }
});

export default router;
