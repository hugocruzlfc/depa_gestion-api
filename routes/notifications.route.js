const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notifications.controller');

//Routes with Controllers
router.get('/all', notificationsController.allNotifications);
router.get('/byid/:id', notificationsController.notificationById);
router.post('/create', notificationsController.create);
router.delete('/delete/:id', notificationsController.delete);



module.exports = router;