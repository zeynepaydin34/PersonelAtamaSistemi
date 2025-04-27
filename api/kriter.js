import express from 'express';
import pkg from 'pg';  // PostgreSQL modülünü import ediyoruz
const { Pool } = pkg;  // Pool sınıfını alıyoruz

const router = express.Router();
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// Kriter ve kriter_kadro verilerini almak için endpoint
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT
        k.kriter_id,
        k.kriter_ad,
        kk.kadro_id,
        kk.adet
      FROM
        kriter_kadro kk
      JOIN kriter k ON kk.kriter_id = k.kriter_id;
    `;

    const result = await db.query(query);  // Sorguyu çalıştırıyoruz
    res.json({ criteria: result.rows });  // Veriyi JSON formatında frontend'e gönderiyoruz
  } catch (error) {
    console.error('Kriter verileri alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Kriter verileri alınırken bir hata oluştu.' });
  }
});

export default router;
