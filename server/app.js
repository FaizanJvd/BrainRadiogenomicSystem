var express = require('express');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var app = express();
app.use(express.json());
const dotenv = require("dotenv").config({path:"./config.env"});
require('./model/Db_Con');
const adminRouter = require('./app_server/routes/admin');
const receptionistRoutes = require('./app_server/routes/receptionist')
const patientRoutes = require('./app_server/routes/patient');
const chatMessageRoutes = require('./app_server/routes/chatMessage');
const doctorRoutes = require('./app_server/routes/doctor');
const radiologistRoutes = require('./app_server/routes/radiologist');
const reportRoutes = require('./app_server/routes/report');
const scansRoutes = require('./app_server/routes/scans');
const filterRoutes = require('./app_server/routes/filters');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept,Authorization"
//   );
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
//   next();
// });
var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({limit: '50mb'}));
app.use('/',adminRouter);
app.use('/receptionist',receptionistRoutes);
app.use('/patient',patientRoutes);
app.use('/doctor',doctorRoutes);
app.use('/chat',chatMessageRoutes);
app.use('/radiologist',radiologistRoutes);
app.use('/report',reportRoutes);
app.use('/scans',scansRoutes);
app.use('/filter',filterRoutes);
const port = 4000;

app.listen(port,()=>{
  console.log(`Server running at Port ${port}`);
});
