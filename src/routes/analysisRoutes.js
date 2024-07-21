const express = require('express');
const analysisController = require('../controllers/analysisController');
const router = express.Router();
const authenticateToken  = require('../middlewares/authToken');
const idValidate = require('../validations/idValidate');
const error = require('../handlers/handlerValidation')
const analysisValidate = require('../validations/analysisValidate');

router.post('/',authenticateToken, analysisValidate.createValidate, error, analysisController.createAnalysisWithClientAndZones);
router.get('/',authenticateToken,  analysisController.getAnalyses);
router.get('/:id', authenticateToken, idValidate.getValidationId, error, analysisController.getAnalysisById);
router.delete('/:id', authenticateToken, idValidate.getValidationId, error, analysisController.deleteAnalysis);

module.exports = router;
