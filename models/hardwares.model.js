const Sequelize = require('sequelize');
const db = require('../config/database');

const Incident = require('./incidents.model');

const Hardware = db.define('hardwares', {
    id:{
        //allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    equipmentId:{
        type: Sequelize.INTEGER
    },
    noSerie: {
        type: Sequelize.STRING
    },
    name: {
        type: Sequelize.STRING
    },
    label: {
        type: Sequelize.STRING
    },
    
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    },

})



module.exports = Hardware;