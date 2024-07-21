
const express = require('express');
const router = express.Router();
const authenticateToken  = require('../middlewares/authToken');
const mqttController = require('../controllers/mqttController');
const idMqttValidate = require('../validations/idMqttValidate');
const error = require('../handlers/handlerValidation')
const timeBlocker = require('../middlewares/timeBlocker')

router.post('/', authenticateToken, timeBlocker, idMqttValidate.getValidationId, error, mqttController.activarScript);

module.exports = router;

