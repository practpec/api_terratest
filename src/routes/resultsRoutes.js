const express = require('express');
const router = express.Router();
const result = require('../controllers/resultsController');

router.get('/:id', result.getAnalysisById);

router.get('/zones/:id', result.getZonesByAnalysisId);

module.exports = router;
