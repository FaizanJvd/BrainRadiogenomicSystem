const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const labTechnicianSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phoneNo:{
        type:Number,
        required:true
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
labTechnicianSchema.pre('save',async function (next) 
{
     if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
     }
     next();
});

// JWT authentification token generation
labTechnicianSchema.methods.generateAuthToken = async function(){
    try{
        let myToken = jwt.sign({_id:this._id},process.env.SECRET_KEY);//(.sign(object a field unique in each user, secret value which is 32 char long)
        this.tokens = this.tokens.concat({token:myToken});//we concat token we generate to token in schema.
        await this.save();
        return myToken;
    }
    catch(err){console.log(err)};

}
const labTechnician_model = mongoose.model("labTechnician",labTechnicianSchema,"labTechnicians");
console.log('receptionalist schema Model build');
module.exports = labTechnician_model;