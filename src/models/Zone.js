const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Analysis = require('./Analysis');

const Zone = sequelize.define('Zone', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_analysis: {
    type: DataTypes.INTEGER,
    references: {
      model: Analysis,
      key: 'id'
    }
  },
  indications: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  depth: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 5
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
  tableName: 'zones',
  timestamps: false
});

Zone.belongsTo(Analysis, { foreignKey: 'id_analysis' });

module.exports = Zone;
