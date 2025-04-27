// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personel_basvuru_sistemi',
  password: 'yeni_sifre',
  port: 5432,
  max: 10, // en fazla 10 bağlantı
});

pool.on('connect', () => {
  console.log('PostgreSQL bağlantısı başarılı!');
});

pool.on('error', (err) => {
  console.error('Veritabanı bağlantı hatası:', err);
});

export default pool;
