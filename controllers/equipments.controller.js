const db = require('../config/database');
const Sequelize = require('sequelize');
const equipment = require('../models/equipments.model');
const hardwares = require('../models/hardwares.model');
const Faculty = require('../models/facultys.model');
const Section = require('../models/sections.model');
const Op = Sequelize.Op;




exports.allequipments = async(req, res) =>{
    
    try {
        const equipments = await equipment.findAll(
            {order: [['id', 'asc']],include: [
                {
                  model: hardwares,
                  as: 'hardwares'
                },
                {
                    model: Faculty,
                    as: 'facultys',
                  },
                  {
                    model: Section,
                    as: 'sections',
                  },
            ]}
        );
        if(equipments){
            res.status(200).json(equipments);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};

exports.equipmentById = async(req, res) =>{
    let { id } = req.params;
    try {
        const equipmentById = await equipment.findByPk(id,{
            include: [
                {
                  model: hardwares,
                  as: 'hardwares'
                }
            ]
        });
        if(equipmentById ){
            res.status(200).json(equipmentById);
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.create = async(req, res) =>{
    const newEquipment = {
        name: req.body.equipment.name,
        facultyId: req.body.equipment.facultyId,
        sectionId: req.body.equipment.sectionId
    }
    const t = await db.transaction();
    let newHardwares = [];
    let arrayHardwares = req.body.hardwares;

    try {
        const equipmentCreate = await equipment.create(newEquipment,{
            transaction: t,
          });
          if (arrayHardwares.length > 0) {
            for (let index = 0; index < arrayHardwares.length; index++) {
              const newHardwareCreate= {
                equipmentId: equipmentCreate.id,
                name: arrayHardwares[index].name,
                noSerie: arrayHardwares[index].noSerie,
                label: arrayHardwares[index].label
              };
              const newHardware = await hardwares.create(
                newHardwareCreate,
                { transaction: t },
              );
              newHardwares.push(newHardware);
            }
          };
        await Promise.all(newHardwares);
        await t.commit();
        res.status(200).json({equipmentCreate, newHardwares});
    } catch (error) {
              console.error(error)
    }
    
};

exports.update = async(req, res) =>{
    const id = req.params.id;
    let newHardwares = [];
    let arrayHardwares = req.body.hardwares;
    const t = await db.transaction();
    try {
        const num = await equipment.update(req.body.equipment, {where:{ id: id}}, {transaction: t} );
        if (arrayHardwares.length > 0) {
            for (let index = 0; index < arrayHardwares.length; index++) {
              const newHardwareCreate= {
                equipmentId: req.body.equipment.id,
                name: arrayHardwares[index].name,
                noSerie: arrayHardwares[index].noSerie,
                label: arrayHardwares[index].label
              };
              const newHardware = await hardwares.create(
                newHardwareCreate,
                { transaction: t },
              );
              newHardwares.push(newHardware);
            }
          };
        if(num == 1){
            await Promise.all(newHardwares);
            await t.commit();
            res.status(200).json({ info: 'equipment was update successfully!' });
        }else{
            await t.rollback();
        }
    } catch (error) {
              console.error(error)
    }
    
};


exports.delete = async(req, res) =>{
    const id = req.params.id;
    
    try {
        const num = await equipment.destroy({where:{ id: id}} );
        if(num == 1){
            res.status(200).json({ info: 'equipment was delete successfully!' });
        }else{
            res.sendStatus(404);
        }
    } catch (error) {
              console.error(error)
    }
    
};
