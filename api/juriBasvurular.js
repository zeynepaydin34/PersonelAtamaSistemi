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

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // SQL sorgusu
    const query = `
      SELECT 
        a.aday_id,
        a.aday_isim,
        a.aday_soyisim,
        i.ilan_baslik,
        b.basvuru_durum,
        bb.belge_dosya
      FROM juri_ilan_atama jia
      JOIN ilan i ON jia.ilan_id = i.ilan_id
      JOIN basvuru b ON b.ilan_id = i.ilan_id
      JOIN aday a ON a.aday_id = b.aday_id
      LEFT JOIN basvuru_belge bb ON b.basvuru_id = bb.basvuru_id
      WHERE a.aday_email = $1
    `;

    // Sorguyu çalıştırıyoruz
    const result = await db.query(query, [email]);

    // Sonuçları döndürüyoruz
    res.status(200).json(result.rows);
  } catch (error) {
    // Hata durumunda detaylı loglama
    console.error('Sunucu Hatası:', error);  // Hata objesinin tamamını konsola yazdırıyoruz
    res.status(500).json({
      message: 'Bir hata oluştu.',
      error: error.message,   // Hata mesajını daha detaylı olarak döndürüyoruz
      stack: error.stack      // Hata yığın izini (stack trace) de döndürebiliriz
    });
  }
});

export default router;
