const express = require('express');
const router = express.Router();
const incidentsController = require('../controllers/incidents.controller');

//Routes with Controllers
router.get('/all/:id', incidentsController.allIncidentsByUser);
router.get('/all', incidentsController.allIncidents);
router.get('/byid/:id', incidentsController.incidentById);
router.post('/create', incidentsController.create);
router.patch('/toatention/:id', incidentsController.changeAtention);
router.put('/update/:id', incidentsController.update);
router.delete('/delete/:id', incidentsController.delete);



module.exports = router;