const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ResultadosCultivos = sequelize.define('ResultadosCultivos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_zone: {
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
    },
    id_analysis: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'resultados_cultivos',
    timestamps: false
});

module.exports = ResultadosCultivos; 