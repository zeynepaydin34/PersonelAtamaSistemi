import express, { query } from 'express';  // express modülünü doğru bir şekilde import ediyoruz
import pkg from 'pg';  // pg modülünü default olarak import ediyoruz
const { Pool } = pkg;  // 'Pool' nesnesini ayıklıyoruz

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

// Jüri üyelerini ilana kaydetme
router.post('/', async (req, res) => {
  const { ilanId, jurors } = req.body;

  // Gelen verileri kontrol et
  if (!ilanId || !Array.isArray(jurors) || jurors.length === 0) {
    return res.status(400).json({ message: 'Geçersiz veri gönderildi.' });
  }

  try {
    // Parametreli sorgu ile SQL injection'ı önlemek
   
    const queryText = `
      INSERT INTO juri_ilan_atama (ilan_id, tc_no)
      VALUES ($1, $2), ($3, $4), ($5, $6), ($7, $8), ($9, $10)
    `;
    console.log(queryText);
    // Jurors dizisindeki TC No'ları uygun formatta al
    const queryValues = jurors.map(juror => [ilanId, juror.tcNo]).flat();
    
    // Veritabanına ekleme işlemi
    await db.query(queryText, queryValues);

    // Başarı mesajı
    res.status(200).json({ message: 'Jüri üyeleri başarıyla kaydedildi!' });
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: 'Bir hata oluştu.' });
  }
});

export default router;
