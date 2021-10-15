const express = require('express');
const router = express.Router();
const maintenancePlansController = require('../controllers/maintenancePlans.controller');

//Routes with Controllers
router.get('/all', maintenancePlansController.allMaintenancePlans);
router.get('/byid/:id', maintenancePlansController.maintenancePlanById);
router.post('/create', maintenancePlansController.create);
router.patch('/todone/:id', maintenancePlansController.changeDone);
router.put('/update/:id', maintenancePlansController.update);
router.delete('/delete/:id', maintenancePlansController.delete);



module.exports = router;