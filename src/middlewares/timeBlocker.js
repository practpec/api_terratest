let isBlocked = false;
let unblockTime = null;

function timeBlocker(req, res, next) {
  if (isBlocked) {
    const currentTime = Date.now();
    if (currentTime < unblockTime) {
      return res.status(429).json({ message: 'La petición está bloqueada. Inténtalo de nuevo más tarde.' });
    } else {
      isBlocked = false; 
    }
  }
  
  isBlocked = true;
  unblockTime = Date.now() + 3 * 60 * 1000; 
  next();
}

module.exports = timeBlocker;