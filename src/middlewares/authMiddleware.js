const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'Access denied' });

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

module.exports = authenticate;
