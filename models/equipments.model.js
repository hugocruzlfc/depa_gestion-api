const Sequelize = require('sequelize');
const db = require('../config/database');

const Hardware  = require('./hardwares.model');
const Incident  = require('./incidents.model');

const Equipment = db.define('equipments', {
    id:{
        //allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING
    },
    faculty: {
        type: Sequelize.STRING
    },
    section: {
        type: Sequelize.STRING
    },
    
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },

})

Equipment.hasMany(Hardware , {
    foreignKey: 'equipmentId',
    onDelete: 'CASCADE',
    as: 'hardwares',
  });
  
  Hardware.belongsTo(Equipment, {
    foreignKey: 'equipmentId',
    as: 'equipments',
  });

Equipment.hasMany(Incident , {
    foreignKey: 'equipmentId',
    onDelete: 'CASCADE',
    as: 'incidents',
  });
  
  Incident.belongsTo(Equipment, {
    foreignKey: 'equipmentId',
    as: 'equipments',
  });
  

module.exports = Equipment;