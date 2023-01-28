const mongoose = require("mongoose");
const patinetToRadSchema = new mongoose.Schema({
  radiologist: {
    type: mongoose.Types.ObjectId,
    ref: "radiologist",
  },
  assigned: [
    {
      patient: {
        type: mongoose.Types.ObjectId,
        ref: "patient",
      },
      doctor: {
        type: mongoose.Types.ObjectId,
        ref: "doctor",
      },
    },
  ],
});
// Quries to populate Multiple

//let results = await OrderModel.find().populate(['doctor', 'field name in schema']);
//let results = await OrderModel.find().populate([{path: 'user', select: 'firstname'}, {path: 'meal', select: 'name'}]);
const patinetToRad_model = mongoose.model(
  "patinetToRad",
  patinetToRadSchema,
  "patinetToRad"
);
console.log("patinetToRad Schema Model build");
module.exports = patinetToRad_model;
