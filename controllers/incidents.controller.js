const db = require('../config/database');
const Sequelize = require('sequelize');
const incident = require('../models/incidents.model');
const equipment = require('../models/equipments.model');
const Op = Sequelize.Op;




exports.allIncidentsByUser = async(req, res) =>{
    let {id} = req.params;
    try {
        const incidents = await incident.findAll(
            {where:{ userId: id},
            order: [['id', 'asc']],
            include: [
                {
                  model: equipment,
                  as: 'equipments'
                }
            ]}
        );
        if(incidents){
            res.status(200).json(incidents);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.allIncidents = async(req, res) =>{
    try {
        const incidents = await incident.findAll(
            {order: [['id', 'asc']],include: [
                {
                  model: equipment,
                  as: 'equipments'
                }
            ]}
        );
        if(incidents){
            res.status(200).json(incidents);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.incidentById = async(req, res) =>{
    let { id } = req.params;
    try {
        const incidentById = await incident.findByPk(id);
        if(incidentById ){
            res.status(200).json(incidentById);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    const newIncident = {
       
        issue: req.body.issue,
        description: req.body.description,
        attended: 'No',
        equipmentId: req.body.equipmentId,
        type: req.body.type, 
        userId: req.body.userId
    }
    
    try {
        const incidentCreate = await incident.create(newIncident);
        if(incidentCreate){
            res.status(200).json(incidentCreate);
        }
    } catch (error) {
              console.error(error)
    }
    
};



exports.changeAtention = async(req, res) =>{
    const id = req.params.id;
    const attended = 'Si';
    try {
        const num = await incident.update({attended}, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'incident was update successfully!' });
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.update = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await incident.update(req.body, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'incident was update successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.delete = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await incident.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'incident was delete successfully!' });
        }
    } catch (error) {
              console.error(error)
    }
    
};
