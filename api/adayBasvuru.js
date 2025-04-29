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

// GET - Başvuru verilerini al
router.get('/', async (req, res) => {
  try {
    console.log("GET isteği alındı");

    const query = `
    SELECT 
      b.basvuru_id,
      a.aday_isim, 
      a.aday_soyisim, 
      b.basvuru_durum, 
      d.rapor
    FROM basvuru b
    LEFT JOIN aday a ON b.aday_id = a.aday_id
    LEFT JOIN degerlendirme d ON b.basvuru_id = d.basvuru_id;
  `;
    const result = await db.query(query);

    if (result.rows.length === 0) {
      console.log("Veri bulunamadı.");
      return res.status(404).json({ message: 'Başvuru bulunamadı' });
    }

    console.log('Sorgu Sonuçları:', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Başvurular alınırken hata oluştu:', error);
    res.status(500).json({ message: 'Başvurular alınırken bir hata oluştu.' });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { basvuru_durum } = req.body;
  console.log(`Updating basvuru_id: ${id} with status: ${basvuru_durum}`);

  try {
    const updateQuery = `
      UPDATE basvuru 
      SET basvuru_durum = $1 
      WHERE basvuru_id = $2
    `;
    const result = await db.query(updateQuery, [basvuru_durum, id]);

    if (result.rowCount === 0) {
      console.log('No rows were updated');
      return res.status(404).json({ message: 'Başvuru durumu güncellenemedi. (ID not found)' });
    }

    console.log('Update successful');
    res.json({ message: 'Başvuru durumu başarıyla güncellendi.' });
  } catch (error) {
    console.error('Durum güncellenirken hata:', error);
    res.status(500).json({ message: 'Başvuru durumu güncellenemedi.' });
  }
});


export default router;
