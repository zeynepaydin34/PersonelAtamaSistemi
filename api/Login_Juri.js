// api/Login_Juri.js
import express from 'express';
import pkg from 'pg';

const { Pool } = pkg;
const router = express.Router();

// Database connection
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

router.post('/', async (req, res) => {
  const { email, sifre } = req.body;

  console.log('Received credentials:', email, sifre); // Log the received credentials

  try {
    // Query the database to find the user
    const result = await db.query(
      'SELECT * FROM juri WHERE email = $1 AND sifre = $2',
      [email, sifre]
    );

    console.log('Database query result:', result.rows); // Log the query result

    // If the user is found, send back the name
    if (result.rows.length > 0) {
      const { juri_ad } = result.rows[0]; // Get the juror's name
      res.status(200).json({ message: 'Giriş başarılı', juri_ad });
    } else {
      // If the user is not found, send an error message
      res.status(401).json({ message: 'E-posta veya şifre yanlış' });
    }
  } catch (error) {
    console.error('Hata:', error.message);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router;
