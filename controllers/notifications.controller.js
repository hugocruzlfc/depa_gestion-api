const db = require('../config/database');
const Sequelize = require('sequelize');
const notification = require('../models/notifications.models');




exports.allNotifications = async(req, res) =>{
    
    try {
        const notifications = await notification.findAll();
        if(notifications){
            res.status(200).json(notifications);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.notificationById = async(req, res) =>{
    let { id } = req.params;
    try {
        const notificationById = await notification.findByPk(id);
        if(notificationById ){
            res.status(200).json(notificationById);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    const newNotification = {
        incidentId: req.body.incidentId
    }
    try {
        const notificationCreate = await notification.create(newNotification);
        if(notificationCreate){
            res.status(200).json(notificationCreate);
        }
    } catch (error) {
              console.error(error)
    }
    
}; 

exports.delete = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await notification.destroy({where:{ incidentId: id}} );
        if(num == 1){
            res.status(200).json({ info: 'notification was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};
