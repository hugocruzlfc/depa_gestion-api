const Sequelize = require('sequelize');

module.exports = new Sequelize('depa_gestion', 'postgres', 'admin',{
    host: "localhost",
    operatorsAliases: false,
    dialect: "postgres",

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }, 
 });