const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  number_contact: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
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
  tableName: 'users',
  timestamps: false
});

module.exports = User;
