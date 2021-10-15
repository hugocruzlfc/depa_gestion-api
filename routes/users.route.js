const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

//Routes with Controllers
router.get('/all', usersController.allUsers);
router.get('/byname/:name', usersController.allUsersByName);
router.get('/byid/:id', usersController.userById);
router.post('/create', usersController.create);
router.post('/login', usersController.login);
router.put('/update/:id', usersController.update);
router.delete('/delete/:id', usersController.delete);



module.exports = router;