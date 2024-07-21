const { body, check } = require('express-validator');

const getValidationId = [
    body('id_analysis')
        .isInt({ min: 1 }).withMessage('ID must be a positive integer'),
    check('id_zone')
        .optional()
        .isInt({ min: 1 }).withMessage('ID Zone must be a positive integer')
];

module.exports = {
    getValidationId,
};
