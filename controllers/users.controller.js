const db = require('../config/database');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const users = require('../models/users.model');
const Faculty = require('../models/facultys.model');
const Section = require('../models/sections.model');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;




exports.allUsers = async(req, res) =>{
    
    try {
        const allUsers = await users.findAll({
            order: [['id', 'asc']], 
            include: [
                {
                  model: Faculty,
                  as: 'facultys',
                },
                {
                  model: Section,
                  as: 'sections',
                },
              ],
        }

        );
        if(allUsers){
            res.status(200).json(allUsers);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.allUsersByName = async(req, res) =>{
    const name = params.name;
    
    try {
        const allUsers = await users.findAll({where:{ name: name}});
        if(allUsers){
            res.status(200).json(allUsers);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.userById = async(req, res) =>{
    let { id } = req.params;
    try {
        const usersById = await users.findByPk(id);
        if(usersById ){
            res.status(200).json(usersById);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    const salt = bcrypt.genSaltSync(10, 'a');
    const passwordEncrypt = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: passwordEncrypt,
        role: req.body.role,
        sectionId: req.body.sectionId,
        facultyId: req.body.facultyId,
        dni: req.body.dni,
        celular: req.body.celular,
        address: req.body.address
    }
    const t = await db.transaction();
    try {
        const newUserCreate = await users.create(newUser,  {
            transaction: t,
          });
        if(newUserCreate){
            await t.commit();
            res.status(200).json(newUserCreate);
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
        const num = await users.update(req.body, {where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'users was update successfully!' });
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
        const num = await users.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'users was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


 // Generate an auth token for the users
 const generateAuthToken = (name, email )=> {
    const token = jwt.sign({
        name: name,
        email: email
    }, 'authenticated');
    return token
 }

 exports.login = async(req, res) =>{
    let { email, password } = req.body;
    
    try {
        const findUser = await users.findOne({
            where: {
              email
            }});
            if(findUser){
             if (bcrypt.compareSync(password, findUser.password)) {
                res.status(200).json({auth: true, user: findUser });
           }
           else{
            res.status(200).json({auth: false });
        }
        }
          
        else{
            res.status(200).json({auth: false });
        }
    } catch (error) {
              console.error(error)
    }
    
};
