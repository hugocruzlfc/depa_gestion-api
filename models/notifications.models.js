const Sequelize = require('sequelize');
const db = require('../config/database');

const Notifications = db.define('notifications', {
    id:{
        //allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    incidentId: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },

})



module.exports = Notifications;