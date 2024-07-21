const { body } = require('express-validator');

const createValidate = [
    body('client.name')
        .optional()
        .isString().withMessage('El nombre del cliente debe ser una cadena de texto')
        .isLength({ max: 60 }).withMessage('El nombre del cliente debe tener hasta 60 caracteres'),
    body('client.number_contact')
        .optional()
        .isString().withMessage('El número de contacto del cliente debe ser una cadena de texto')
        .isLength({ min: 10 }).withMessage('El número de contacto del cliente debe tener al menos 10 caracteres'),
    body('client.locate')
        .optional()
        .isString().withMessage('La ubicación del cliente debe ser una cadena de texto'),

    body('zones.*.indications')
        .optional()
        .isString().withMessage('Las indicaciones de la zona deben ser una cadena de texto'),
    body('zones.*.depth')
        .optional()
        .isFloat({ min: 0 }).withMessage('La profundidad de la zona debe ser un número positivo'),

    body('name')
        .optional()
        .isString().withMessage('El nombre del análisis debe ser una cadena de texto')
        .isLength({ max: 45 }).withMessage('El nombre del análisis debe tener hasta 45 caracteres'),
    body('content')
        .optional()
        .isString().withMessage('El contenido del análisis debe ser una cadena de texto')
        .isLength({ max: 45 }).withMessage('El contenido del análisis debe tener hasta 45 caracteres'),
    body('locate')
        .optional()
        .isString().withMessage('La ubicación del análisis debe ser una cadena de texto')
        .isLength({ max: 45 }).withMessage('La ubicación del análisis debe tener hasta 45 caracteres')
];

module.exports = {
    createValidate,
};
