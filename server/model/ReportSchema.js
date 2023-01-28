const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    },
    radiologist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'radiologist'
    },
    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor'
    },
    original:{
        type: String,
    },
    segmentation:{
        type:String
    },
    autocorrelation:{
        type:String,
    },
    cluster_tendency:{
        type:String,
    },
    contrast:{
        type:String,
    },
    difference_entropy:{
        type:String,
    },
    difference_variance:{
        type:String,
    },

    joint_average:{
        type:String,
    },
    joint_entropy:{
        type:String,
    },
    kurtosis:{
        type:String,
    },
    mesh_volume:{
        type:String,
    },
    skewness:{
        type:String,
    },
    IDH_mutation:{
        type:String,
    },
    TCP53_mutation:{
        type:String,
    },
    survival:{
        type:String,
    },
    remarks:{
        type:String,
    },
    status:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
reportSchema.index({ status: 'text' });
module.exports = mongoose.model('report', reportSchema);