const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Sexo = db.define('Sexo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'sexos',
  timestamps: false,
});

module.exports = Sexo;