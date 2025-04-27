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

// İlan güncelleme işlemi (PUT)
router.put('/:id', async (req, res) => {
  const ilanId = req.params.id; // URL parametresinden ilan ID'sini alıyoruz
  const { ilan_baslik, ilan_aciklama, baslangic_tarih, bitis_tarih } = req.body;

  // Girdi kontrolü
  if (!ilan_baslik || !ilan_aciklama || !baslangic_tarih || !bitis_tarih) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  // Tarih doğrulaması
  if (new Date(baslangic_tarih) >= new Date(bitis_tarih)) {
    return res.status(400).json({ message: 'Bitiş tarihi, başlangıç tarihinden sonra olmalıdır.' });
  }

  try {
    // İlan güncelleme
    const updateQuery = `
      UPDATE ilan 
      SET ilan_baslik = $1, ilan_aciklama = $2, baslangic_tarih = $3, bitis_tarih = $4
      WHERE ilan_id = $5
      RETURNING *;
    `;
    const result = await db.query(updateQuery, [ilan_baslik, ilan_aciklama, baslangic_tarih, bitis_tarih, ilanId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'İlan bulunamadı.' });
    }

    res.status(200).json({ message: 'İlan başarıyla güncellendi!', ilan: result.rows[0] });
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

export default router;
