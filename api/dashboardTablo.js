import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();

// PostgreSQL bağlantısı
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// İlanları al
router.get('/ilan', async (req, res) => {
  try {
    const result = await db.query('SELECT ilan_id, ilan_baslik, ilan_aciklama, baslangic_tarih, bitis_tarih FROM ilan');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

export default router;
