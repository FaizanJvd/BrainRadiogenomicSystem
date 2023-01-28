const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
    },
    picture:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
        
    ]
});

patientSchema.methods.generateAuthToken = async function(){
    try{
        let myToken = jwt.sign({_id:this._id},process.env.SECRET_KEY);//(.sign(object a field unique in each user, secret value which is 32 char long)
        this.tokens = this.tokens.concat({token:myToken});//we concat token we generate to token in schema.
        await this.save();
        return myToken;
    }
    catch(err){console.log(err)};

}
patientSchema.index({ name: 'text' });
const patient_model = mongoose.model("patient",patientSchema,"patients");
module.exports = patient_model;