const express = require('express');
const router = express.Router();
const equipmentsController = require('../controllers/equipments.controller');

//Routes with Controllers
router.get('/all', equipmentsController.allequipments);
router.get('/byid/:id', equipmentsController.equipmentById);
router.post('/create', equipmentsController.create);
router.put('/update/:id', equipmentsController.update);
router.delete('/delete/:id', equipmentsController.delete);



module.exports = router;