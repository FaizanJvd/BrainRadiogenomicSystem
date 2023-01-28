var express = require('express');
var router = express.Router();
const chatContoller = require('../../controller/chatContoller')


router.post('/newChat',chatContoller.createChat);
router.post('/findChat',chatContoller.findChat);
router.post('/sendMessage',chatContoller.sendMessage);
router.post('/getMessages',chatContoller.getMessages);


module.exports = router;