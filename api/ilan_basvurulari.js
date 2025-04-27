const express = require('express');
const router = express.Router();
const db = require('../config/db'); // PostgreSQL bağlantısı

// Başvuru bilgilerini almak için API
router.get('/basvurular', async (req, res) => {
  try {
    const query = `
      SELECT 
        aday.aday_isim, 
        aday.aday_soyisim, 
        aday.aday_id, 
        basvuru.basvuru_durum, 
        ilan.ilan_baslik
      FROM aday
      JOIN basvuru ON aday.aday_id = basvuru.aday_id
      JOIN ilan ON basvuru.ilan_id = ilan.ilan_id;
    `;
    const result = await db.query(query);
    res.json(result.rows); // Veriyi JSON formatında döndürüyoruz
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Veri alınırken bir hata oluştu.' });
  }
});

module.exports = router;
