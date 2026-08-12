// JWT token eka verify karana middleware eka - protected routes walata aniwaryai
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 'Bearer <token>' format eken token eka ganna
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const isStudent = (req, res, next) => {
  // Me middleware eka 'authenticate' ekata passe run wenna one
  if (req.user && req.user.role === 'STUDENT') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Access is restricted to students.' });
};

module.exports = {
  authenticate,
  isStudent,
};
