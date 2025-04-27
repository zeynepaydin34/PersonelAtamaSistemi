import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import multer from 'multer';
import fs from 'fs';

const router = express.Router();

// PostgreSQL bağlantı ayarları
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// İzin verilen dosya türleri
const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];

// Multer dosya yükleme ayarları
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
  }
});

// Multer middleware
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10
  }
});

// Dosya yükleme endpoint’i
router.post('/', upload.array('belgeler', 10), async (req, res) => {
  const { aday_id } = req.body;
  const files = req.files;

  if (!aday_id) {
    return res.status(400).json({ message: 'Aday ID eksik' });
  }

  if (!files || files.length === 0) {
    return res.status(400).json({ message: 'Dosya yüklenmedi' });
  }

  try {
    const adayID = parseInt(aday_id, 10);
    if (isNaN(adayID)) {
      return res.status(400).json({ message: 'Geçersiz Aday ID' });
    }

    // Dosya verilerini topla
    const values = [];
    const placeholders = [];

    files.forEach((file, index) => {
      const i = index * 3;
      values.push(adayID, file.originalname, file.path);
      placeholders.push(`($${i + 1}, $${i + 2}, $${i + 3})`);
    });

    const query = `
      INSERT INTO basvuru_belge (aday_id, belge_ad, belge_dosya)
      VALUES ${placeholders.join(', ')};
    `;

    await db.query(query, values);
    res.status(200).json({ message: 'Başvuru başarıyla kaydedildi!' });
  } catch (error) {
    console.error('Veritabanı hatası:', error.message);
    res.status(500).json({ message: `Sunucu hatası: ${error.message}` });
  }
});

export default router;
