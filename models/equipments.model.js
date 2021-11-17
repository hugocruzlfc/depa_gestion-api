const Sequelize = require('sequelize');
const db = require('../config/database');

const Hardware  = require('./hardwares.model');
const Incident  = require('./incidents.model');
const Faculty = require('./facultys.model');
const Section = require('./sections.model');

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
    facultyId: {
      type: Sequelize.INTEGER
  },
  sectionId: {
      type: Sequelize.INTEGER
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


  Faculty.hasMany(Equipment, {
    foreignKey: 'facultyId',   
    as: 'equipments',
  });
  
  Equipment.belongsTo(Faculty, {
    foreignKey: 'facultyId',
    sourceKey: 'facultyId',
    as: 'facultys',
  });

Section.hasMany(Equipment, {
    foreignKey: 'sectionId',
    as: 'equipments',
  });
  
  Equipment.belongsTo(Section, {
    foreignKey: 'sectionId',
    sourceKey: 'sectionId',
    as: 'sections',
  });
  
  

module.exports = Equipment;