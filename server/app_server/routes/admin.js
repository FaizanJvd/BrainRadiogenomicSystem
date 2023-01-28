var express = require('express');
var router = express.Router();
const control = require('../../controller/controls');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello from Admin');
});
router.post('/adminLogin',control.check_admin_loginCredential)
router.post('/register/doctor',control.register_doctor);
router.post('/register/radiologist',control.register_radiologist);
router.post('/register/receptionist',control.register_receptionist);
router.post('/register/labTechnician',control.register_labTechnician);

router.post('/sendCredendials/mail',control.send_credential_mail);

router.get('/getpatient',control.get_patient_record);
router.delete('/deletePatient',control.delete_patient_record);
router.put('/updatePatient',control.edit_patient_record);

router.get('/getDoctor',control.get_doctor_record);
router.delete('/deleteDoctor',control.delete_doctor_record);
router.post('/updateDoctor',control.edit_doctor_record);

router.get('/getRadiologist',control.get_Radiologist_record);
router.delete('/deleteRadiologist',control.delete_Radiologist_record);
router.post('/updateRadiologist',control.edit_Radiologist_record);

router.get('/getReceptionist',control.get_Receptionist_record);
router.delete('/deleteReceptionist',control.delete_Receptionist_record);
router.post('/updateReceptionist',control.edit_Receptionist_record);

router.get('/getLabTechnician',control.get_LabTechnician_record);
router.delete('/deleteLabTechnician',control.delete_LabTechnician_record);
router.post('/updateLabTechnician',control.edit_LabTechnician_record);

module.exports = router;
