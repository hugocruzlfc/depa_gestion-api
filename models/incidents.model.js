const Sequelize = require('sequelize');
const db = require('../config/database');

const Notification = require('./notifications.models');

const Incident = db.define('incidents', {
    id:{
        //allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    issue: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    equipmentId:{
        type: Sequelize.INTEGER
    },
    type: {
        type: Sequelize.STRING
    },
    attended: {
        type: Sequelize.STRING
    },
    userId: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },

})


Incident.hasOne(Notification, {
    foreignKey: 'incidentId',   
    onDelete: 'CASCADE',
    as: 'notifications',
  });
  
  Notification.belongsTo(Incident, {
    foreignKey: 'incidentId',
    sourceKey: 'incidentId',
    as: 'incidents',
  });


module.exports = Incident;