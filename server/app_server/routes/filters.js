var express = require('express');
var router = express.Router();
const filterController = require('../../controller/filterController');
router.post('/filterDoctor',filterController.filterDocBySpeciality);
router.post('/filterPatient',filterController.filterPatientByName);
router.post('/filterReport',filterController.filterReportByStatus);
router.post('/filterRadiologist',filterController.filterRadiologistByName);
router.post('/filterReceptionist',filterController.filterReceptionistByName);







module.exports = router;