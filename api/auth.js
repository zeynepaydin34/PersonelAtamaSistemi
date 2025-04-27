import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = 'r9Y@t1G8Z#5qXz!$K&fW3U1jM_2mH@V9u7eY7q8YgW9V7';  // Güvenliğiniz için çevresel değişken kullanmanız önerilir

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Token gerekli' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded; // Kullanıcı bilgilerini req objesine ekliyoruz
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Geçersiz token' });
  }
};

export default verifyToken;
