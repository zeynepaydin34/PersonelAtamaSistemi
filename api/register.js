import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pkg;  // CommonJS modülünü doğru şekilde import ettik
const router = express.Router();
const db = new Pool({ /* PostgreSQL bağlantı ayarları */ });

router.post('/register', async (req, res) => {
  const { tc_no, sifre, aday_isim, aday_soyisim, dogum_tarihi } = req.body;

  if (!tc_no || !sifre || !aday_isim || !aday_soyisim || !dogum_tarihi) {
    return res.status(400).json({ message: 'Tüm alanları doldurun.' });
  }

  try {
    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(sifre, 10);

    const sql = `
      INSERT INTO aday (tc_no, sifre, aday_isim, aday_soyisim, dogum_tarihi)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await db.query(sql, [tc_no, hashedPassword, aday_isim, aday_soyisim, dogum_tarihi]);
    return res.status(201).json({ message: 'Kayıt başarılı.' });
  } catch (error) {
    console.error('Kayıt Hatası:', error);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

export default router;
