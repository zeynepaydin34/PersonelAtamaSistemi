import express from 'express';
import { Pool } from 'pg';
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// PostgreSQL connection settings
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// Allowed file types
const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];

// Multer file upload settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(new Error('Geçersiz dosya türü'), false);
    }
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10, // Limit to 10 files
  },
});

// ==========================
// Create new application and upload documents in one go
// ==========================
router.post('/basvuru', upload.array('belgeler', 10), async (req, res) => {
  const { aday_id, ilan_id } = req.body;
  const files = req.files;

  // Validate the input data
  if (!aday_id || !ilan_id) {
    return res.status(400).json({ message: 'Aday ID veya İlan ID eksik' });
  }

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'Dosya yüklenmedi' });
  }

  try {
    // Step 1: Create the application (Başvuru kaydı oluşturuluyor)
    const result = await db.query(
      `INSERT INTO basvuru (aday_id, ilan_id, basvuru_durum) 
       VALUES ($1, $2, $3) 
       RETURNING basvuru_id`,
      [aday_id, ilan_id, 'Beklemede'] // Başvuru durumu "Beklemede" olarak ekleniyor
    );
    const basvuruID = result.rows[0].basvuru_id;

    // Step 2: Upload files associated with the application (Dosyaları başvuruya bağlı olarak yüklüyoruz)
    const values = [];
    const placeholders = [];

    files.forEach((file, index) => {
      const i = index * 4;
      values.push(aday_id, basvuruID, file.originalname, file.path);
      placeholders.push(`($${i + 1}, $${i + 2}, $${i + 3}, $${i + 4})`);
    });

    const query = `
      INSERT INTO basvuru_belge (aday_id, basvuru_id, belge_ad, belge_dosya)
      VALUES ${placeholders.join(', ')};`;

    await db.query(query, values);

    res.status(201).json({
      message: 'Başvuru ve belgeler başarıyla kaydedildi!',
      basvuru_id: basvuruID,
    });
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: `Sunucu hatası: ${error.message}` });
  }
});

export default router;
