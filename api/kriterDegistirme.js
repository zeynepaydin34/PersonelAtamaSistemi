import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();

// PostgreSQL connection settings
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
});

// Database connection check
db.connect()
  .then(() => console.log('Connected to PostgreSQL!'))
  .catch(err => console.error('Connection error:', err));

// Update criteria endpoint (PUT)
router.put('/', async (req, res) => {
  const { kriter_id, kadro_id, adet } = req.body;

  // Input validation
  if (!kriter_id || !kadro_id || !adet) {
    return res.status(400).json({ message: 'Missing data. Kriter Ad, Kadro ID, and Adet are required.' });
  }

  try {
    // Update the criteria in the database
    const updateQuery = `
       UPDATE kriter_kadro
       SET adet = $1
       WHERE kriter_id = $2 AND kadro_id = $3
    `;

    const result = await db.query(updateQuery, [adet, kriter_id, kadro_id]);

    // If the update is successful
    if (result.rowCount > 0) {
      return res.status(200).json({ message: 'Criteria updated successfully.' });
    } else {
      return res.status(404).json({ message: 'Criteria not found or already up to date.' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: `Database error occurred: ${error.message}` });
  }
});

// Close the database connection when the app shuts down
process.on('SIGINT', async () => {
  console.log('Shutting down the app...');
  await db.end(); // End the database connection
  process.exit(0);
});

export default router;
