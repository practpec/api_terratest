const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken  = require('../middlewares/authToken');
const validationsUsers = require('../validations/validationsUsers');
const error = require('../handlers/handlerValidation')
const router = express.Router();

router.post('/login', validationsUsers.longinValidation, error, userController.login);
router.post('/register', validationsUsers.createValidation, error, userController.register);
router.get('/', authenticateToken,  userController.getUsers);
router.get('/:id', authenticateToken, validationsUsers.getValidationId, error, userController.getUserById);
router.put('/:id', authenticateToken, validationsUsers.updateValidation, error, userController.updateUser);
router.delete('/:id', authenticateToken, validationsUsers.getValidationId, error,  userController.deleteUser);

module.exports = router;
