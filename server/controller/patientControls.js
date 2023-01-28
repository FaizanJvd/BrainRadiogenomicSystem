const AssignDoctor = require("../model/assignPatientToDoc");
const Doctor = require("../model/DoctorSchema");
const Patient = require("../model/PatientSchema");
const RxRec = require("../model/RxRecSchema");
module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const find = await Patient.findOne(
      { email: email, password: password },
      { __v: 0, token: 0, email: 0, name: 0 }
    );
    if (find) {
      const token = await find.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      return res.status(201).json(find);
    } else {
      return res.status(422).json({ message: "LogIn Fail" });
    }
  },
  logout: (req, res) => {
    res
      .clearCookie("jwtoken", { path: "/", domain: "localhost" })
      .status(200)
      .send("ok");
  },
  uploadImage: async (req, res) => {
    const { picture } = req.body;
    const find = await Patient.findByIdAndUpdate(
      { _id: req.userId },
      { $set: { picture: picture } }
    );
    if (find) {
      return res.status(201).json({ message: "Image Uploaded" });
    } else {
      return res.status(422).json({ message: "Image Not Uploaded" });
    }
  },
  getAssignedDoctor: async (req, res) => {
    const assign = await AssignDoctor.find({ patient: req.userId });
    const array = [];
    if (assign) {
      for (let index = 0; index < assign.length; index++) {
        const doctor = await Doctor.findById(
          { _id: assign[index].doctor },
          {password: 0, cpassword: 0, tokens: 0 }
        );
        array.push(doctor);
      }
      res.status(201).send(array)
    }
    // else{
    //     res.status(422).json({ message: "No doctor Assigned" });
    // }
  },
  getProfile: async (req, res) => {
    const profile = await Patient.findById(
      { _id: req.userId },
      { cpassword: 0, tokens: 0 }
    );
    if (profile) {
      res.status(201).send(profile);
    } else {
      res.status(422).json({ message: "No User Found" });
    }
  },
  updateProfile: async (req, res) => {
    const update = await Patient.findByIdAndUpdate(
      { _id: req.userId },
      { $set: req.body.fields }
    );
    if (update) {
      res.status(201).json({ message: "Profile Updated" });
    } else {
      res.status(422).json({ message: "Profile Not Updated" });
    }
  },
  getHistory: async (req, res) => {
    const history = await RxRec.find({ patient:req.userId}).populate({path:'doctor', select:{name:1,specialization:1,picture:1}});
    if (history) {
      res.status(201).send(history);
    } else {
      res.status(422).json({ message: "No History Found" });
    }
  },
  verifEmail: async (req,res)=>{
    const {email} = req.body;
    console.log(email);
    const find = await Patient.findOne({email:email});
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
    const update = await Patient.findOneAndUpdate({email:email},{$set:{password:hash}});
    if(update){
        res.status(201).json({message:"Password Updated"});
    }
    else{
        res.status(422).json({message:"Password Not Updated"});
    }
},
getInfo: async (req, res) => {
  const info = await Patient.findOne({ _id: req.userId },{name:1,picture:1});
  if (info) {
      return res.status(201).json(info);
      }
  else {
      return res.status(422).json({ message: "No Record" });
  }
},

};
