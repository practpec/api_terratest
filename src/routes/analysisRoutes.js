const express = require('express');
const analysisController = require('../controllers/analysisController');

const router = express.Router();

router.post('/', analysisController.createAnalysisWithClientAndZones);
router.get('/', analysisController.getAnalyses);
router.get('/:id', analysisController.getAnalysisById);
router.delete('/:id', analysisController.deleteAnalysis);

module.exports = router;
