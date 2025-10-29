const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const decodedToken = jwt.verify(token, 'SECRET_KEY');
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};
