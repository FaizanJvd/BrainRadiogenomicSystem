const Radiologist = require("../model/RadiologistSchema");
const AssignPatientToRad = require("../model/assignPatientToRad");
const bcrypt = require("bcrypt");
module.exports = {
    getProfile: async (req, res)=> {
        try {
            const radiologist = await Radiologist.findById({_id:req.userId},{cpassword:0,password:0,__v:0,tokens:0});
            res.status(201).send(radiologist);
        } catch (err) {
            res.status(422).json({ message: "Internal Server Error" });
        }
    },
    login: async (req,res)=>{
        const {email,password}  = req.body;
        if(!email || !password){
            return res.status(422).json({message:"Please fill all the fields"});
        }
        const find = await Radiologist.findOne({email:email},{__v:0,token:0,email:0,name:0});
        
        if(find){
            const checkPasssword = await bcrypt.compare(password,find.password);
            if(checkPasssword){
                const token =await find.generateAuthToken();
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+25892000000),
                    httpOnly:true
                });
            return res.status(201).json(find);
            }
            else{
                return res.status(422).json({message:"Invalid Credentials"});
            }
        }
        else{
        return res.status(422).json({message:"Invalid Credentials"});
        }
    },
    logout: (req,res)=>{
        res.clearCookie('jwtoken', {path: '/', domain: 'localhost'}).status(200).send("ok");
    },
    uploadImage: async (req,res)=>{
        const {picture} = req.body;
        const find = await Radiologist.findByIdAndUpdate({_id:req.userId},{$set:{picture:picture}});
        if(find){
            return res.status(201).json({message:"Image Uploaded"});
        }
        else{
            return res.status(422).json({message:"Image Not Uploaded"});
        }
    },
    updateProfile: async (req,res)=>{
        const update = await Radiologist.findByIdAndUpdate({_id:req.userId},{$set:req.body.fields});
        if(update){
            res.status(201).json({message:"Profile Updated"})
        }
        else{
            res.status(422).json({message:"Profile Not Updated"})
        }
    },
    getAssignedPatient:async (req,res)=>{
        const assign = await AssignPatientToRad.findOne({radiologist:req.userId}).populate([{path:'assigned.doctor',select:{'name':1,"_id":1}}, {path:'assigned.patient',select:{'name':1,'age':1,'email':1,'gender':1,"_id":1,'picture':1}}]);
        if(assign){
            res.status(201).json(assign);
        }
        else{
            res.status(422).json({message:"No Patient Assigned"});
        }
    },
    getInfo: async (req, res) => {
        const info = await Radiologist.findOne({ _id: req.userId },{name:1,picture:1});
        if (info) {
            return res.status(201).json(info);
            }
        else {
            return res.status(422).json({ message: "No Record" });
        }
    },
    deleteAssignedPatient: async (req,res)=>{
        const {patientId} = req.body;
        const assign = await AssignPatientToRad.findOneAndUpdate({radiologist:req.userId},{$pull:{assigned:{patient:patientId}}});
        if(assign){
            res.status(201).json({message:"Patient unassigned"});
        }
        else{
            res.status(422).json({message:"Patient Not unassigned"});
        }
    },


}