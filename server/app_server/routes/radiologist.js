var express = require('express');
var router = express.Router();
var radiologistController = require('../../controller/radiologistController');
var radiologistAuthentication = require('../../middleware/radiologistAuthentication');

router.post('/login',radiologistController.login);
router.get('/logout',radiologistController.logout);
router.get('/getInfo',radiologistAuthentication,radiologistController.getProfile);

router.get('/getProfile',radiologistAuthentication,radiologistController.getProfile);
router.post('/uploadImage',radiologistAuthentication,radiologistController.uploadImage);

router.post('/updateProfile',radiologistAuthentication,radiologistController.updateProfile);

router.get('/getAssignedPatients',radiologistAuthentication,radiologistController.getAssignedPatient);
// delete patient from assigned patient list
router.post('/deleteAssignedPatient',radiologistAuthentication,radiologistController.deleteAssignedPatient);









module.exports = router;