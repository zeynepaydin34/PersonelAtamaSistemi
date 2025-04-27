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

// Başvuru listesi verilerini getirme
router.get('/', async (req, res) => {
  try {
    const query = `
    SELECT 
      a.aday_id,
      a.aday_isim,
      a.aday_soyisim,
      i.ilan_baslik,
      b.basvuru_durum,
      bb.basvuru_belge
    FROM basvuru b
    JOIN aday a ON b.aday_id = a.aday_id
    JOIN ilan i ON b.ilan_id = i.ilan_id
    LEFT JOIN basvuru_belge bb ON a.aday_id = bb.aday_id;
  `;
  
    const result = await db.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

export default router;
