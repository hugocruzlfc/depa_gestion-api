const express = require('express');
const router = express.Router();
const hardwaresController = require('../controllers/hardwares.controller');

//Routes with Controllers
router.get('/all', hardwaresController.allHardwares);
router.get('/byid/:id', hardwaresController.hardwareById);
router.post('/create', hardwaresController.create);
router.put('/update/:id', hardwaresController.update);
router.delete('/delete/:id', hardwaresController.delete);



module.exports = router;