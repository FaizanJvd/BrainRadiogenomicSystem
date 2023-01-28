const Doctor = require("../model/DoctorSchema");
const Radiologist = require("../model/RadiologistSchema");
const Receptionist = require("../model/ReceptionistSchema");
const nodemailer = require("nodemailer");
const Patient = require("../model/PatientSchema");
const PatientSymptoms = require("../model/patientSymptoms");
const AssignDoctor = require("../model/assignPatientToDoc");
const qrCode = require("qrcode");
const bcrypt = require("bcrypt");
const send_credential_mail = async (m_email, qr) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // who send email
      user: "dummygame254@gmail.com",
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: "dummygame254@gmail.com",
    to: m_email,
    attachDataUrls: true,
    subject: "LogIn Credential of Brain RadioGenomic System",
    // text: `Welcome to Brain RadioGenomic System\n Credential Belongs to you do not share to anyone.\nEmail:${m_email}\nPassword: ${m_password}`,
    html: `<h1>Welcome to Brain RadioGenomic System</h1> <p> Scan to get login credential and its belong to you donot share it to anyone </p><br><img src=${qr} alt="QR"/>/>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      console.log("Mail not Sended");
      // return res.status(422).json({ message: "Fail to Send Email" });
    } else {
      // return res.status(200).json({ message: "Email Send" });
      console.log("Mail sended");
    }
  });
};
module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const find = await Receptionist.findOne(
      { email: email },
      { __v: 0, token: 0, email: 0, name: 0 }
    );

    if (find) {
      const checkPasssword = await bcrypt.compare(password, find.password);
      if (checkPasssword) {
        const token = await find.generateAuthToken();
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        return res.status(201).json(find);
      } else {
        return res.status(422).json({ message: "Invalid Credentials" });
      }
    } else {
      return res.status(422).json({ message: "Invalid Credentials" });
    }
  },
  logout: (req, res) => {
    res
      .clearCookie("jwtoken", { path: "/", domain: "localhost" })
      .status(200)
      .send("ok");
  },
  registerPatient: async (req, res) => {
    const { name, email, age, gender, phoneNo, password, cpassword } = req.body;
    if (
      !name ||
      !email ||
      !age ||
      !gender ||
      !phoneNo ||
      !password ||
      !cpassword
    ) {
      console.log("fill all");
      return res.status(422).json({ message: "Fill all fields" });
    }
    try {
      const findPatient = await Patient.findOne({ email: email });
      if (findPatient) {
        console.log("email exist");
        return res.status(422).json({ message: "Patient Email Exist" });
      }
      if (password != cpassword) {
        console.log("pass not match");
        return res
          .status(422)
          .json({ message: "Password not matched with Confirm Password" });
      }
      const patient = new Patient({
        name,
        email,
        age,
        gender,
        phoneNo,
        password,
        cpassword,
      });
      const register = await patient.save();
      if (register) {
        qrCode.toDataURL(JSON.stringify(req.body), function (err, url) {
          if (err) {
            return console.log(err);
          }
          send_credential_mail(email, url);
        });
        return res
          .status(201)
          .json({ message: "Patient Registed Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  addSymptoms: async (req, res) => {
    const { p_id, symptoms } = req.body;
    const add = new PatientSymptoms({ patient: p_id, symptoms: symptoms });
    const save = await add.save();
    if (save) {
      return res.status(201).json({ message: "Symptoms Added" });
    } else {
      return res.status(422).json({ message: "Symptoms not Added" });
    }
  },
  assignDoctor: async (req, res) => {
    const { d_id, p_id } = req.body;
    const find = await AssignDoctor.findOne({ doctor: d_id });
    if (find) {
      const findPatient = await AssignDoctor.findOne({
        $and: [{ doctor: d_id },{ patient: p_id }],
      });
      if (findPatient) {
        return res.status(422).json({ message: "Already Assigned" });
      } else {
        const addPatient = await find.updateOne({ $push: { patient: p_id } });
        if (addPatient) {
          return res.status(201).json({ message: "Patient Assigned" });
        } else {
          return res.status(422).json({ message: "Not Assigned" });
        }
      }
    } else {
      const add = new AssignDoctor({ doctor: d_id, patient: p_id });
      const save = await add.save();
      if (save) {
        return res.status(201).json({ message: "Assigned" });
      } else {
        return res.status(422).json({ message: "Not Assigned" });
      }
    }
  },
  getPatientId: async (req, res) => {
    const pt_id = await Patient.findOne({ email: req.body.email }, { _id: 1 });
    if (pt_id) {
      return res.status(201).send(pt_id);
    } else {
      return res.status(422).json({ message: "Not found" });
    }
  },
  getProfile: async (req, res) => {
    const find = await Receptionist.findById(
      { _id: req.userId },
      { __v: 0, token: 0, cpassword: 0 }
    );
    if (find) {
      return res.status(201).json(find);
    } else {
      return res.status(422).json({ message: "Not Found" });
    }
  },
  uploadImage: async (req, res) => {
    const { picture } = req.body;
    const find = await Receptionist.findByIdAndUpdate(
      { _id: req.userId },
      { $set: { picture: picture } }
    );
    if (find) {
      return res.status(201).json({ message: "Image Uploaded" });
    } else {
      return res.status(422).json({ message: "Image Not Uploaded" });
    }
  },
  updateProfile: async (req, res) => {
    const update = await Receptionist.findByIdAndUpdate(
      { _id: req.userId },
      { $set: req.body.fields }
    );
    if (update) {
      res.status(201).json({ message: "Profile Updated" });
    } else {
      res.status(422).json({ message: "Profile Not Updated" });
    }
  },
  getInfo: async (req, res) => {
    const info = await Receptionist.findOne({ _id: req.userId },{name:1,picture:1});
    if (info) {
        return res.status(201).json(info);
        }
    else {
        return res.status(422).json({ message: "No Record" });
    }
},
};
