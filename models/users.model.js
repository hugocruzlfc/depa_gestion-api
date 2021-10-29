const Sequelize = require('sequelize');
const db = require('../config/database');


const Faculty = require('./facultys.model');
const Section = require('./sections.model');
const Incident = require('./incidents.model');


const User = db.define('users', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        // allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    facultyId: {
        type: Sequelize.INTEGER
    },
    sectionId: {
        type: Sequelize.INTEGER
    },
    dni: {
        type: Sequelize.INTEGER
    },
    celular: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },

})




User.hasMany(Incident, {
    foreignKey: 'userId',   
    onDelete: 'CASCADE',
    as: 'incidents',
  });
  
  Incident.belongsTo(User, {
    foreignKey: 'userId',
    sourceKey: 'userId',
    as: 'users',
  });

Faculty.hasMany(User, {
    foreignKey: 'facultyId',   
    as: 'users',
  });
  
  User.belongsTo(Faculty, {
    foreignKey: 'facultyId',
    sourceKey: 'facultyId',
    as: 'facultys',
  });

Section.hasMany(User, {
    foreignKey: 'sectionId',
    as: 'users',
  });
  
  User.belongsTo(Section, {
    foreignKey: 'sectionId',
    sourceKey: 'sectionId',
    as: 'sections',
  });
  

module.exports = User;