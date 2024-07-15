const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Analysis = require('./Analysis');

const AnalysisReading = sequelize.define('AnalysisReading', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_analysis: {
    type: DataTypes.INTEGER,
    references: {
      model: Analysis,
      key: 'id'
    }
  },
  temperature: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  conductivity: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  potassium: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  phosphorus: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  nitrogen: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  deleted: {
    type: DataTypes.TINYINT,
    allowNull: true,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'analysis_readings',
  timestamps: false
});

AnalysisReading.belongsTo(Analysis, { foreignKey: 'id_analysis' });

module.exports = AnalysisReading;
