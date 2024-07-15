const express = require('express');
const analysisReadingController = require('../controllers/analysisReadingController');

const router = express.Router();

router.post('/', analysisReadingController.createAnalysisReading);
router.get('/', analysisReadingController.getAnalysisReadings);
router.get('/:id', analysisReadingController.getAnalysisReadingById);
router.put('/:id', analysisReadingController.updateAnalysisReading);
router.delete('/:id', analysisReadingController.deleteAnalysisReading);

module.exports = router;
