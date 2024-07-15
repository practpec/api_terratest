const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router();

router.post('/', resultController.createResult);
router.get('/', resultController.getResults);
router.get('/:id', resultController.getResultById);
router.put('/:id', resultController.updateResult);
router.delete('/:id', resultController.deleteResult);

module.exports = router;
