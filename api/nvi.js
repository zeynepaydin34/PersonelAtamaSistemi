import express from 'express';
import soap from 'soap';

const router = express.Router();

// NVI SOAP Service WSDL URL
const url = 'https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL';

// Async function to validate TC Kimlik Number
export const validateTC = async (tc_no, aday_isim, aday_soyisim, dogum_tarihi) => {
  const args = {
    TCKimlikNo: tc_no,
    Ad: aday_isim.toUpperCase().trim(),
    Soyad: aday_soyisim.toUpperCase().trim(),
    DogumYili: new Date(dogum_tarihi).getFullYear(),
  };

  try {
    // Create SOAP client and make request
    const client = await soap.createClientAsync(url);
    const [result] = await client.TCKimlikNoDogrulaAsync(args);
    return result.TCKimlikNoDogrulaResult;  // Return true or false based on the result
  } catch (error) {
    console.error('SOAP Request Error:', error);
    throw new Error('NVI SOAP Service Error');
  }
};

// POST route to handle the request from frontend (React/JSX)
router.post('/', async (req, res) => {
  const { tc_no, sifre, aday_isim, aday_soyisim, dogum_tarihi } = req.body;

  // Check for missing fields
  if (!tc_no || !sifre || !aday_isim || !aday_soyisim || !dogum_tarihi) {
    return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
  }

  try {
    // Call the NVI SOAP service for validation
    const isValid = await validateTC(tc_no, aday_isim, aday_soyisim, dogum_tarihi);

    if (isValid) {
      return res.status(200).json({ message: 'Aday başarıyla kaydedildi.' });
    } else {
      return res.status(400).json({ message: 'Kimlik bilgileri doğrulanamadı.' });
    }
  } catch (error) {
    console.error('Error during validation:', error);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

export default router;
