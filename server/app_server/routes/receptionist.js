var express = require('express');
var router = express.Router();
var recpController = require('../../controller/receptionistControls');
var recepAuthentication = require('../../middleware/ReceptionistAuthentication');

router.post('/login',recpController.login);
router.get('/logout',recpController.logout);
router.get('/getInfo',recepAuthentication,recpController.getInfo);
router.post('/register/patient',recpController.registerPatient);
router.post('/register/symptoms',recpController.addSymptoms);
router.post('/assign/doctor',recpController.assignDoctor);
router.post('/getPatientId',recpController.getPatientId);
router.get('/getProfile',recepAuthentication,recpController.getProfile);
router.post('/uploadImage',recepAuthentication,recpController.uploadImage);
router.post('/updateProfile',recepAuthentication,recpController.updateProfile);


module.exports = router;








module.exports = router;