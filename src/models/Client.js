const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Analysis = require('../models/Analysis');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: true
  },
  number_contact: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  locate: {
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
  tableName: 'clients',
  timestamps: false
});


module.exports = Client;
