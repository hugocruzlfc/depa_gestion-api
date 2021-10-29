const express = require('express');
const path = require('path');
var cors = require('cors');
const app = express();

//Databse
const db = require('./config/database');

//db.sync();

 //Test DB
 db.authenticate()
        .then(() => console.log('Database connected...'))
        .catch((err) => console.log('Error:' + err))

// //Allow api function to apps
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, cache-control');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

  //MiddleWares Body-Parser
  app.use(express.json());
  app.use(express.urlencoded({
      extended: true
   }));
   app.use(cors());


//simple route
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, Sequelize and Postgres API' })
})


//ROUTES
//users
const usersRoute = require('./routes/users.route');
app.use( '/api/users', usersRoute);

//incidents
const incidentsRoute = require('./routes/incidents.route');
app.use( '/api/incidents', incidentsRoute);

//hardwares
const hardwaresRoute = require('./routes/hardwares.route');
app.use( '/api/hardwares', hardwaresRoute);

//hardwares
const equipmentsRoute = require('./routes/equipments.route');
app.use( '/api/equipments', equipmentsRoute);

//maintenancePlan
const maintenancePlanRoute = require('./routes/maintenancePlans.route');
app.use( '/api/maintenancePlan', maintenancePlanRoute);

//notifications
const notificationsRoute = require('./routes/notifications.route');
app.use( '/api/notifications', notificationsRoute);

//sections
const sectionsRoute = require('./routes/sections.route');
app.use( '/api/sections', sectionsRoute);

//facultys
const facultysRoute = require('./routes/facultys.route');
app.use( '/api/facultys', facultysRoute);


//sent listen port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}.`)
})
