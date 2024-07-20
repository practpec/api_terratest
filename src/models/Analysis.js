const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Client = require('./Client');


const Analysis = sequelize.define('Analysis', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_client: {
    type: DataTypes.INTEGER,
    references: {
      model: Client,
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  content: {
    type: DataTypes.STRING(45),
    allowNull: true
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
  tableName: 'analysis',
  timestamps: false
});

Analysis.belongsTo(Client, { foreignKey: 'id_client' });
Client.hasMany(Analysis, { foreignKey: 'id_client' });

module.exports = Analysis;
