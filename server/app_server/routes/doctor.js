var express = require('express');
var router = express.Router();
var doctorController = require('../../controller/doctorController');
var doctorAuthentication = require('../../middleware/doctorAuthentication');
router.get('/getDoctorProfile',doctorAuthentication,doctorController.getDoctorProfile);
router.post('/login',doctorController.login);
router.get('/logout',doctorController.logout);
router.get('/getInfo',doctorAuthentication,doctorController.getInfo);
router.post('/uploadImage',doctorAuthentication,doctorController.uploadImage);
router.post('/updateDoctorProfile',doctorAuthentication,doctorController.updateDoctorProfile);
router.get('/getAssignedPatient',doctorAuthentication,doctorController.getAssignedPatient);
router.post('/addRxRec',doctorAuthentication,doctorController.addRxRec);
router.post('/verifyEmail',doctorController.verifEmail);
router.post('/updatePassword',doctorController.updatePassword);
router.get('/getRadiologist',doctorController.get_Radiologist_record);
router.post('/assignRadiologist',doctorController.assignRadiologist);
router.post('/unAssignPatient',doctorAuthentication,doctorController.unAssignPatient);

module.exports = router;