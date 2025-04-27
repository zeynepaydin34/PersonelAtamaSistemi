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

// Aday başvuruları ve belgeleri çekme endpoint'i
router.get('/', async (req, res) => {
  const { aday_id } = req.query;  // Aday ID query parametre olarak alındı

  // Aday ID parametresi eksikse hata mesajı
  if (!aday_id) {
    return res.status(400).json({ message: 'Aday ID parametresi eksik.' });
  }

  try {
    // Başvuru ve belgeleri çekme sorgusu
    const query = `
      SELECT
        a.aday_isim,
        a.aday_soyisim,
        b.belge_ad,
        b.belge_dosya
      FROM
        basvuru_belge b
      JOIN
        aday a ON a.aday_id = b.aday_id
      WHERE
        b.aday_id = $1
    `;

    // Veritabanı sorgusunu çalıştırıyoruz
    const result = await db.query(query, [aday_id]);

    // Eğer başvuru bulunmazsa
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Başvuru bulunamadı.' });
    }

    // Başvuru bilgilerini döndürüyoruz
    res.status(200).json({ data: result.rows });
  } catch (error) {
    // Veritabanı hatası durumunda
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: `Sunucu hatası: ${error.message}` });
  }
});

export default router;
