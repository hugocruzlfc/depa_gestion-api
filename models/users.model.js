const Sequelize = require('sequelize');
const db = require('../config/database');


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
    section: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
    },
    faculty: {
        type: Sequelize.STRING
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
  

module.exports = User;