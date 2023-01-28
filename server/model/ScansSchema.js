const mongoose = require('mongoose');

const ScansSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
    },
    t1:{
        type:String
    },
    t1Gd:{
        type:String
    },
    t2:{
        type:String
    },
    flair:{
        type:String
    }
});
module.exports = mongoose.model('Scans', ScansSchema);