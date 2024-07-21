const express = require('express');
const router = express.Router();
const result = require('../controllers/resultsController');
const authenticateToken  = require('../middlewares/authToken');
const idValidate = require('../validations/idValidate');
const error = require('../handlers/handlerValidation')

router.get('/:id', authenticateToken, idValidate.getValidationId, error, result.getAnalysisById);

router.get('/zones/:id', authenticateToken, idValidate.getValidationId, error, result.getZonesByAnalysisId);

module.exports = router;
