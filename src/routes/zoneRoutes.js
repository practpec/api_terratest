const express = require('express');
const zoneController = require('../controllers/zoneController');
const authenticateToken  = require('../middlewares/authToken');
const idValidate = require('../validations/idValidate');
const error = require('../handlers/handlerValidation')
const router = express.Router();

router.get('/', authenticateToken, zoneController.getZones);
router.get('/:id', authenticateToken, idValidate.getValidationId, error,  zoneController.getZoneById);
router.delete('/:id',authenticateToken, idValidate.getValidationId, error, zoneController.deleteZone);

module.exports = router;
