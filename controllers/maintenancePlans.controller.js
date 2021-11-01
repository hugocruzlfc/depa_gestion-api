const db = require('../config/database');
const Sequelize = require('sequelize');
const maintenancePlan = require('../models/maintenancePlans.model');
const facultys = require('../models/facultys.model');
const sections = require('../models/sections.model');
const Op = Sequelize.Op;




exports.allMaintenancePlans = async(req, res) =>{
    
    try {
        const maintenancePlans = await maintenancePlan.findAll(
            {order: [['id', 'asc']],include: [
                {
                  model: facultys,
                  as: 'facultys'
                },
                {
                  model: sections,
                  as: 'sections'
                },
            ]}
        );
        if(maintenancePlans){
            res.status(200).json(maintenancePlans);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.changeDone = async(req, res) =>{
    const id = req.params.id;
    const done = 'Si';
    try {
        const num = await maintenancePlan.update({done}, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'Plans was update successfully!' });
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.maintenancePlanById = async(req, res) =>{
    let { id } = req.params;
    try {
        const maintenancePlanById = await maintenancePlan.findByPk(id);
        if(maintenancePlanById ){
            res.status(200).json(maintenancePlanById);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    const newMaintenancePlan = {
       
        facultyId: req.body.facultyId,
        sectionId: req.body.sectionId,
        description: req.body.description,
        done: 'No',
        starDate: req.body.starDate
    }
    try {
        const maintenancePlanCreate = await maintenancePlan.create(newMaintenancePlan);
        if(maintenancePlanCreate){
            res.status(200).json(maintenancePlanCreate);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.update = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await maintenancePlan.update(req.body, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'maintenancePlan was update successfully!' });
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
        const num = await maintenancePlan.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'maintenancePlan was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};
