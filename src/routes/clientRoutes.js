const express = require('express');
const clientController = require('../controllers/clientController');

const router = express.Router();

router.get('/', clientController.getClients);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClient);
router.get('/analysis/:id', clientController.getAnalysesByClient);

module.exports = router;
