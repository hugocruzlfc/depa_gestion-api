const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultys.controller');

//Routes with Controllers
router.get('/all', facultyController.allFaculty);
router.get('/byname/:name', facultyController.allFacultyByName);
router.get('/byid/:id', facultyController.facultyById);
router.post('/create', facultyController.create);
router.put('/update/:id', facultyController.update);
router.delete('/delete/:id', facultyController.delete);



module.exports = router;