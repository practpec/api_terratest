const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Reading = require('./Reading');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_readings: {
    type: DataTypes.INTEGER,
    references: {
      model: Reading,
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
  tableName: 'results',
  timestamps: false
});

Result.belongsTo(Reading, { foreignKey: 'id_readings' });

module.exports = Result;
