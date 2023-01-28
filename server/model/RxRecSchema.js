const mongoose = require('mongoose');
const RxRecSchema = new mongoose.Schema(
    {
        doctor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'doctor',
        },
        patient:{
            type: String
        },
        prescription:{
            type: String
        },
        recommendation:{
            type: String
        }
    },
    {
        timestamps: true,
    }
      
  );
const RxRec_model = mongoose.model("RxRec",RxRecSchema,"RxRecs");
console.log('RxRec schema Model build');
module.exports = RxRec_model;