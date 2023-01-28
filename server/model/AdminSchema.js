const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    phoneNo:{
        type:Number,
    },
    password:{
        type:String,
    },
    cpassword:{
        type:String,
    }
});
const admin_model = mongoose.model("admin",adminSchema,"admins");
console.log('Admin schema Model build');
module.exports = admin_model;