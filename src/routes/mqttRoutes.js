
const express = require('express');
const router = express.Router();
const mqttController = require('../controllers/mqttController');

router.post('/', mqttController.activarScript);

module.exports = router;

