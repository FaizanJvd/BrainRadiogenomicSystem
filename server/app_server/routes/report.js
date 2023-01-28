const express = require('express');
const router = express.Router();
const reportController = require("../../controller/reportController");

router.post('/addReport',reportController.addReport);
router.post('/getReport',reportController.getReport);
router.get('/getAllReports',reportController.getAllReports);
router.get('/radiologistReports/:id',reportController.radiologistReports);

module.exports = router;