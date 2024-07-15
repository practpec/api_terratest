const express = require('express');
const analysisResultController = require('../controllers/analysisResultController');

const router = express.Router();

router.post('/', analysisResultController.createAnalysisResult);
router.get('/', analysisResultController.getAnalysisResults);
router.get('/:id', analysisResultController.getAnalysisResultById);
router.put('/:id', analysisResultController.updateAnalysisResult);
router.delete('/:id', analysisResultController.deleteAnalysisResult);

module.exports = router;
