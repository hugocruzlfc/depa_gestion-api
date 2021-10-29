const db = require('../config/database');
const Sequelize = require('sequelize');
const Section = require('../models/sections.model');




exports.allSection = async(req, res) =>{
    
    try {
        const allSections = await Section.findAll({
            order: [['id', 'asc']]
        }

        );
        if(allSections){
            res.status(200).json(allSections);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.allSectionByName = async(req, res) =>{
    const name = params.name;
    
    try {
        const allSection = await Section.findAll({where:{ name: name}});
        if(allSection){
            res.status(200).json(allSection);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.sectionById = async(req, res) =>{
    let { id } = req.params;
    try {
        const sectionById = await Section.findByPk(id);
        if(sectionById ){
            res.status(200).json(sectionById);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    
    const newSection = {
        name: req.body.name
    }
    const t = await db.transaction();
    try {
        const newSectionCreate = await Section.create(newSection,  {
            transaction: t,
          });
        if(newSectionCreate){
            await t.commit();
            res.status(200).json(newSectionCreate);
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
        const num = await Section.update(req.body, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'Section was update successfully!' });
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
        const num = await Section.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'Section was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

