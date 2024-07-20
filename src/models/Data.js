const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Data = sequelize.define('Data', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    humidity: {
        type: DataTypes.FLOAT
    },
    temperature: {
        type: DataTypes.FLOAT
    },
    conductivity: {
        type: DataTypes.FLOAT
    },
    ph: {
        type: DataTypes.FLOAT
    },
    nitrogen: {
        type: DataTypes.FLOAT
    },
    phosphorus: {
        type: DataTypes.FLOAT
    },
    potassium: {
        type: DataTypes.FLOAT
    },
    id_zone: {
        type: DataTypes.INTEGER
    },
    id_analysis: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'data',
    timestamps: false
});

module.exports = Data;