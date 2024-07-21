const express = require('express');
const clientController = require('../controllers/clientController');
const authenticateToken  = require('../middlewares/authToken');
const idValidate = require('../validations/idValidate');
const error = require('../handlers/handlerValidation')

const router = express.Router();

router.get('/',authenticateToken, clientController.getClients);
router.get('/:id',authenticateToken,  idValidate.getValidationId, error, clientController.getClientById);
router.put('/:id',authenticateToken,  clientController.updateClient);
router.get('/analysis/:id',authenticateToken, idValidate.getValidationId, error, clientController.getAnalysesByClient);

module.exports = router;
