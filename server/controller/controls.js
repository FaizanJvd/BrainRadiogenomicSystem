const doctor = require("../model/DoctorSchema");
const radiologist = require("../model/RadiologistSchema");
const receptionist = require("../model/ReceptionistSchema");
const labTechnician = require("../model/LabTechnicianSchema");
const Doctor = require("../model/DoctorSchema");
const Patient = require("../model/PatientSchema");
const Radiologist = require("../model/RadiologistSchema");
const Receptionist = require("../model/ReceptionistSchema");
const LabTechnician = require("../model/LabTechnicianSchema");
const admin = require("../model/AdminSchema");
const nodemailer = require("nodemailer");

module.exports = {
  check_admin_loginCredential: async (req, res) => {
    const { email, password } = req.body;
    const find = await admin.findOne({ email: email, password: password });
    if (find) {
      console.log("login");
      return res.status(201).json({ message: "LogIn Success" });
    } else {
      return res.status(422).json({ message: "LogIn Fail" });
    }
  },
  register_doctor: async (req, res) => {
    const {
      name,
      email,
      age,
      qualification,
      experience,
      specialization,
      gender,
      phoneNo,
      password,
      cpassword,
    } = req.body;
    if (
      !name ||
      !email ||
      !age ||
      !qualification ||
      !experience ||
      !specialization ||
      !gender ||
      !phoneNo ||
      !password ||
      !cpassword
    ) {
      console.log("fill all");
      return res.status(422).json({ message: "Fill all fields" });
    }
    try {
      const findDoctor = await Doctor.findOne({ email: email });
      if (findDoctor) {
        console.log("email exist");
        return res.status(422).json({ message: "Doctor Email Exist" });
      }
      if (password != cpassword) {
        console.log("pass not match");
        return res
          .status(422)
          .json({ message: "Password not matched with Confirm Password" });
      }
      const doctor = new Doctor({
        name,
        email,
        age,
        qualification,
        experience,
        specialization,
        gender,
        phoneNo,
        password,
        cpassword,
      });
      const register = await doctor.save();
      if (register) {
        console.log("registered");
        return res
          .status(201)
          .json({ message: "Doctor Registed Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  register_radiologist: async (req, res) => {
    console.log(req.body);
    const {
      name,
      email,
      age,
      qualification,
      experience,
      gender,
      phoneNo,
      password,
      cpassword,
    } = req.body;
    if (
      !name ||
      !email ||
      !age ||
      !qualification ||
      !experience ||
      !gender ||
      !phoneNo ||
      !password ||
      !cpassword
    ) {
      console.log("Fill all Fields");
      return res.status(422).json({ message: "Fill All Fields" });
    }
    try {
      const findRadiologist = await Radiologist.findOne({ email: email });
      if (findRadiologist) {
        console.log("Radiologist Email Already Exist");
        return res
          .status(422)
          .json({ message: "Radiologist Email Already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ message: "Password Not Matched with Confirm Password" });
      }
      const radiologist = new Radiologist({
        name,
        email,
        qualification,
        experience,
        gender,
        phoneNo,
        password,
        cpassword,
      });
      const register = await radiologist.save();
      if (register) {
        console.log("Radiologist Registered Successfully");
        return res
          .status(201)
          .json({ message: "Radiologist Registered Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  register_receptionist: async (req, res) => {
    const {
      name,
      email,
      age,
      qualification,
      experience,
      gender,
      phoneNo,
      password,
      cpassword,
    } = req.body;
    if (
      !name ||
      !email ||
      !age ||
      !qualification ||
      !experience ||
      !gender ||
      !phoneNo ||
      !password ||
      !cpassword
    ) {
      console.log("Fill all Fields");
      return res.status(422).json({ message: "Fill All Fields" });
    }
    try {
      const findReceptionist = await Receptionist.findOne({ email: email });
      if (findReceptionist) {
        console.log("Receptionist Email Already Exist");
        return res
          .status(422)
          .json({ message: "Receptionist Email Already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ message: "Password Not Matched with Confirm Password" });
      }
      const receptionist = new Receptionist({
        name,
        email,
        age,
        qualification,
        experience,
        gender,
        phoneNo,
        password,
        cpassword,
      });
      const register = await receptionist.save();
      if (register) {
        console.log("Receptionist Registered Successfully");
        return res
          .status(201)
          .json({ message: "Receptionist Registered Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  },

  register_labTechnician: async (req, res) => {
    const {
      name,
      email,
      age,
      qualification,
      experience,
      gender,
      phoneNo,
      password,
      cpassword,
    } = req.body;
    if (
      !name ||
      !email ||
      !age ||
      !qualification ||
      !experience ||
      !gender ||
      !phoneNo ||
      !password ||
      !cpassword
    ) {
      console.log("Fill all Fields");
      return res.status(422).json({ message: "Fill All Fields" });
    }
    try {
      const find = await LabTechnician.findOne({ email: email });
      if (find) {
        console.log("LabTechnician Email Already Exist");
        return res
          .status(422)
          .json({ message: "LabTechnician  Email Already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ message: "Password Not Matched with Confirm Password" });
      }
      const labTechnician = new LabTechnician({
        name,
        email,
        age,
        qualification,
        experience,
        gender,
        phoneNo,
        password,
        cpassword,
      });
      const register = await labTechnician.save();
      if (register) {
        console.log("LabTechnician  Registered Successfully");
        return res
          .status(201)
          .json({ message: "LabTechnician  Registered Successfully" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  get_doctor_record: async (req, res) => {
    try {
      const data = await doctor.find();
      if (data) {
        console.log("Doctor find");
        return res.send(data);
      } else {
        console.log("not Record");
        return res.status(422).json({ message: "No Record" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  delete_doctor_record: async (req, res) => {
    const { d_id } = req.body;
    try {
      const data = await doctor.deleteOne({ _id: d_id });
      if (data) {
        return res.status(201).json({ message: "Record Deleted" });
      }
      return res.status(422).json({ message: "No Record" });
    } catch (err) {
      console.log(err);
    }
  },
  edit_doctor_record: async (req, res) => {
    console.log(req.body);
    const { u_id, name, email, phoneNo, qualification, password, cpassword } =
      req.body;
    try {
      const findDoctor = await doctor.findOne({ email: email });
      if (
        !name ||
        !email ||
        !phoneNo ||
        !qualification ||
        !password ||
        !cpassword
      ) {
        console.log("Fill all Fields");
        return res.status(422).json({ message: "Fill all Fields" });
      }
      if (findDoctor) {
        console.log("Doctor Email Already Exist");
        return res.status(422).json({ message: "Email already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ messsage: "Password Not Matched with Confirm Password" });
      }
      const data = await doctor.updateOne(
        { _id: u_id },
        {
          $set: {
            name: name,
            email: email,
            phoneNo: phoneNo,
            qualification: qualification,
            password: password,
            cpassword: cpassword,
          },
        }
      );

      if (data.acknowledged == true) {
        return res.status(201).json({ message: "Record Updated" });
      }
      return res.status(422).json({ message: "No Record Updated" });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "No Record Updated" });
    }
  },

  get_patient_record: async (req, res) => {
    try {
      const data = await Patient.find({},{password:0,cpassword:0,tokens:0});
      if (data) {
        return res.status(201).send(data);
      } else {
        return res.status(422).json({ message: "No Record" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  delete_patient_record: async (req, res) => {
    const { p_id } = req.body;
    try {
      const data = await Patient.deleteOne({ _id: p_id });
      if (data) {
        return res.status(201).json({ message: "Record Deleted" });
      }
      return res.status(422).json({ message: "No Record" });
    } catch (err) {
      console.log(err);
    }
  },
  edit_patient_record: async (req, res) => {
    console.log(req.body);
    const {
      u_id,
      name,
      email,
      phoneNo,
      age,
    } = req.body;
    try {
      const findPatient = await Patient.findOne({ email: email });
      if (
        !name ||
        !email ||
        !phoneNo ||
        !age ||
        !password ||
        !cpassword
      ) {
        console.log("Fill all Fields");
        return res.status(422).json({ message: "Fill all Fields" });
      }
      if (findPatient) {
        console.log("Patient Email Already Exist");
        return res.status(422).json({ message: "Email already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ messsage: "Password Not Matched with Confirm Password" });
      }
      const data = await Patient.updateOne(
        { _id: u_id },
        {
          $set: {
            name: name,
            email: email,
            phoneNo: phoneNo,
            age: age,
            password: password,
            cpassword: cpassword,
          },
        }
      );

      if (data.acknowledged == true) {
        return res.status(201).json({ message: "Record Updated" });
      }
      return res.status(422).json({ message: "No Record Updated" });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "No Record Updated" });
    }
  },
  get_Radiologist_record: async (req, res) => {
    try {
      const data = await radiologist.find();
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
  delete_Radiologist_record: async (req, res) => {
    const { r_id } = req.body;
    try {
      const data = await radiologist.deleteOne({ _id: r_id });
      if (data) {
        return res.status(201).json({ message: "Record Deleted" });
      }
      return res.status(422).json({ message: "No Record Found" });
    } catch (err) {
      console.log(err);
    }
  },

  edit_Radiologist_record: async (req, res) => {
    console.log(req.body);
    const { u_id, name, email, phoneNo, qualification, password, cpassword } =
      req.body;
    try {
      const find = await radiologist.findOne({ email: email });
      if (
        !name ||
        !email ||
        !phoneNo ||
        !qualification ||
        !password ||
        !cpassword
      ) {
        console.log("Fill all Fields");
        return res.status(422).json({ message: "Fill all Fields" });
      }
      if (find) {
        console.log("Doctor Email Already Exist");
        return res.status(422).json({ message: "Email already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ message: "Password Not Matched with Confirm Password" });
      }
      const data = await radiologist.updateOne(
        { _id: u_id },
        {
          $set: {
            name: name,
            email: email,
            phoneNo: phoneNo,
            qualification: qualification,
            password: password,
            cpassword: cpassword,
          },
        }
      );

      if (data.acknowledged == true) {
        return res.status(201).json({ message: "Record Updated" });
      }
      return res.status(422).json({ message: "No Record Updated" });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "No Record Updated" });
    }
  },

  get_Receptionist_record: async (req, res) => {
    try {
      const data = await receptionist.find();
      if (data) {
        console.log("Receptionist find");
        return res.send(data);
      } else {
        console.log("not Record");
        return res.status(422).json({ message: "No Record" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  delete_Receptionist_record: async (req, res) => {
    const { d_id } = req.body;
    try {
      const data = await receptionist.deleteOne({ _id: d_id });
      if (data) {
        return res.status(201).json({ message: "Record Deleted" });
      }
      return res.status(422).json({ message: "No Record Found" });
    } catch (err) {
      console.log(err);
    }
  },
  edit_Receptionist_record: async (req, res) => {
    console.log(req.body);
    const { u_id, name, email, phoneNo, qualification, password, cpassword } =
      req.body;
    try {
      const find = await receptionist.findOne({ email: email });
      if (
        !name ||
        !email ||
        !phoneNo ||
        !qualification ||
        !password ||
        !cpassword
      ) {
        console.log("Fill all Fields");
        return res.status(422).json({ message: "Fill all Fields" });
      }
      if (find) {
        console.log("Receptionist Email Already Exist");
        return res.status(422).json({ message: "Email already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ message: "Password Not Matched with Confirm Password" });
      }
      const data = await receptionist.updateOne(
        { _id: u_id },
        {
          $set: {
            name: name,
            email: email,
            phoneNo: phoneNo,
            qualification: qualification,
            password: password,
            cpassword: cpassword,
          },
        }
      );

      if (data.acknowledged == true) {
        return res.status(201).json({ message: "Record Updated" });
      }
      return res.status(422).json({ message: "No Record Updated" });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "No Record Updated" });
    }
  },

  get_LabTechnician_record: async (req, res) => {
    try {
      const data = await labTechnician.find();
      if (data) {
        console.log("LabTechnician find");
        return res.send(data);
      } else {
        console.log("not Record");
        return res.status(422).json({ message: "No Record" });
      }
    } catch (err) {
      console.log(err);
    }
  },
  delete_LabTechnician_record: async (req, res) => {
    const { d_id } = req.body;
    try {
      const data = await labTechnician.deleteOne({ _id: d_id });
      if (data) {
        return res.status(201).json({ message: "Record Deleted" });
      }
      return res.status(422).json({ message: "No Record Found" });
    } catch (err) {
      console.log(err);
    }
  },
  edit_LabTechnician_record: async (req, res) => {
    console.log(req.body);
    const { u_id, name, email, phoneNo, qualification, password, cpassword } =
      req.body;
    try {
      const find = await labTechnician.findOne({ email: email });
      if (
        !name ||
        !email ||
        !phoneNo ||
        !qualification ||
        !password ||
        !cpassword
      ) {
        console.log("Fill all Fields");
        return res.status(422).json({ message: "Fill all Fields" });
      }
      if (find) {
        console.log("LabTechnician Email Already Exist");
        return res.status(422).json({ message: "Email already Exist" });
      }
      if (password != cpassword) {
        console.log("Password Not Matched with Confirm Password");
        return res
          .status(422)
          .json({ messsage: "Password Not Matched with Confirm Password" });
      }
      const data = await labTechnician.updateOne(
        { _id: u_id },
        {
          $set: {
            name: name,
            email: email,
            phoneNo: phoneNo,
            qualification: qualification,
            password: password,
            cpassword: cpassword,
          },
        }
      );

      if (data.acknowledged == true) {
        return res.status(201).json({ message: "Record Updated" });
      }
      return res.status(422).json({ message: "No Record Updated" });
    } catch (err) {
      console.log(err);
      return res.status(422).json({ message: "No Record Updated" });
    }
  },

  send_credential_mail: async (req, res) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // who send email
        user: "dummygame254@gmail.com",
        pass: process.env.PASSWORD,
      },
    });
    // https://myaccount.google.com/lesssecureapps ....Link to grant access use in same browser where gmail login.
    const { m_email, m_password } = req.body;
    var mailOptions = {
      from: "dummygame254@gmail.com",
      to: m_email,
      subject: "LogIn Credential of Brain RadioGenomic System",
      // text: `Welcome to Brain RadioGenomic System\n Credential Belongs to you do not share to anyone.\nEmail:${m_email}\nPassword: ${m_password}`,
      html: `<h1>Welcome to Brain RadioGenomic System</h1> <p> This is login credential belong to you donot share it to anyone </p> <br></br>Email: ${m_email}<br></br>Password: ${m_password}`,

      //     html: '<h2 style="color:#ff6600;">Hello People!,
      //     Welcome to Bacancy!</h2>',
      // attachments: [
      //  { filename: 'profile.png', path: './images/profile.png' }
      // ]
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(422).json({ message: "Fail to Send Email" });
      } else {
        return res.status(200).json({ message: "Email Send" });
      }
    });
  },

};
