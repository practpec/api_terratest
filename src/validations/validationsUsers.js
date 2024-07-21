const { body, param } = require('express-validator');

const createValidation = [
    body('name')
        .optional()
        .isString().withMessage('Debe der string')
        .isLength({ min: 1, max: 60 }).withMessage('Uno al 60'),
    body('email')
        .optional()
        .isString().withMessage('Debe der string')
        .isLength({ min: 8 }).withMessage('Minino 8'),
    body('number_contact')
        .optional()
        .isString().withMessage('Debe der string')
        .isLength({ min: 10 }).withMessage('Minimo 10 caracteres'),
    body('password')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('Es requerido')
        .isLength({ min: 8 }).withMessage('Minimo 10 caracteres')
];

const longinValidation = [
    body('email')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('Es requerido')
        .isLength({ min: 1, max: 60 }).withMessage('Uno al 60'),
    body('password')
        .isString().withMessage('Debe ser string')
        .notEmpty().withMessage('Es requerido')
        .isLength({ min: 8 }).withMessage('Minimo 8 caracteres')
];

const updateValidation = [
    body('name')
        .optional()
        .isString().withMessage('Debe der string')
        .isLength({ min: 1, max: 60 }).withMessage('Uno al 60'),
    body('email')
        .optional()
        .isString().withMessage('Debe der string')
        .isLength({ min: 8 }).withMessage('Minino 8'),
    body('number_contact')
        .optional()
        .isString().withMessage('Debe der string')
        .isLength({ min: 10 }).withMessage('Minimo 10 caracteres')
];

const getValidationId = [
    param('id')
        .isInt({ min: 1 }).withMessage('ID must be a positive integer')
];


module.exports = {
    createValidation,
    longinValidation,
    updateValidation,
    getValidationId,
};
