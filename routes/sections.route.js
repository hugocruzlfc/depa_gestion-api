const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sections.controller');

//Routes with Controllers
router.get('/all', sectionController.allSection);
router.get('/byname/:name', sectionController.allSectionByName);
router.get('/byid/:id', sectionController.sectionById);
router.post('/create', sectionController.create);
router.put('/update/:id', sectionController.update);
router.delete('/delete/:id', sectionController.delete);



module.exports = router;