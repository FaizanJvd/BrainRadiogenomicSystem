const mongoose = require('mongoose');
const patinetSymSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Types.ObjectId,
        ref:'patient'
    },
    symptoms:{
        type:[String]}
});
// Quries to add Array in array field.

//db.products.update(
//     { _id: 2 },
//     { 
//       $addToSet: { 
//          sizes: {
//             $each: [ "XXL", "XXXL" ]
//          }
//        } 
//      }
//  )
const patinetSym_model = mongoose.model("patinetSymptoms",patinetSymSchema,"patinetSymptoms");
console.log('patinetSym Schema Model build');
module.exports = patinetSym_model;