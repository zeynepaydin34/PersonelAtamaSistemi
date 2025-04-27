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

// İlan kaydı (POST)
router.post('/', async (req, res) => {
  const { ilan_baslik, ilan_aciklama, baslangic_tarih, bitis_tarih } = req.body;

  // Girdi kontrolü
  if (!ilan_baslik || !ilan_aciklama || !baslangic_tarih || !bitis_tarih) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
  }

  try {
    // Veritabanında ilanı ekleme
    const insertQuery = `
      INSERT INTO ilan (ilan_baslik, ilan_aciklama, baslangic_tarih, bitis_tarih)
      VALUES ($1, $2, $3, $4) RETURNING ilan_id
    `;

    const result = await db.query(insertQuery, [ilan_baslik, ilan_aciklama, baslangic_tarih, bitis_tarih]);

    // Başarılı bir şekilde eklendiyse
    if (result.rowCount > 0) {
      return res.status(201).json({
        message: 'İlan başarıyla kaydedildi!',
        ilan_id: result.rows[0].ilan_id,
      });
    } else {
      return res.status(500).json({ message: 'İlan eklenirken bir hata oluştu.' });
    }
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: `Bir hata oluştu: ${error.message}` });
  }
});

// Uygulama kapatıldığında veritabanı bağlantısını kapat
process.on('SIGINT', async () => {
  console.log('Uygulama kapatılıyor...');
  await db.end(); // Veritabanı bağlantısını sonlandırıyoruz
  process.exit(0);
});

export default router;
