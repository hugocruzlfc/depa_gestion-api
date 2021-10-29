const db = require('../config/database');
const Sequelize = require('sequelize');
const Faculty = require('../models/facultys.model');




exports.allFaculty = async(req, res) =>{
    
    try {
        const allFacultys = await Faculty.findAll({
            order: [['id', 'asc']]
        }

        );
        if(allFacultys){
            res.status(200).json(allFacultys);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.allFacultyByName = async(req, res) =>{
    const name = params.name;
    
    try {
        const allFaculty = await Faculty.findAll({where:{ name: name}});
        if(allFaculty){
            res.status(200).json(allFaculty);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.facultyById = async(req, res) =>{
    let { id } = req.params;
    try {
        const facultyById = await Faculty.findByPk(id);
        if(FacultyById ){
            res.status(200).json(facultyById);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    
    const newFaculty = {
        name: req.body.name,
        campus: req.body.campus
    }
    const t = await db.transaction();
    try {
        const newFacultyCreate = await Faculty.create(newFaculty,  {
            transaction: t,
          });
        if(newFacultyCreate){
            await t.commit();
            res.status(200).json(newFacultyCreate);
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
        const num = await Faculty.update(req.body, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'Faculty was update successfully!' });
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
        const num = await Faculty.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'Faculty was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};



