const Sequelize = require('sequelize');
const db = require('../config/database');

const Faculty  = require('./facultys.model');
const Section  = require('./sections.model');

const MaintenancePlan = db.define('maintenancePlans', {
    id:{
        //allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    facultyId: {
        type: Sequelize.INTEGER
    },
    sectionId:{
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    done: {
        type: Sequelize.STRING
    },
    starDate: {
        type: Sequelize.DATEONLY
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },

})

Faculty.hasMany(MaintenancePlan , {
    foreignKey: 'facultyId',
    onDelete: 'CASCADE',
    as: 'maintenancePlans',
  });
  
  MaintenancePlan.belongsTo(Faculty, {
    foreignKey: 'facultyId',
    as: 'facultys',
  });

  Section.hasMany(MaintenancePlan , {
    foreignKey: 'sectionId',
    onDelete: 'CASCADE',
    as: 'maintenancePlans',
  });
  
  MaintenancePlan.belongsTo(Section, {
    foreignKey: 'sectionId',
    as: 'sections',
  });

module.exports = MaintenancePlan;