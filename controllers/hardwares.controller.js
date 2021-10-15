const db = require('../config/database');
const Sequelize = require('sequelize');
const hardware = require('../models/hardwares.model');
const Op = Sequelize.Op;




exports.allHardwares = async(req, res) =>{
    
    try {
        const hardwares = await hardware.findAll(
            {order: [['id', 'asc']]}
        );
        if(hardwares){
            res.status(200).json(hardwares);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.hardwareById = async(req, res) =>{
    let { id } = req.params;
    try {
        const hardwareById = await hardware.findByPk(id);
        if(hardwareById ){
            res.status(200).json(hardwareById);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    const newHardware = {
       
        noSerie: req.body.noSerie,
        name: req.body.name,
        label: req.body.type
    }
    
    try {
        const hardwareCreate = await hardware.create(newHardware);
        if(hardwareCreate){
            res.status(200).json(hardwareCreate);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.update = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await hardware.update(req.body, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'hardware was update successfully!' });
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.delete = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await hardware.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'hardware was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};
