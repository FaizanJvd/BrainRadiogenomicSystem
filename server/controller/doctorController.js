const Doctor = require("../model/DoctorSchema");
const bcrypt = require('bcrypt');
const Patient = require("../model/PatientSchema");
const AssignPatient = require("../model/assignPatientToDoc");
const AssignPatientToRad = require("../model/assignPatientToRad");
const RxRec = require("../model/RxRecSchema");
const Radiologist = require("../model/RadiologistSchema");
const AssignPatientToDoc = require("../model/assignPatientToDoc");
module.exports = {
    getDoctorProfile: async (req, res)=> {
        try {
            const doctor = await Doctor.findById({_id:req.userId},{cpassword:0,password:0,__v:0,tokens:0});
            res.status(201).send(doctor);
        } catch (err) {
            res.status(422).json({ message: "Internal Server Error" });
        }
    },
    login: async (req,res)=>{
        const {email,password}  = req.body;
        if(!email || !password){
            return res.status(422).json({message:"Please fill all the fields"});
        }
        const find = await Doctor.findOne({email:email},{__v:0,token:0,email:0,name:0});
        
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
        const find = await Doctor.findByIdAndUpdate({_id:req.userId},{$set:{picture:picture}});
        if(find){
            return res.status(201).json({message:"Image Uploaded"});
        }
        else{
            return res.status(422).json({message:"Image Not Uploaded"});
        }
    },
    updateDoctorProfile: async (req,res)=>{
        const update = await Doctor.findByIdAndUpdate({_id:req.userId},{$set:req.body.fields});
        if(update){
            res.status(201).json({message:"Profile Updated"})
        }
        else{
            res.status(422).json({message:"Profile Not Updated"})
        }
    },
    getAssignedPatient:async (req,res)=>{
        const assign = await AssignPatient.findOne({doctor:req.userId});
        if(assign){
            const patient = await Patient.find({_id:assign.patient},{password:0,cpassword:0,tokens:0,__v:0,phoneNo:0});
            res.status(201).send(patient);
        }
        else{
            res.status(422).json({ message: "No doctor Assign" });
        }
    },
    addRxRec: async (req,res)=>{
        const {prescription,recommendation,patient} = req.body;
        const rxRec = new RxRec({prescription:prescription,recommendation:recommendation,patient:patient,doctor:req.userId});
        const save = await rxRec.save();
        if(save){
            res.status(201).json({message:"Prescription Uploaded"});
        }
        else{
            res.status(422).json({message:"Prescription Not Uploaded"});
        }
    },

    verifEmail: async (req,res)=>{
        const {email} = req.body;
        console.log(email);
        const find = await Doctor.findOne({email:email});
        if(find){
            res.status(201).json({message:"Email Verified"});
        }
        else{
            res.status(422).json({message:"Email Not Verified"});
        }
    },
    updatePassword: async (req,res)=>{
        console.log(req.body);
        const {email,password} = req.body;
        const hash = await bcrypt.hash(password,12);
        const update = await Doctor.findOneAndUpdate({email:email},{$set:{password:hash}});
        if(update){
            res.status(201).json({message:"Password Updated"});
        }
        else{
            res.status(422).json({message:"Password Not Updated"});
        }
    },
    get_Radiologist_record: async (req, res) => {
        try {
          const data = await Radiologist.find();
          if (data) {
            console.log("Radiologist find");
            return res.send(data);
          } else {
            console.log("not Record");
            return res.status(422).json({ message: "No Record" });
          }
        } catch (err) {
          console.log(err);
        }
    },
    assignRadiologist: async (req, res) => {
        const { r_id, p_id,doctor } = req.body;
        const find = await AssignPatientToRad.findOne({ radiologist: r_id });
        if (find) {
          const findPatient = await AssignPatientToRad.findOne({ radiologist: r_id });
          const check  = findPatient.assigned.some((elem)=> {return elem.patient==p_id});
          if (check) {
            return res.status(422).json({ message: "Already Assigned" });
          } else {
            const addPatient = await find.updateOne({ $push: { assigned:{patient: p_id,doctor}}});
            if (addPatient) {
              return res.status(201).json({ message: "Patient Assigned" });
            } else {
              return res.status(422).json({ message: "Not Assigned" });
            }
          }
        } else {
          const add = new AssignPatientToRad({ radiologist: r_id, assigned:{patient: p_id,doctor} });
          const save = await add.save();
          if (save) {
            return res.status(201).json({ message: "Assigned" });
          } else {
            return res.status(422).json({ message: "Not Assigned" });
          }
        }
      },
      getInfo: async (req, res) => {
        const info = await Doctor.findOne({ _id: req.userId },{name:1,picture:1});
        if (info) {
            return res.status(201).json(info);
            }
        else {
            return res.status(422).json({ message: "No Record" });
        }
    },
    unAssignPatient : async (req, res) => {
        console.log(req.body);
        const find = await AssignPatientToDoc.findOneAndUpdate({doctor:req.userId},{ $pull: { patient: req.body.p_id }});
        if(find){
            return res.status(201).json({ message: "Patient Unassigned" });
        }
        else {
            return res.status(422).json({ message: "Not Unassigned" });
        }
    },
};

