const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Zone = require('./Zone');

const Reading = sequelize.define('Reading', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_zone: {
    type: DataTypes.INTEGER,
    references: {
      model: Zone,
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
  tableName: 'readings',
  timestamps: false
});

Reading.belongsTo(Zone, { foreignKey: 'id_zone' });

module.exports = Reading;
