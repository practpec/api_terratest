const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const AnalysisReading = require('./AnalysisReading');

const AnalysisResult = sequelize.define('AnalysisResult', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_analysis_readings: {
    type: DataTypes.INTEGER,
    references: {
      model: AnalysisReading,
      key: 'id'
    }
  },
  crop: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  fit: {
    type: DataTypes.TINYINT,
    allowNull: true
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'analysis_results',
  timestamps: false
});

AnalysisResult.belongsTo(AnalysisReading, { foreignKey: 'id_analysis_readings' });

module.exports = AnalysisResult;