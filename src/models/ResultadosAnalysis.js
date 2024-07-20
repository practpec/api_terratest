const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ResultadosAnalysis = sequelize.define('ResultadosAnalysis', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_analysis: {
        type: DataTypes.INTEGER
    },
    cultivo: {
        type: DataTypes.STRING
    },
    apto: {
        type: DataTypes.BOOLEAN
    },
    detalles: {
        type: DataTypes.TEXT
    },
    porcentaje: {
        type: DataTypes.FLOAT
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'resultados_analysis',
    timestamps: false
});

module.exports = ResultadosAnalysis;