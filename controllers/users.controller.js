const db = require('../config/database');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const users = require('../models/users.model');
const Op = Sequelize.Op;




exports.allUsers = async(req, res) =>{
    
    try {
        const allUsers = await users.findAll(
            {order: [['id', 'asc']]}
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
    
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        section: req.body.section,
        faculty: req.body.faculty,
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
    console.log(req.body)
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
              email, password
            }});
        if(findUser){
           // const token = generateAuthToken(findUser.name, findUser.email); 
            res.status(200).json({auth: true, user: findUser });
        }else{
            res.status(200).json({auth: false });
        }
    } catch (error) {
              console.error(error)
    }
    
};
