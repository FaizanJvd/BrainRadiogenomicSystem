var express = require('express');
var router = express.Router();
var patientController = require('../../controller/patientControls')
const authenticate = require('../../middleware/patientAuthentication')
router.post("/login",patientController.login);
router.get('/getInfo',authenticate,patientController.getInfo);
router.get("/assignedDoctor",authenticate,patientController.getAssignedDoctor);
router.get("/profile",authenticate,patientController.getProfile);
router.post("/updateProfile",authenticate,patientController.updateProfile);
router.post("/uploadProfilePicture",authenticate,patientController.uploadImage);
router.get("/getHistory",authenticate,patientController.getHistory);
router.post('/verifyEmail',patientController.verifEmail);
router.post('/updatePassword',patientController.updatePassword);
router.get("/logout",patientController.logout);
module.exports = router;