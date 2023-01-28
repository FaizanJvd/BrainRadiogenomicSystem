const Report = require('../model/ReportSchema');
const radiologistController = require('./radiologistController');

module.exports={
    addReport:async (req,res)=>{
        try{
            const report = new Report(req.body);
            await report.save();
            res.status(201).json({message:"Report Generated Successfully"});
        }
        catch(err){
            res.status(422).json({message:"Internal Server Error"});
        }
    },
    getReport:async (req,res)=>{
        try{
            const report = await Report.findOne({patient:req.body.patient}).populate({path:'patient',select:{name:1}}).populate({path:'doctor',select:{name:1}}).populate({path:'radiologist',select:{name:1}});
            if(report!=null){
                res.status(201).send(report);
            }
            else{
                res.status(422).json({message:"No Report Available"});
            }
        }
        catch(err){
            res.status(422).json({message:"Internal Server Error"});
        }
    },
    getAllReports:async (req,res)=>{
        try{
            const reports = await Report.find({},{status:1,date:1}).populate({path:'patient',select:{_id:1,name:1,picture:1}}).populate({path:'doctor',select:{name:1}}).populate({path:'radiologist',select:{name:1}}).sort({status:1});
            if(reports!=null){
                res.status(201).send(reports);
            }
            else{
                res.status(422).json({message:"No Report Available"});
            }
        }
        catch(err){
            res.status(422).json({message:"Internal Server Error"});
        }
    },
    radiologistReports:async (req,res)=>{
        try{
            const reports = await Report.find({radiologist:req.params.id},{patient:1}).populate({path:'patient',select:{_id:1,name:1,picture:1,gender:1,age:1}});
            if(reports!=null){
                res.status(201).send(reports);
            }
            else{
                res.status(422).json({message:"No Report Available"});
            }
        }
        catch(err){
            res.status(422).json({message:"Internal Server Error"});
        }
    }

}