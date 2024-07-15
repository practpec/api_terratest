const express = require('express');
const readingController = require('../controllers/readingController');

const router = express.Router();

router.post('/', readingController.createReading);
router.get('/', readingController.getReadings);
router.get('/:id', readingController.getReadingById);
router.put('/:id', readingController.updateReading);
router.delete('/:id', readingController.deleteReading);

module.exports = router;
