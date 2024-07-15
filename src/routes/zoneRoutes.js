const express = require('express');
const zoneController = require('../controllers/zoneController');

const router = express.Router();

router.post('/', zoneController.createZone);
router.get('/', zoneController.getZones);
router.get('/:id', zoneController.getZoneById);
router.put('/:id', zoneController.updateZone);
router.delete('/:id', zoneController.deleteZone);

module.exports = router;
