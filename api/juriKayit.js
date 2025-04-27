import express from 'express';
const router = express.Router();

// POST route for juriKayit
router.post('/', async (req, res) => {
  const { tcNo, email, sifre } = req.body;

  if (!tcNo || !email || !sifre) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun!' });
  }

  try {
    const result = await db.query(
      'INSERT INTO juri2 (tc_no, email, sifre) VALUES ($1, $2, $3) RETURNING juri_id',
      [tcNo, email, sifre]
    );

    if (result.rows.length > 0) {
      res.status(201).json({
        message: 'Jüri kaydı başarılı!',
        juriId: result.rows[0].juri_id,
      });
    } else {
      res.status(500).json({ message: 'Kaydetme işlemi başarısız oldu.' });
    }
  } catch (error) {
    console.error('Jüri kaydı sırasında bir hata oluştu:', error);
    res.status(500).json({
      message: 'Bir hata oluştu, lütfen tekrar deneyin.',
      error: error.message,
    });
  }
});

export default router;
