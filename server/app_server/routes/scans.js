const express = require('express');
const router = express.Router();
const scansController = require("../../controller/scansController");
router.post('/addScans',scansController.addScans);
router.post('/getScans',scansController.getScans);


module.exports = router;