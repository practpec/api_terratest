const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 50, 
  message: 'Demasiadas solicitudes desde esta IP',
});

module.exports = limiter;
