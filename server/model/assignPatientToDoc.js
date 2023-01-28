const mongoose = require('mongoose');
const patinetToDocSchema = new mongoose.Schema({
    doctor:{
        type:mongoose.Types.ObjectId,
        ref:'doctor'
    },
    patient:[{
        type:mongoose.Types.ObjectId,
        ref:'patient'}]
});
// Quries to populate Multiple

//let results = await OrderModel.find().populate(['doctor', 'field name in schema']);
//let results = await OrderModel.find().populate([{path: 'user', select: 'firstname'}, {path: 'meal', select: 'name'}]);
const patinetToDoc_model = mongoose.model("patinetToDoc",patinetToDocSchema,"patinetToDoc");
console.log('patinetToDoc Schema Model build');
module.exports = patinetToDoc_model;