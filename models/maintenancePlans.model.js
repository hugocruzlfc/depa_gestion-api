const Sequelize = require('sequelize');
const db = require('../config/database');



const MaintenancePlan = db.define('maintenancePlans', {
    id:{
        //allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    section: {
        type: Sequelize.STRING
    },
    faculty: {
        type: Sequelize.STRING
    },
    equipmentId:{
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



module.exports = MaintenancePlan;